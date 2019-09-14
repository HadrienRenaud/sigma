import React, {ReactNode, useState} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {UserExtended, userExtended} from "../../services/apollo/fragments/user";
import UserContext, {UserContextType} from "./context";

const USER_QUERY = gql`
    query getUser($uid: ID!) {
        user(uid: $uid) {
            ...userExtended
        }
    }
    ${userExtended}
`;

export interface UserContextProviderProps {
    children: ReactNode
}

function UserContextProvider({children}: UserContextProviderProps) {
    const [uid, setUid] = useState<string>("");

    const {error, data, refetch} = useQuery<{ user: UserExtended }>(USER_QUERY, {
        variables: {
            uid,
        }
    });

    let value: UserContextType = {
        setUid,
        refetch,
    };

    console.log("context data:", data);

    if (error || !data || !data.user) {
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
