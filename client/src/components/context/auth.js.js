import {createContext, useReducer} from 'react'

const AuthContext = createContext({
    user: null,
    login: (user)=> {},
    logout: ()=> {}
})

const AuthReducer = (state, action)=> {
    switch(action.type){
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        default:
            return state
    }
}

const AuthProvider = (props)=> {
    const [state, dispatch] = useReducer(AuthReducer, {user: null})
    const login = user=> dispatch({type: 'LOGIN', payload: user})
    const logout = ()=> dispatch({type: 'LOGOUT'})

    return(    
        <AuthContext.Provider value={{user: state.user, login, logout}} {...props}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}