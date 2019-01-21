import Mocker from "./mocker";
import {Group, g3} from "./group";
import {e1} from "./event";

class Announcement extends Mocker {
    constructor () {
        super();
        this.__typename = "Announcement";
        this.mid = "a" + this.getId();
        this.createdAt = "2019-01-21";
        this.updatedAt = "2019-01-21";
        this.title = "Annoucement : ich bin null";
        this.content = "ich bin null";
        this.authors = [new Group()];
        this.recipient = [g3];
        this.importance = 2;
        this.views = 0;
        this.forEvent = e1;
    }
}

export const a1 = new Announcement();
export const a2 = new Announcement();
export const a3 = new Announcement();
export {Announcement};
