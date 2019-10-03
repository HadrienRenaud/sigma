import React, {useState} from "react";
import {Button, Divider, Form, Header, Label, Message, Segment} from "semantic-ui-react";
import {isString} from "util";
import {gql} from "apollo-boost";
import {groupBase} from "../../../services/apollo/fragments/group";
import {useMutation} from "@apollo/react-hooks";
import RenderMarkdown from '../../../components/Markdown/RenderMarkdown';

export interface FrontPageProps {
    frontPage: string
    gid: string
    isSpeaker: boolean
}

const EDIT_FRONT_PAGE = gql`
    mutation editFrontPage($forGroup: ID!, $frontPage: String!) {
        editGroup(frontPage: $frontPage, forGroup: $forGroup) {
            ...groupBase
        }
    }
    ${groupBase}
`;

function FrontPage(props: FrontPageProps) {
    const {frontPage, gid, isSpeaker} = props;
    const [edition, setEdition] = useState<boolean>(false);
    const [value, setValue] = useState<string>(frontPage);
    const [editGroup] = useMutation<{}, { forGroup: string, frontPage: string }>(EDIT_FRONT_PAGE, {
        onCompleted: () => setEdition(false)
    });

    return (
        <>
            <Segment basic>
                {isSpeaker && !edition && <>
                    <Label
                        as={Button}
                        icon={"edit"}
                        content={"Edit"}
                        attached={"bottom"}
                        onClick={() => setEdition(true)}
                    />
                    {!frontPage && (
                        <Message
                            info
                            header="The frontPage of this group is empty."
                            content="You can edit it by clicking on the Edit button at the bottom of the page."
                        />
                    )}
                </>}
                {edition && <>
                    <Form>
                        <Form.TextArea
                            placeholder='Write here what the user will see on your frontPage. You can use Markdown !'
                            value={value}
                            onChange={(e, {value}) => isString(value) && setValue(value)}
                        />
                        <Form.Group>
                            <Form.Button
                                color="green"
                                content="Submit"
                                icon="check"
                                onClick={() => editGroup({
                                    variables: {forGroup: gid, frontPage: value}
                                })}
                            />
                            <Form.Button
                                inverted
                                color="orange"
                                content="Cancel"
                                icon="cancel"
                                onClick={() => setEdition(false)}
                            />
                        </Form.Group>
                    </Form>
                    <Divider/>
                    <Header as="h3">
                        Preview
                    </Header>
                    <Divider hidden/>
                </>}

                <RenderMarkdown>{value}</RenderMarkdown>
                
                
                
                
            </Segment>
        </>
    );
}

export default FrontPage;
