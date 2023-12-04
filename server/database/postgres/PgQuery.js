import pg from 'pg'
const { Client } = pg;
import Query from '../Query.js'

class PgQuery extends Query {
    client
    query

    constructor(client) {
        super()
        if (client instanceof Client) {
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