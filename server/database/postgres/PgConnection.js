import { Client } from "node-postgres";
import Connection from '../Connection'

class PgConnection extends Connection {
    client
    constructor(client) {
        super()
        if (client == Client) {
            this.client = client
        }
        else {
            throw new Error("A node-postgres client was expected")
        }
        
    }

    async open() {
        return await this.client.connect()
    }
    async close() {
        return await this.client.close()
    }
}
export default PgConnection