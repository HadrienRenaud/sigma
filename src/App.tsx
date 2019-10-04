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
import SearchGroupPage from "./pages/SearchGroup/SearchGroupPage";
import {consumeAfterLogin, rememberBeforeLogin} from "./services/rememberBeforeLogin";

const NotLoggedInRoutes = () => (
    <Switch>
        <Route path={ROUTES.LOGIN} component={Login}/>
        <Route
            render={({location}) => {
                rememberBeforeLogin(location.pathname);
                return <Redirect to={ROUTES.LOGIN}/>
            }}
        />
    </Switch>
);

const LoggedInRoutes = () => (
    <Switch>
        <Route path={ROUTES.ME} component={UserPage}/>
        <Route path={ROUTES.USER} component={UserPage}/>
        <Route path={ROUTES.GROUP} component={GroupPage}/>
        <Route path={ROUTES.TOL} render={TOLPage}/>
        <Route path={ROUTES.ASSOCIATIONS} render={SearchGroupPage}/>
        <Route path={ROUTES.LOGIN} render={() => <Redirect to={consumeAfterLogin() || ROUTES.ME}/>}/>
    </Switch>
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
                    <UserContext.Consumer>
                        {({anonymous}) => anonymous ? (
                            <NotLoggedInRoutes/>
                        ) : (
                            <LoggedInRoutes/>
                        )}
                    </UserContext.Consumer>
                </UserContextProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;
