import React, {useContext, useState} from "react";
import {gql} from "apollo-boost";
import {Button, Container, Divider, Segment} from "semantic-ui-react";
import {userBase} from "../../services/apollo/fragments/user";
import UserGroups from "./components/UserGroups";
import {groupBase} from "../../services/apollo/fragments/group";
import {LoadingMessage} from "../../components/Messages/LoadingMessage";
import UserContext from "../../components/UserContext/context";
import {useQuery} from "@apollo/react-hooks";
import {User} from "../../constants/types";
import GraphQLError from "../../components/Messages/Errors";
import Main from "./components/Main";
import EditForm from "./components/EditForm";
import ChangePicture from "./components/ChangePicture";

const GET_USER = gql`
    # Write your query or mutation here
    query getUser($uid: ID!) {
        user(uid: $uid) {
            ...userBase
            photo
            memberOf {
                ...groupBase
            }
            adminOf {
                ...groupBase
            }
            speakerOf {
                ...groupBase
            }
            likes {
                ...groupBase
            }
            inheritedMemberOf {
                ...groupBase
            }
            inheritedAdminOf {
                ...groupBase
            }
        }
    }
    ${userBase}
    ${groupBase}
`;

interface UserPageProps {
    match?: {
        params: {
            uid?: string
        }
    }
}

function UserPage({uid}: { uid: string }) {
    const {loading, error, data} = useQuery<{ user: User }, { uid: string }>(GET_USER, {
        variables: {uid},
    });
    const {user} = useContext(UserContext);
    const isMe = user && user.uid === uid;
    const [edit, setEdit] = useState<boolean>(false);

    return (
        <Container>
            {loading && (
                <Segment vertical>
                    <LoadingMessage/>
                </Segment>
            )}
            {error && (
                <GraphQLError error={error}/>
            )}
            {data && data.user && !edit && (<>
                <Segment vertical>
                    <Main user={data.user}/>
                    {isMe && (<>
                            <Divider hidden/>
                            <Button
                                fluid
                                content="Edit"
                                basic
                                onClick={() => setEdit(true)}
                            />
                        </>
                    )}
                </Segment>

                <Segment vertical>
                    <UserGroups isMe={uid === data.user.uid} user={data.user}/>
                </Segment>
            </>)}
            {data && data.user && edit && (<div>
                <Segment vertical>
                    <Button
                        fluid
                        icon="cancel"
                        content="Cancel"
                        color="yellow"
                        onClick={() => setEdit(false)}
                    />
                    <Divider hidden/>
                    <EditForm
                        user={data.user}
                        onCompleted={() => setEdit(false)}
                    />
                    <Divider />
                    <ChangePicture onCompleted={() => setEdit(false)}/>
                </Segment>
            </div>)}
        </Container>
    );
}


function UserPageWrapper(props: UserPageProps) {
    const uid = props.match && props.match.params.uid;

    return <UserContext.Consumer>
        {({user}) => (
            <UserPage uid={uid || (user && user.uid) || ""}/>
        )}
    </UserContext.Consumer>
}

export default UserPageWrapper;
