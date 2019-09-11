import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {userBase} from "../graphql/fragments/user";

export const UserContext = React.createContext("anonymous");

const USER_QUERY = gql`
    query getUser($uid: ID!) {
        user(uid: $uid) {
            ...userBase
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
            inheritedMemberOf {
                gid
            }
            inheritedAdminOf {
                gid
            }
        }
    }
    ${userBase}
`;

export function UserContextProvider(props) {
    return <Query query={USER_QUERY} variables={{uid: props.uid}} pollInterval={600 * 1000}>
        {({error, data, refetch}) => {
            if (error) {
                console.error("UserContextProvider error: ", error);
                data = {user: {}};
            }
            return <UserContext.Provider value={{uid: props.uid, ...data.user, refetchUser: refetch}}>
                {props.children}
            </UserContext.Provider>;
        }}
    </Query>;
}


