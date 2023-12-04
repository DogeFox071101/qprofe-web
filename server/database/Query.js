class Query {
    constructor() {
        if (this.constructor == Query) {
            throw new Error("Class is of abstract type and can't be instantiated")
        };
        if (this.set == undefined) {
            throw new Error("'set' method must be implemented")
        };
        if (this.execute == undefined) {
            throw new Error("'execute' method must be implemented")
        };
    };
}
export default Query