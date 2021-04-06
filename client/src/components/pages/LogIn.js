import { useMutation } from '@apollo/client'
import {useContext, useState} from 'react'
import {Form, FormField, Message, Icon, FormInput, FormButton} from 'semantic-ui-react'
import { SIGNIN } from '../../apollo/users/signin'
import { AuthContext } from '../context/auth.js'

 export const LogIn = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(null)

    const authctx = useContext(AuthContext)

    const [authenticateUser, {loading}] = useMutation(SIGNIN, {
        onError(err){
            let errs = err.graphQLErrors[0].extensions.errors
            setErrors(errs)
        },
        onCompleted(response){
            setErrors(null)
            authctx.login(response.signIn)
            // props.history.push('/')
        },
        variables: {email, password}
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        authenticateUser()
    }
    return (
        <>
            <Form onSubmit={handleSubmit} noValidate style={{width: '375px', marginLeft: 'auto', marginRight: 'auto', marginTop: 24}}>
                {loading ? <Icon name="spinner" size="huge" className="spinner" color="grey"/> : (
                    <>
                        <h1 style={{textAlign: 'center'}}>Create An Account</h1>
                        <FormField>
                            <FormInput error={errors && errors.email} label="Email" placeholder="Email" name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                        </FormField>
                        <FormField>
                            <FormInput error={errors && errors.password} label="Password" placeholder="Password" name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                        </FormField>
                        <FormButton type="submit" color="blue">
                            Sign In
                        </FormButton>
                    </>
                )}
            </Form>
            {errors ? (
                <Message error style={{width: 375, marginLeft: 'auto', marginRight: 'auto', marginTop: 32}}>
                <ul>
                    {errors && Object.values(errors).map(message=> message && <li key={message}>{message}</li>)}
                </ul>
            </Message>
            ) : null}
        </>
    )
}
