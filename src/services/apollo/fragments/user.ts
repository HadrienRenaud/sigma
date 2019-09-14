import {gql} from "apollo-boost";

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

interface minGroup {
    gid: string
}

export interface UserExtended extends UserBase {
    photo: string,
    memberOf: Array<minGroup>,
    adminOf: Array<minGroup>,
    speakerOf: Array<minGroup>,
    likes: Array<minGroup>,
    inheritedMemberOf: Array<minGroup>,
    inheritedAdminOf: Array<minGroup>,
}
