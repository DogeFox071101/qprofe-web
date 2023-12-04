import PgDB from "../database/postgres/PgDB.js"

class ThreadDAO {
    database = new PgDB()
    connection = this.database.getConnection()
    query = this.database.getQuery()

    async create(thread) {
        const query = {
            text: "INSERT INTO threads (id_thread, title, id_user, created) VALUES ($1, $2, $3, $4)",
            values: [thread.id_thread, thread.title, thread.id_user, thread.created]
        }
        try {
            await this.connection.open()
            this.query.set(query)
            await this.query.execute()
            await this.connection.close()
        }
        catch (error) {
            console.error(error)
            await this.connection.close()
        }
    }
    read() {

    }
    update() {

    }
    delete() {
        
    }
}
export default ThreadDAO