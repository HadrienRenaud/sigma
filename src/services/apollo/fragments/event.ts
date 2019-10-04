import {gql} from "apollo-boost";
import {GroupBase, groupBase} from "./group";
import {UserBase} from "./user";

export const eventBase = gql`
    fragment eventBase on Event {
        eid
        createdAt
        updatedAt
        title
        content
        location
        startTime
        endTime
    }
`;

export const eventExtended = gql`
    fragment eventExtended on Event {
        ...eventBase
        authors {
            ...groupBase
        }
        recipients {
            ...groupBase
        }
        participatingGroups {
            ...groupBase
        }
        participatingUsers {
            ...userBase
        }
    }
    ${eventBase}
    ${groupBase}
`;

export interface EventBase {
    eid: string
    createdAt: Date
    updatedAt: Date
    title: string
    content: string
    location: string
    startTime: Date
    endTime: Date
}

export interface EventExtended extends EventBase {
    authors?: [GroupBase]
    recipients?: [GroupBase]
    participatingGroups?: [GroupBase]
    participatingUsers?: [UserBase]
}
