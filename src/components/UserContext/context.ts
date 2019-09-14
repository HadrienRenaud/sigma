import React from "react";
import {User} from "../../constants/types";

export interface UserContextType {
    setUid?: (uid: string) => void,
    user?: User,
    refetch?: () => void,
    anonymous?: boolean,
}

const UserContext = React.createContext<UserContextType>({
    anonymous: true
});

export default UserContext;
