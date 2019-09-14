import {gql} from "apollo-boost";

export const userBase = gql`
    fragment userBase on User {
        uid
        givenName
        lastName
        nickname
    }
`;

export interface UserBase {
    uid: string,
    givenName: string,
    lastName: string,
    nickname: string,
}
