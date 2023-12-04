import PgDB from "../database/postgres/PgDB.js"

class UserDAO {
    database = new PgDB()
    connection = this.database.getConnection()
    query = this.database.getQuery()

    async create(new_user) {
        const query = {
            text: "INSERT INTO users (id_user, email, password, username, created) VALUES ($1, $2, $3, $4, $5);",
            values: [new_user.id_user, new_user.email, new_user.password, new_user.username, new_user.created]
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
    async read_one(email) {
        const query = {
            text: "SELECT * FROM users WHERE email = $1;",
            values: [email]
        }
        try {
            await this.connection.open()
            this.consulta.set(query)
            const res = await this.consulta.execute()
            await this.connection.close()
            return res.rows[0]
        }
        catch (error) {
            console.error(error)
            await this.connection.close()
            return null
        }
    }
    async read_all() {

    }

    update() {
        //TODO
    }
    delete() {
        //TODO
    }
}
export default UserDAO