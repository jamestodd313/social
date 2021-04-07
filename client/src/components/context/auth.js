import {createContext, useReducer} from 'react'
import jwt from 'jsonwebtoken'



const initialState = { user: null }

if(localStorage.getItem('apppppppp')){
    let decodedToken = jwt.decode(localStorage.getItem('apppppppp'))
    if(decodedToken.exp * 1000 < Date.now()) localStorage.removeItem('apppppppp')
    else initialState.user = decodedToken
}

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
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    const login = user=>{
        localStorage.setItem('apppppppp', user.token)
        dispatch({type: 'LOGIN', payload: user})
    } 
    const logout = ()=>{
        localStorage.removeItem('apppppppp')
        dispatch({type: 'LOGOUT'})
    }

    return(    
        <AuthContext.Provider value={{user: state.user, login, logout}} {...props}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}