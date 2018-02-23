import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from './main/Main.jsx';

class App extends React.Component {
    constructor() {
        super();
    }

    render() { return (
        <Router basename="/">
            <Main/>
        </Router>
    );}
}

export default App;