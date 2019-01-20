import React from "react";
import {Container, Header, Image} from "semantic-ui-react";
import poopSad from '../../assets/poop-sad.png';

class GraphQLError extends React.Component {
    render() {
        if (this.props.error)
            console.error(this.props.error);

        return (
            <Container text textAlign="justified">
                <Header as='h1'>Erreur de requete GraphQL</Header>
                <p>{this.props.error.message}</p>

                <Image size='small' src={poopSad} style={{ marginTop: "2em" }} />
            </Container>
        );
    }
}

export default GraphQLError;