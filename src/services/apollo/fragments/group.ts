import {gql} from "apollo-boost";
import {userBase} from "./user";
import {Group, User} from "../../../constants/types";

export const groupBase = gql`
    fragment groupBase on Group {
        gid
        description
        frontPage
        mail
        name
        website
    }
`;

export interface GroupBase {
    gid: string
    description?: string
    frontPage?: string
    mail?: string
    name: string
    website: string
}

export const groupExtended = gql`
    fragment groupExtended on Group {
        ...groupBase
        __typename
        ... on SimpleGroup {
            admins {
                ...userBase
                photo
            }
            members {
                ...userBase
                photo
            }
            speakers {
                ...userBase
                photo
            }
            likers {
                ...userBase
                photo
            }
        }
        ...on MetaGroup {
            admins {
                ...userBase
                photo
            }
            members {
                ...groupBase
            }
        }
    }
    ${groupBase}
    ${userBase}
`;


export interface SimpleGroup extends Group {
    __typename: "SimpleGroup"
    admins: Array<User>
    members: Array<User>
    speakers: Array<User>
    likers: Array<User>
}

export interface MetaGroup extends Group {
    __typename: "MetaGroup"
    admins: Array<User>
    members: Array<Group>
}

export type GroupExtended = MetaGroup | SimpleGroup

