import React from 'react';
import client from "./services/apollo/client";
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Login from "./pages/login/Login";
import {ROUTES} from "./constants/routes";
import {PUBLIC_URL} from "./constants/config";
import UserContextProvider from "./components/UserContext/Provider";

const NotLoggedInRoutes = () => (
    <>
        <Route path={ROUTES.LOGIN} component={Login}/>
        <Route render={() => <Redirect to={ROUTES.LOGIN}/>}/>
    </>
);

const App: React.FC = () => {

    return (
        <ApolloProvider client={client}>
            <BrowserRouter basename={PUBLIC_URL}>
                <UserContextProvider uid={"hadrien.renaud"}>
                    <Switch>
                        <NotLoggedInRoutes/>
                    </Switch>
                </UserContextProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;
