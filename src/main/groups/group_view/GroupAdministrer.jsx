import React from 'react';

import {Button, Segment, Divider, Form, Header, Search, Label, Image, List, Message} from 'semantic-ui-react';
import ReactMarkdown from "react-markdown";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import {Link} from "react-router-dom";

class GoodForm extends React.Component {
    state = {
        edit: false,
        value: "",
    };

    onChange(e, {value}) {
        if (!this.props.validate || this.props.validate(value))
            this.setState({value});
    }

    onSubmit() {
        if (this.props.onSubmit)
            this.props.onSubmit(this.state.value);
    }

    render() {
        const FormComponent = this.props.formComponent || Form.Input;
        const DisplayComponent = this.props.displayComponent || "div";

        if (this.state.edit)
            return <Segment basic>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormComponent label={this.props.name} placeholder={this.props.placeholder}
                        value={this.state.value} onChange={this.onChange.bind(this)}
                    />
                    <Button content="Edit" icon="edit" color="olive" type="submit"/>
                    <Button content="Cancel" icon="cancel" color="red" inverted
                        onClick={() => this.setState({edit: false})}
                    />
                </Form></Segment>;

        else return (
            <Segment basic>
                <Header as="h5">{this.props.name}
                    <Button content="Edit" icon="edit"
                        onClick={() => this.setState({
                            edit: true,
                            value: this.state.value || this.props.defaultValue
                        })}
                        floated={"right"}
                    />
                </Header>
                <DisplayComponent>
                    {this.props.defaultValue}
                </DisplayComponent>
            </Segment>
        );
    }

}

class GroupAdministrer extends React.Component {
    render() {
        return <div>

            <Segment basic>
                <Header as="h3" content="Général"/>

                <GoodForm
                    name="Nom"
                    defaultValue={this.props.g.name}
                    placeholder="Le nom du groupe"
                />

                <GoodForm
                    name="Description"
                    defaultValue={this.props.g.description}
                    formComponent={Form.TextArea}
                    displayComponent={ReactMarkdown}
                    placeholder="La description du groupe. Tu peux utiliser du Markdown !"
                />

                <GoodForm
                    name="Mail"
                    defaultValue={this.props.g.mail}
                    placeholder="Un email pour joindre tout ou partie du groupe."
                />

                <GoodForm
                    name="Website"
                    defaultValue={this.props.g.website}
                    placeholder="Le website du groupe"
                />
            </Segment>

            <Segment basic>
                <Header as="h3" content="Ajouter des membres"/>
                <Message info>
                    Les membres sont supprimables dans la page <Link to={`/group/${this.props.g.gid}/members`}>Membres</Link> de ce groupe.
                </Message>
                <Search fluid/>
            </Segment>

            <Segment basic>
                <Header as="h3" content="Gérer la visibilité du groupe"/>

                <Header as="h4" content="Ajouter des groupes à visibilité sur ce groupe"/>
                <Message info>
                    Expliquer le fonctionnement de cette chose
                </Message>
                <Search fluid/>

                <Header as="h4" content="Groupes à visibilité sur ce groupe"/>
                <List>
                    {this.props.g.visibilityEdges.map(group => (
                        <List.Item key={group.gid}>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png'/>
                            <List.Content content={group.name} as={Link} to={'/group/' + group.gid}/>
                            <List.Content floated="right">
                                <Button icon="remove" color="red"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log("User wants to delete him from his visibility edges.");
                                    }}
                                />
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Segment>

        </div>;
    }
}

export default GroupAdministrer;
