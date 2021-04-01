import React from 'react'
import {InMemoryCache, ApolloClient, createHttpLink, ApolloProvider} from '@apollo/client'

const httpLink = createHttpLink({uri: `http://localhost:5000`})
const client = new ApolloClient({link: httpLink, cache: new InMemoryCache()})

export default function({children}){
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}