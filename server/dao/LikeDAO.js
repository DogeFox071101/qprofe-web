import PgDB from "../database/postgres/PgDB.js"

class LikeDAO {
    database = new PgDB()
    connection = this.database.getConnection()
    query = this.database.getQuery()

    async create(like) {
        const query = {
            text: "INSERT INTO likes (id_like, id_user, id_thread, created) VALUES ($1, $2, $3, $4)",
            values: [like.id_like, like.id_user, like.id_thread, like.created]
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
        //TODO
    }
    update() {
        //TODO
    }
    delete() {
        //TODO
    }
}
export default LikeDAO