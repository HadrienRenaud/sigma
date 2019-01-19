/**
 * @file Footer, la partie tout en bas d'un Component de layout que j'ai copié de https://react.semantic-ui.com/layouts/fixed-menu
 */

import React from 'react';
import {Container, Image, List, Segment} from "semantic-ui-react";
import logo from '../../assets/logo_sigma.png';
import footerBg from '../../assets/decharge BW lowdef2.jpg'; //TODO: change the bg image...


class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //TODO: this inline css styling may be (probably, I don't know much css) bad practice...
        let inlineStyleBg = {
            backgroundImage: "url(" + footerBg + ")",
            backgroundSize: "cover"
        };

        return (
            <Segment style={inlineStyleBg} inverted vertical>
                <Container textAlign='center'>
                    <Image centered size='mini' src={logo} />
                    <p>Binet Réseau 2019 (BR17)</p>
                    <List horizontal inverted divided link>
                        <List.Item as='a' href='https://www.frankiz.net'>
                            Frankiz
                        </List.Item>
                        <List.Item as='a' href='https://hubert.binets.fr'>
                            Hubert
                        </List.Item>
                        <List.Item as='a' href='https://short.binets.fr/test'>
                            Good old Rick
                        </List.Item>
                    </List>
                </Container>
            </Segment>
            /*
            <Segment inverted vertical>
                <Grid inverted divided padded='horizontally' columns='equal'>
                    <Grid.Column textAlign='center' width='4'>
                        <Header inverted as='h4' content='Liens utiles' />
                        <List horizontal inverted divided link relaxed>
                            <List.Item><a href='https://www.frankiz.net'>Frankiz</a></List.Item>
                            <List.Item><a href='https://hubert.binets.fr'>Hubert</a></List.Item>
                            <List.Item><a href='https://short.binets.fr/test'>Good old Rick</a></List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        <Image
                            centered
                            verticalAlign='middle'
                            size='mini'
                            src={logo}
                        />
                        <p>BR 2019 (BR17)</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            */
        );
    }
}

export default Footer;
