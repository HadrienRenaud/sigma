import gql from "graphql-tag";
import {userBase} from "../user";
import {groupBase} from "../group";
import messageBase from "./base.graphql";

export const authorsBase = gql`
    fragment authorsBase on AuthorUnion {
        ... on AuthorGroups {
            groups {
                ...groupBase
            }
        }
        
        ... on User {
            ...userBase
        }
    }
    ${userBase}
    ${groupBase}
`;

export const messageExtended = gql`
    fragment messageExtended on Message {
        ...messageBase
        authors {
            ...authorsBase
        }
        recipients {
            ...groupBase
        }
        views
    }
    ${messageBase}
    ${authorsBase}
    ${groupBase}
`;
