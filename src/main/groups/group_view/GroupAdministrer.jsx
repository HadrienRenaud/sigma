import React from 'react';

import {Button, Form, Header, Image, List, Message, Search, Segment} from 'semantic-ui-react';
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";
import Mutation from "react-apollo/Mutation";
import gql from "graphql-tag";
import {groupBase} from "../../graphql/fragments/group";

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
        this.setState({ edit: false });
    }

    render() {
        const FormComponent = this.props.formComponent || Form.Input;
        const DisplayComponent = this.props.displayComponent || "div";

        if (this.state.edit)
            return <Segment basic>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormComponent
                        label={this.props.name} placeholder={this.props.placeholder}
                        value={this.state.value} onChange={this.onChange.bind(this)}
                    />
                    <Button content="Edit" icon="edit" color="olive" type="submit"/>
                    <Button
                        content="Cancel" icon="cancel" color="red" inverted
                        onClick={() => this.setState({edit: false})}
                    />
                </Form></Segment>;

        else return (
            <Segment basic>
                <Header as="h5">{this.props.name}
                    <Button
                        content="Edit" icon="edit"
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

const EDIT_GROUP_DESCRIPTION = gql`
    mutation editGroupDescription($gid: ID!, $description: String!) {
        editGroup(description: $description, forGroup: $gid) {
            ...groupBase
        }
    }
    ${groupBase}
`;


const EDIT_GROUP_NAME = gql`
    mutation editGroupName($gid: ID!, $name: String!) {
        editGroup(name: $name, forGroup: $gid) {
            ...groupBase
        }
    }
    ${groupBase}
`;


const EDIT_GROUP_EMAIL = gql`
    mutation editGroupEmail($gid: ID!, $mail: String!) {
        editGroup(mail: $mail, forGroup: $gid) {
            ...groupBase
            mail
        }
    }
    ${groupBase}
`;

const EDIT_GROUP_WEBSITE = gql`
    mutation editGroupWebsite($gid: ID!, $website: String) {
        editGroup(website: $website, forGroup: $gid) {
            ...groupBase
            website
        }
    }
    ${groupBase}
`;


const EditVariable = (props) => (
    <Mutation mutation={props.mutation}>
        {(edit) => (
            <GoodForm
                {...props.formProps}
                defaultValue={props.g[props.variableName]}
                onSubmit={(value) => edit({
                    variables: {
                        [props.variableName]: value,
                        gid: props.g.gid
                    }
                })}
            />
        )}
    </Mutation>
);

const GroupAdministrer = ({g}) => (
    <>
        <Segment basic>
            <Header as="h3" content="Général"/>

            <EditVariable
                g={g}
                variableName={"name"}
                mutation={EDIT_GROUP_NAME}
                formProps={{
                    name: "Name",
                    placeholder: "Le nom du groupe.",
                }}
            />

            <EditVariable
                g={g}
                variableName={"description"}
                mutation={EDIT_GROUP_DESCRIPTION}
                formProps={{
                    name: "Description",
                    placeholder: "La description du groupe. Tu peux utiliser du Markdown !",
                    formComponent: Form.TextArea,
                    displayComponent: ReactMarkdown,
                }}
            />

            <EditVariable
                g={g}
                variableName={"mail"}
                mutation={EDIT_GROUP_EMAIL}
                formProps={{
                    name: "Mail",
                    placeholder: "Un email pour joindre tout ou partie du groupe.",
                }}
            />

            <EditVariable
                g={g}
                variableName={"website"}
                mutation={EDIT_GROUP_WEBSITE}
                formProps={{
                    name: "Website",
                    placeholder: "Le website du groupe",
                }}
            />

        </Segment>

        <Segment basic>
            <Header as="h3" content="Ajouter des membres"/>
            <Message info>
                Les membres sont supprimables dans la page{' '}
                <Link to={`/group/${g.gid}/members`}>
                    Membres
                </Link>
                {' '}
                de ce groupe.
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
                {g.visibilityEdges && g.visibilityEdges.map(group => (
                    <List.Item key={group.gid}>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png'/>
                        <List.Content content={group.name} as={Link} to={'/group/' + group.gid}/>
                        <List.Content floated="right">
                            <Button
                                icon="remove" color="red"
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

    </>
);

export default GroupAdministrer;
