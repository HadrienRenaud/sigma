import React from "react";
import {Container, Header, Image} from "semantic-ui-react";
import poopSad from '../../assets/poop-sad.png';

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
export default Error404;