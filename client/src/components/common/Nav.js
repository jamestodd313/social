import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import {Menu} from 'semantic-ui-react'


export const Nav = () => {
    const currentPage = useLocation()
    const [activeLink, setActiveLink] = useState(currentPage.pathname)
    const authenticated = false //** PLACEHOLDER - DELETE THIS LATER */
    useEffect(()=>{
        setActiveLink(currentPage.pathname)
    },[currentPage])
    return (
        <Menu header="true" color="blue" inverted style={{marginTop: 16}}>
            <Menu.Item header>APPPPPPPP</Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item name="home" active={activeLink === "/"} onClick={e=> setActiveLink('home')} as={Link} to="/"/>
                {
                    authenticated ? (
                        <Menu.Item name="signOut" active={activeLink === "signout"} onClick={e=> setActiveLink('signOut')} as={Link} to="/"/>

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
