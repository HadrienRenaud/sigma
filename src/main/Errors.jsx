import React from 'react';
import {Message} from "semantic-ui-react";

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

class GQLError extends React.Component {
    render() {
        if (this.props.error)
            console.error(this.props.error);
        return (
            <div>
                <Message negative>
                    <Message.Header>Erreur de chargement GraphQL</Message.Header>
                    {this.props.error ?
                        <p>{this.props.error.toString()}</p>
                        :
                        <p>Erreur de communication entre le backend et le frontend.</p>
                    }
                </Message>
            </div>
        );
    }
}



export {Error404, GQLError};
