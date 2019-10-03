import React from "react";
import {gql} from "apollo-boost";
import {Container, Header, Image, List, Segment} from "semantic-ui-react";
import {userBase} from "../../services/apollo/fragments/user";
import UserGroups from "./components/UserGroups";
import {groupBase} from "../../services/apollo/fragments/group";
import {LoadingMessage} from "../../components/Messages/LoadingMessage";
import UserContext from "../../components/UserContext/context";
import {useQuery} from "@apollo/react-hooks";
import {User} from "../../constants/types";
import GraphQLError from "../../components/Messages/Errors";

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
            {data && data.user && (<>
                <Segment vertical>
                    <Image
                        src={data.user.photo || "https://react.semantic-ui.com/images/wireframe/square-image.png"}
                        floated="right" size='small'/>
                    <Header>
                        {data.user.givenName} {data.user.lastName} {data.user.nickname && <>({data.user.nickname})</>}
                        <Header.Subheader>@{data.user.uid}</Header.Subheader>
                    </Header>
                    <List>
                        <List.Item icon="birthday" content={data.user.birthdate}/>
                        <List.Item icon="flag outline" content={data.user.nationality}/>
                        <List.Item icon="phone" content={<a href={"tel:" + data.user.phone}>{data.user.phone}</a>}/>
                        {data.user.address && <List.Item icon="marker" content={data.user.address}/>}
                        <List.Item icon="mail"
                                   content={<a href={`mailto:${data.user.mail}`}>{data.user.mail}</a>}/>
                    </List>
                </Segment>

                <Segment vertical>
                    <UserGroups isMe={uid === data.user.uid} user={data.user}/>
                </Segment>
            </>)}
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
