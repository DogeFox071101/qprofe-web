import { Client } from "node-postgres"
import PgConnection from './PgConnection'
import PgQuery from './PgQuery'

class PgDB extends DB {
    client = new Client()
    getConnection() {
        return new PgConnection(this.client)
    }
    getQuery() {
        return new PgQuery(this.client)
    }
}
export default PgDB