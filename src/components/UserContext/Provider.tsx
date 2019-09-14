import React, {ReactNode, useState} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {User} from "../../constants/types";
import {userBase} from "../../services/apollo/fragments/user";
import UserContext, {UserContextType} from "./context";

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

export interface UserContextProviderProps {
    children: ReactNode
}

function UserContextProvider({children}: UserContextProviderProps) {
    const [uid, setUid] = useState<string>("");

    const {error, data, refetch} = useQuery<{ user: User }>(USER_QUERY, {
        variables: {
            uid,
        }
    });
    let value: UserContextType = {
        setUid,
        refetch,
    };

    if (error || !data) {
        console.error("UserContextProvider error, data: ", error, data);
        value = {
            ...value,
            anonymous: true,
        }
    } else {
        value = {
            ...value,
            anonymous: false,
            user: data.user,
        }
    }

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider;
