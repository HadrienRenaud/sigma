class Mocker {
    static __id = 0;

    constructor () {
        this._id = Mocker.__id;
        Mocker.__id ++;
    }

    getId() {
        return this._id;
    }

}

export default Mocker;