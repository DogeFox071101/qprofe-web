import { Client } from "node-postgres";
import Query from '../Query'

class PgQuery extends Query {
    client
    query

    constructor(client) {
        super()
        if (client == Client) {
            this.client = client
        }
        else {
            throw new Error("A node-postgres client was expected")
        }
    }

    set(input) {
        this.query = input
    }
    async execute() {
        return this.client.query(this.query)
    }
}
export default PgQuery