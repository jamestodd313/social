const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../mongo/models/User')

module.exports = {
    Mutation: {
        async registerUser(parent, args, context, info){
            let {username, password, confirmPassword, email} = args.registrationInput
            password = await bcrypt.hash(password, Number(process.env.BCRYPT_COST))

            const userToCreate = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            })
            const newUser = await userToCreate.save()

            const token = jwt.sign({
                id: newUser.id, 
                email: newUser.email, 
                username: newUser.username,
            }, process.env.JWT_SECRET, {expiresIn: '1h'})
            
            return {...newUser._doc, id: newUser.id, token}
        }
    }
}