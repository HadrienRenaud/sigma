import React from 'react';
import {Route, Switch, Link, } from 'react-router-dom';
import {Grid, Image} from 'semantic-ui-react';

import Event from './event/Event.jsx';
import Group from './group/Group.jsx';
import LeftBar from './LeftBar.jsx';
import RightBar from './RightBar.jsx';
import Index from './Index.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Body from './Body.jsx';
import ApolloTest from './ApolloTest.jsx';

import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://129.104.201.10/graphql' });

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <ApolloTest />
  </ApolloProvider>
);

render(ApolloApp, document.getElementById('root'));