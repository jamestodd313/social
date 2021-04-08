import React, {useContext, useEffect, useState} from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import {Menu} from 'semantic-ui-react'
import { AuthContext } from '../context/auth.js'

// get tokeen from context
// validate token
// if validated show home and sign out buttons
// else show login and register buttons

export const Nav = () => {
    const currentPage = useLocation()
    const [activeLink, setActiveLink] = useState(currentPage.pathname)
    // const authenticated = false //** PLACEHOLDER - DELETE THIS LATER */
    const authctx = useContext(AuthContext)

    useEffect(()=>{
        setActiveLink(currentPage.pathname)
    },[currentPage])
    return (
        <Menu header="true" color="blue" inverted style={{marginTop: 16}}>
            <Menu.Item header>APPPPPPPP</Menu.Item>
            <Menu.Menu position="right">
                {
                    authctx.user ? (
                        <>
                            <Menu.Item name="home" active={activeLink === "/"} onClick={e=> setActiveLink('home')} as={Link} to="/"/>
                            <Menu.Item name="signOut" onClick={authctx.logout}/>
                        </>
                    ) : (
                        <>
                            <Menu.Item name="logIn" active={activeLink === "/login"} onClick={e=> setActiveLink('logIn')} as={Link} to="/login"/>
                            <Menu.Item name="signUp" active={activeLink === "/register"} onClick={e=> setActiveLink('signUp')} as={Link} to="/register"/>
                        </>
                    )
                }
            </Menu.Menu>
        </Menu>
    )
}
