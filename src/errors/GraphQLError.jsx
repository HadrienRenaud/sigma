import React from "react";
import {Container, Header, Image} from "semantic-ui-react";
import poopSad from '../../assets/poop-sad.png';

class GraphQLError extends React.Component {
    render() {
        return (
            <Container text textAlign="justified">
                <Header as='h1'>Erreur 404</Header>
                <p>{this.children}</p>

                <Image size='small' src={poopSad} style={{ marginTop: "2em" }} />
            </Container>
        );
    }
}

export default GraphQLError;