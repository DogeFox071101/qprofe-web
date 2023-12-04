import pg from 'pg'
const { Client } = pg;
import PgConnection from './PgConnection.js'
import PgQuery from './PgQuery.js'
import DB from '../DB.js'

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