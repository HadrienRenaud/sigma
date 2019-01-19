/**
 * @file Components a render en cas d'erreur, 404 ou autre
 */

import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Image, Container, Header } from 'semantic-ui-react';
import poopSad from '../assets/poop-sad.png';

class Error404 extends React.Component {
    // Cette error devrait être rendered au sein du body, pour quand même laisser
    // l'utilisateur accéder aux autres parties du layout (notamment les liens du topmenu)

    render() {
        return (
            <Container text textAlign="justified">
                <Header as='h1'>Erreur 404</Header>
                <p>Je n'ai pas trouvé, déso pas déso</p>

                <Image size='small' src={poopSad} style={{ marginTop: "2em" }} />
            </Container>
        );
    }
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}



export { Error404, ErrorBoundary };
