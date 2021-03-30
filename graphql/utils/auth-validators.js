const { UserInputError, AuthenticationError } = require('apollo-server-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../mongo/models/User')

const checkErrors = (errors)=> {
    for(let error in errors){
        if(errors[error] !== false) throw new UserInputError("", {errors})
    } 
}
const generateToken = (user)=> {
    const token = jwt.sign({
        id: user.id, 
        email: user.email, 
        username: user.username,
    }, process.env.JWT_SECRET, {expiresIn: '1h'})
    return token
}
const isValidEmail = (email)=> {
    let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return email.match(regex)
}

const validateRegistration = async(username, password, confirmPassword, email)=> {
    const errors = {
        email: false,
        username: false,
        password: false,
        confirmPassword: false
    }

    if(!isValidEmail(email)) errors.email = "Enter a valid email address"
    else errors.email = false
    
    if(password.length < 7) errors.password = "Password must be at least 8 characters"
    else errors.password = false
    
    const existingUsername = await User.findOne({username})
    const existingEmail = await User.findOne({email})
    if(existingUsername) errors.username = 'Username is taken'
    if(existingEmail) errors.email = 'Email is already in use'

    if(password !== confirmPassword) errors.confirmPassword = 'Passwords must match'

    return errors
}
const createUser = async(username, password, email)=> {
        let hashword = await bcrypt.hash(password, Number(process.env.BCRYPT_COST))

        const userToCreate = new User({
            username,
            email,
            password: hashword,
            createdAt: new Date().toISOString()
        })
        const newUser = await userToCreate.save()


        // const token = jwt.sign({
        //     id: newUser.id, 
        //     email: newUser.email, 
        //     username: newUser.username,
        // }, process.env.JWT_SECRET, {expiresIn: '1h'})

        const token = generateToken(newUser)

        return {...newUser._doc, id: newUser.id, token}
}
const validateLogin = async(email, password)=> {
    const errors = {
        email: false,
        password: false
    }

    if(!isValidEmail(email)) errors.email =  "Enter a valid email address"
    else errors.email = false

    let userToSignIn = await User.findOne({email})
    if(!userToSignIn) errors.email = "Couldn't find a user with that email address"
    else errors.email = false

    checkErrors(errors) // this will throw any errors to prevent moving on to compare passwords and return the user

    let passwordIsValid = await bcrypt.compare(password, userToSignIn.password)
    if(!errors.password && !passwordIsValid) errors.password = "Invalid password"

    checkErrors(errors)

    const token = generateToken(userToSignIn)

    return {...userToSignIn._doc, id: userToSignIn.id, token}
}

const validateToken = (context)=> {
    let auth = context.req.headers.authorization
    if(!auth) throw new Error('No auth header recevied.')
    const token = auth.split('Bearer ')[1]
    if(!token) throw new Error("Couldn't pull token from auth header. Should be formatted `Bearer token`.")
    try{
        let validatedUser = jwt.verify(token, process.env.JWT_SECRET)
        return validatedUser
    } catch(err){
        throw new AuthenticationError('Invalid or expired token. Sign in and try again.')
    }

} 

module.exports = {validateRegistration, createUser, checkErrors, validateLogin, validateToken}