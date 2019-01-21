import Mocker from "./mocker";

class Group extends Mocker {
    constructor() {
        super();
        this.__typename = "SimpleGroup";
        this.uid = "g" + this.getId();
        this.name = "Comics (" + this.getId() + ")";
        this.website = "comic";
        this.description = "Club BDBG";
        this.createdAt = "2000-11-11";
        this.updatedAt = "2018-11-11";
        this.privatePosts = [];
        this.questions = [];
        this.answers = [];
    }

}

export const g1 = new Group();
export const g2 = new Group();
export const g3 = new Group();
export {Group};