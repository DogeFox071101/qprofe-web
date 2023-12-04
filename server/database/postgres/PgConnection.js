import pg from 'pg'
const { Client } = pg;
import Connection from '../Connection.js'

class PgConnection extends Connection {
    client
    constructor(client) {
        super()
        if (client instanceof Client) {
            this.client = client
        }
        else {
            throw new Error("A pg client was expected")
        }
        
    }

    async open() {
        return await this.client.connect()
    }
    async close() {
        return await this.client.end()
    }
}
export default PgConnection