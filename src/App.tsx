import React from 'react';
import client from "./services/apollo/client";
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./pages/login/Login";

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Login}/>
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;
