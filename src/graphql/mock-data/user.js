import {g1, g2} from "./group.js";
import Mocker from "./mocker";

class User extends Mocker {
    constructor() {
        super();
        this.givenName = "Louis (" + this.getId() + ")" ;
        this.lastName = "Vaneau";
        this.name = this.givenName + " " + this.lastName;
        this.nickname = "loulou";
        this.nationality = "Franchouillard";
        this.uid = "u" + this.getId();
        this.birthdate = "1997-04-11";
        this.mail = "louis.vaneau@polytechnique.edu";
        this.phone = "0000-00-00";
        this.groups = [g1];
        this.likes = [g2];
        this.address = ["10 bvd des maréchaux"];
        this.promotion = "1794";
    }
}

export const u1 = new User();
export const u2 = new User();
export const u3 = new User();
export {User};