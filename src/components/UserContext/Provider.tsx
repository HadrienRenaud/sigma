import React, {ReactNode} from "react";
import gql from "graphql-tag";
import {UserExtended, userExtended} from "../../services/apollo/fragments/user";
import UserContext from "./context";
import client from "../../services/apollo/client";

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

interface State {
    anonymous: boolean,
    uid?: string,
    user?: UserExtended,
}

const UID_STORAGE_KEY = "sigma-uid";

function getLastUid() {
    return localStorage.getItem(UID_STORAGE_KEY) || "";
}

function setLastUid(uid: string) {
    return localStorage.setItem(UID_STORAGE_KEY, uid)
}

function delUid() {
    return localStorage.removeItem(UID_STORAGE_KEY)
}


class UserContextProvider extends React.Component<{ children: ReactNode }, State> {
    state: State = {
        anonymous: true,
        uid: getLastUid(),
    };

    componentDidMount = (): void => {
        this.fetchUser()
    };

    logout = () => {
        this.setState({
            anonymous: true,
            user: undefined,
            uid: undefined,
        });
        delUid();
        client.resetStore();
    };

    setUid = (uid: string) => {
        if (uid === this.state.uid)
            return;

        this.setState({
            anonymous: false,
            uid: uid,
        });

        this.fetchUser()
    };

    makeQuery = (uid: string) => {
        return client.query<{ user: UserExtended }, { uid: string }>({
            query: USER_QUERY,
            variables: {
                uid,
            }
        })
    };

    fetchUser = () => {
        if (!this.state.uid)
            return;
        this.makeQuery(this.state.uid)
            .then(({data, errors}) => {
                if (errors || !data || !data.user)
                    return this.logout();
                this.setState({
                    anonymous: false,
                    user: data.user,
                    uid: data.user.uid,
                });
                setLastUid(data.user.uid);
            })
    };

    render = () => (
        <UserContext.Provider value={{
            anonymous: this.state.anonymous,
            setUid: this.setUid,
            logout: this.logout,
            user: this.state.user,
        }}>
            {this.props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
