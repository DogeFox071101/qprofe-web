class DB{
    constructor() {
        if (this.constructor == DB) {
            throw new Error("Class is of abstract type and can't be instantiated")
        };
        if (this.getConnection == undefined) {
            throw new Error("'getConnecion' method must be implemented")
        }
        if (this.getQuery == undefined) {
            throw new Error("'getQuery' method must be implemented")
        }
    }
}
export default DB