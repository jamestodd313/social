import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {Menu} from 'semantic-ui-react'

export const Nav = ({active}) => {
    const [activeLink, setActiveLink] = useState(active)
    const authenticated = true
    return (
        <Menu header>
            <Menu.Item header>APPPPPPPP</Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item name="home" active={activeLink === "home"} onClick={e=> setActiveLink('home')} as={Link} to="/"/>
                {
                    authenticated ? (
                        <Menu.Item name="signOut" active={activeLink === "signOut"} onClick={e=> setActiveLink('signOut')} as={Link} to="/"/>

                    ) : (
                        <>
                            <Menu.Item name="logIn" active={activeLink === "logIn"} onClick={e=> setActiveLink('logIn')} as={Link} to="/login"/>
                            <Menu.Item name="signUp" active={activeLink === "signUp"} onClick={e=> setActiveLink('signUp')} as={Link} to="/register"/>
                        </>
                    )
                }
            </Menu.Menu>

        </Menu>
    )
}
