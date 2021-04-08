import React, {useContext, useState} from 'react'
import {Form, FormField, FormInput, FormButton, Icon, Message} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import { REGISTER } from '../../../apollo/users/register'
import { AuthContext } from '../../context/auth.js'

export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState(null)

    const authctx = useContext(AuthContext)

    const [createUser, {loading}] = useMutation(REGISTER, { 
        onError(err){
            let errs = err.graphQLErrors[0].extensions.errors
            setErrors(errs)
        },
        onCompleted(result){
            setErrors(null)
            authctx.login(result.registerUser)
            props.history.push('/')
        },
        variables: {email, username, password, confirmPassword}
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        createUser()
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
                        <FormInput error={errors && errors.username} label="Username" placeholder="Username" name="username" type="text" value={username} onChange={e=>setUsername(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <FormInput error={errors && errors.password} label="Password" placeholder="Password" name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    </FormField>
                    <FormField>
                        <FormInput error={errors && errors.confirmPassword} label="Confirm Password" placeholder="Confirm Password" name="confirmPassword" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                    </FormField>
                    <FormButton type="submit" color="blue">
                        Register
                    </FormButton>
                </>
            )}
        </Form>
        {errors ? (
            <Message error style={{width: 375, marginLeft: 'auto', marginRight: 'auto', marginTop: 32}}>
            <ul>
                {errors && Object.values(errors).map(message=> message && <li>{message}</li>)}
            </ul>
        </Message>
        ) : null}
        
        </>
    )
}
