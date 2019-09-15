import {gql} from "apollo-boost";

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
