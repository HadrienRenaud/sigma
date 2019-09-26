import React, {useState} from 'react';

import {Button, Form, Header, Segment} from 'semantic-ui-react';
import ReactMarkdown from "react-markdown";
import gql from "graphql-tag";
import {groupBase} from "../../../services/apollo/fragments/group";
import {useMutation} from "@apollo/react-hooks";
import {Group} from "../../../constants/types";
import {isString} from "util";

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

export interface EditVariableProps {
    mutation: any
    inputComponent?: any
    displayComponent?: any
    group: Group
    variable: keyof Group
    name: string
    placeholder: string
}

type EditGroupVariables = {
    [k in keyof Group]?: string
} & { gid: string }

function EditVariable(props: EditVariableProps) {
    const {mutation, variable, name, group, placeholder} = props;
    const variableValue = group[variable];
    const defaultValue = isString(variableValue) ? variableValue : "";
    const FormComponent = props.inputComponent || Form.Input;
    const DisplayComponent = props.displayComponent || "div";

    const [edit, setEdit] = useState<boolean>(false);
    const [doEdit] = useMutation<{}, EditGroupVariables>(mutation);
    const [value, setValue] = useState<string>(defaultValue);

    return (
        <>
            {edit ? (
                <Segment basic>
                    <Form onSubmit={() => {
                        doEdit({variables: {gid: group.gid, [variable]: value}});
                        setEdit(false);
                    }}>
                        <FormComponent
                            label={name}
                            placeholder={placeholder}
                            value={value}
                            onChange={(e: any, {value}: { value: string }) => setValue(value)}
                        />
                        <Button content="Edit" icon="edit" color="olive" type="submit"/>
                        <Button
                            content="Cancel" icon="cancel" color="red" inverted
                            onClick={() => setEdit(false)}
                        />
                    </Form></Segment>
            ) : (
                <Segment basic>
                    <Header as="h5">{props.name}
                        <Button
                            content="Edit" icon="edit"
                            onClick={() => setEdit(true)}
                            floated={"right"}
                        />
                    </Header>
                    <DisplayComponent>
                        {defaultValue}
                    </DisplayComponent>
                </Segment>
            )


            }
        </>
    );
}

const GroupAdministrer = ({group}: { group: Group }) => (
    <>
        <Segment basic>
            <Header as="h3" content="Général"/>

            <EditVariable
                group={group}
                variable={"name"}
                mutation={EDIT_GROUP_NAME}
                name="Name"
                placeholder="Le nom du groupe."
            />

            <EditVariable
                group={group}
                variable={"description"}
                mutation={EDIT_GROUP_DESCRIPTION}
                name="Description"
                placeholder="La description du groupe. Tu peux utiliser du Markdown !"
                inputComponent={Form.TextArea}
                displayComponent={ReactMarkdown}
            />

            <EditVariable
                group={group}
                variable={"mail"}
                mutation={EDIT_GROUP_EMAIL}
                name="Mail"
                placeholder="Un email pour joindre tout ou partie du groupe."
            />

            <EditVariable
                group={group}
                variable={"website"}
                mutation={EDIT_GROUP_WEBSITE}
                name="Website"
                placeholder="Le website du groupe"
            />
        </Segment>

        <Segment>
            <Header as="h3" content="Member request"/>


        </Segment>
    </>
);

export default GroupAdministrer;
