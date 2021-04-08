import React from 'react'
import {InMemoryCache, ApolloClient, createHttpLink, ApolloProvider} from '@apollo/client'
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({uri: `http://localhost:5000`})
const authLink = setContext(setAuthHeader)

function setAuthHeader(){
    let token = localStorage.getItem('apppppppp')
    token = `Bearer ${token}`
    return {headers: {authorization: token}}
}

const client = new ApolloClient({link: authLink.concat(httpLink), cache: new InMemoryCache()})

export default function({children}){
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}