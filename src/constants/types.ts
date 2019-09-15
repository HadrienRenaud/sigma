import {UserExtended} from "../services/apollo/fragments/user";
import {GroupBase} from "../services/apollo/fragments/group";

export interface User extends UserExtended {}
export interface Group extends GroupBase {
    parents?: Array<Group>,
    children?: Array<Group>,
}

