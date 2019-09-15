import {gql} from "apollo-boost";
import {Group} from "../../../constants/types";

export const userBase = gql`
    fragment userBase on User {
        uid
        address
        birthdate
        givenName
        lastName
        mail
        nationality
        nickname
        phone
    }
`;

export const userExtended = gql`
    fragment userExtended on User {
        ...userBase
        photo
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
    ${userBase}
`;

export interface UserBase {
    uid: string
    address?: string
    birthdate: string
    givenName: string
    lastName: string
    mail?: string
    nationality?: string
    nickname?: string
    phone?: string
}

export interface UserExtended extends UserBase {
    photo: string,
    memberOf: Array<Group>,
    adminOf: Array<Group>,
    speakerOf: Array<Group>,
    likes: Array<Group>,
    inheritedMemberOf: Array<Group>,
    inheritedAdminOf: Array<Group>,
}
