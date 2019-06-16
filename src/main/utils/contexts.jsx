import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";

const USER_QUERY = gql`
    query getUser($uid: ID!) {
        user(uid: $uid) {
            lastName
            givenName
            nickname
            memberOf {
                gid
                name
                description
            }
            adminOf {
                gid
                name
                description
            }
            speakerOf {
                gid
                name
                description
            }
            likes {
                gid
                name
                description
            }
            dislikes {
                gid
                name
                description
            }
            inheritedMemberOf {
                gid
                name
                description
            }
            inheritedAdminOf {
                gid
                name
                description
            }
        }
    }
`;


export const UserContext = React.createContext("anonymous");

export function UserContextProvider(props) {
    return <Query query={USER_QUERY} variables={{uid: props.uid}}>
        {({loading, error, data}) => {
            if (error) {
                console.error(error);
                data = {user: {}};
            }
            return <UserContext.Provider value={{uid: props.uid, ...data.user}}>
                {props.children}
            </UserContext.Provider>;
        }}
    </Query>;
}


