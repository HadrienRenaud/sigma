import {g1, g3, Group} from "./group";
import {User} from "./user"
import Mocker from "./mocker";

class Event extends Mocker {
    constructor() {
        super();
        this.mid = "e" + this._id;
        this.createdAt = "2019-01-21";
        this.updatedAt = "2019-01-21";
        this.title = "Remise des galons de l'ASP Vano (" + this.getId() + ")";
        this.content = "L'ASP Vano passe Lieutenant cette année en raison de sa grande habilité à manier le coutal.";
        this.authors = [g1, g3];
        this.recipent = [g1];

        this.location = "Cours éponyme";
        this.startTime = "2019-07-14";
        this.endTime = "2019-07-14";

        this.participatingGroups = [new Group()];
        this.participatingUsers = [new User()];
    }
}

export {Event};
export const e1 = new Event();
export const e2 = new Event();
export const e3 = new Event();