class Connection {
    constructor() {
        if (this.constructor == Connection) {
            throw new Error("Class is of abstract type and can't be instantiated")
        };
        if (this.open == undefined) {
            throw new Error("'open' method must be implemented")
        };
        if (this.close == undefined) {
            throw new Error("'close' method must be implemented")
        };
    }
}
export default Connection