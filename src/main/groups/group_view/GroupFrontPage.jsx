/**
 * @file la page d'accueil d'un groupe, accessible par path='/group/:uid_du_group/'.
 * Contient un markdown de publicité stylée/de troll si c'est un binet pipo
 * (tandis que 'description' est un string court de description du groupe)
 *
 * Ainsi que les annonces et événements adressées à ce groupe.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';

import {Segment, Label, Button, Divider, Header, Form, Message} from 'semantic-ui-react';

class GroupFrontPage extends React.Component {

    state = {
        edition: false,
        frontPage: ""
    };

    render() {
        let {frontPage, isSpeaker} = this.props;
        if (this.state.edition)
            frontPage = this.state.frontPage;

        return (
            <Segment basic>
                {isSpeaker && !this.state.edition &&
                <Label
                    as={Button} icon={"edit"} content={"Edit"} attached={"bottom"}
                    onClick={() => this.setState({edition: true, frontPage: this.props.frontPage})}/>}
                {this.state.edition && <div>
                    <Form>
                        <Form.TextArea
                            placeholder='Write here what the user will see on your frontPage. You can use Markdown !'
                            value={this.state.frontPage}
                            onChange={(e, {value}) => this.setState({frontPage: value})}
                        />
                        <Form.Group>
                            <Form.Button disabled color="green" content="Submit" icon="check"/>
                            <Form.Button inverted color="orange" content="Cancel" icon="cancel"
                                         onClick={(e) => this.setState({edition: false})}
                            />
                            <Message warning>L'Édition n'est pas encore implémentée.</Message>
                        </Form.Group>
                    </Form>
                    <Divider/>
                    <Header as="h3">
                        Preview
                    </Header>
                    <Divider hidden/>
                </div>}
                <ReactMarkdown source={frontPage}/>
            </Segment>
        );
    }

}

export default GroupFrontPage;
