import PgDB from "../database/postgres/PgDB.js"

class ReplyDAO {
    database = new PgDB()
    connection = this.database.getConnection()
    query = this.database.getQuery()

    async create(reply) {
        const query = {
            text: "INSERT INTO replies (id_reply, reply_text, id_user, id_thread, created) VALUES ($1, $2, $3, $4, $5)",
            values: [reply.id_reply, reply.reply_text, reply.id_user, reply.id_thread, reply.created]
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
export default ReplyDAO