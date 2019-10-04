import {UserExtended} from "../services/apollo/fragments/user";
import {GroupBase} from "../services/apollo/fragments/group";
import {EventExtended} from "../services/apollo/fragments/event";

export interface User extends UserExtended {
}

export interface Group extends GroupBase {
    parents?: Array<Group>,
    children?: Array<Group>,
}

export interface Event extends EventExtended {
}

