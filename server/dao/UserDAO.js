import PgDB from "../database/postgres/PgDB.js"

class UserDAO {
    database = new PgDB()
    connection = this.database.getConnection()
    query = this.database.getQuery()

    async create(user) {
        const query = {
            text: "INSERT INTO users (id_user, email, password, username, created) VALUES ($1, $2, $3, $4, $5)",
            values: [user.id_user, user.email, user.password, user.username, user.created]
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
export default UserDAO