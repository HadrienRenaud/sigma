import React from 'react';
import client from "./services/apollo/client";
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Login from "./pages/login/Login";
import {ROUTES} from "./constants/routes";
import {PUBLIC_URL} from "./constants/config";
import UserContextProvider from "./components/UserContext/Provider";
import UserContext from './components/UserContext/context';
import Header from "./components/Header/Header";
import UserPage from "./pages/user/UserPage";
import GroupPage from "./pages/group/GroupPage";
import TOLPage from "./pages/tol/TOLPage";

const NotLoggedInRoutes = () => (
    <>
        <Route path={ROUTES.LOGIN} component={Login}/>
        <Route render={() => <Redirect to={ROUTES.LOGIN}/>}/>
    </>
);

const LoggedInRoutes = () => (
    <>
        <Route path={ROUTES.ME} component={UserPage}/>
        <Route path={ROUTES.USER} component={UserPage}/>
        <Route path={ROUTES.GROUP} component={GroupPage}/>
        <Route path={ROUTES.TOL} render={TOLPage}/>
        <Route path={ROUTES.LOGIN} render={() => <Redirect to={ROUTES.ME}/>}/>
    </>
);

const App: React.FC = () => {

    return (
        <ApolloProvider client={client}>
            <BrowserRouter basename={PUBLIC_URL}>
                <UserContextProvider>
                    <Header
                        onLogOut={() => {
                            console.log("Logout")
                        }}
                        showSidebar={() => {
                            console.log("showsidebar")
                        }}
                    />
                    <Switch>
                        <UserContext.Consumer>
                            {({anonymous}) => anonymous ? (
                                <NotLoggedInRoutes/>
                            ) : (
                                <LoggedInRoutes/>
                            )}
                        </UserContext.Consumer>
                    </Switch>
                </UserContextProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;
