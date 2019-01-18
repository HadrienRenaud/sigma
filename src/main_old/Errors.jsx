import React from 'react';
import { Route, Link } from 'react-router-dom';

class Error404 extends React.Component {
    render() {
        return (
            <div>
                <h3>Erreur 404</h3>
                <p>Je n'ai pas trouvé, déso pas déso</p>
            </div>
        );
    }
}

export default Error404;
