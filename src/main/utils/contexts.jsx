import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import { apiUrl } from "../../config.jsx";

const USER_QUERY = gql`
    query getUser($uid: ID!) {
        user(uid: $uid) {
            lastName
            givenName
            nickname
            memberOf {
                gid
            }
            adminOf {
                gid
            }
            speakerOf {
                gid
            }
            likes {
                gid
            }
            dislikes {
                gid
            }
            inheritedMemberOf {
                gid
            }
            inheritedAdminOf {
                gid
            }
        }
    }
`;

export const UserContext = React.createContext("anonymous");

export function UserContextProvider(props) {
    return <Query query={USER_QUERY} variables={{uid: props.uid}}>
        {({loading, error, data}) => {
            if (error) {
                console.error("UserContextProvider error: ", error);
                data = {user: {}};
            }
            return <UserContext.Provider value={{uid: props.uid, ...data.user}}>
                {props.children}
            </UserContext.Provider>;
        }}
    </Query>;
}


