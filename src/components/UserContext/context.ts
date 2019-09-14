import React from "react";
import {User} from "../../constants/types";

export interface UserContextType {
    setUid?: (uid: string) => void,
    user?: User,
    logout: () => void,
    anonymous?: boolean,
}

const UserContext = React.createContext<UserContextType>({
    anonymous: true,
    logout: () => {},
});

export default UserContext;
