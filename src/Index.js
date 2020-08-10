import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    HttpLink,
} from '@apollo/client';
import { App } from './App';

const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export const Index = () => (
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.AUTH0_DOMAIN}
            clientId={process.env.AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
        >
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </Auth0Provider>
    </React.StrictMode>
);

ReactDOM.render(<Index />, document.getElementById('root'));
