const { checkErrors, createUser, validateRegistration, validateLogin } = require('../utils/auth-validators')

module.exports = {
    Mutation: {
        async registerUser(parent, args, context, info){
            let {username, password, confirmPassword, email} = args.registrationInput
            const errors = await validateRegistration(username, password, confirmPassword, email)
            checkErrors(errors)

            const newUser = await createUser(username, password, email)
            return newUser
        },
        async signIn(parent, args, context, info){
            let {email, password} = args.loginInfo
            let user = await validateLogin(email, password)
            return user
        }
    }
}

