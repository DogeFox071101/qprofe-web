import LikeDAO from "../../dao/LikeDAO.js"
import ReplyDAO from "../../dao/ReplyDAO.js"
import ThreadDAO from "../../dao/ThreadDAO.js"
import Security from "./Security.js"

class User {
    id_user
    email
    password
    username
    created
    constructor(id_user, email, password, username, created) {
        this.id_user = id_user
        this.email = email
        this.password = password
        this.username = username
        this.created = created
    }
    // Inicio de Sesión
    logIn(email, password) {
        if (this.email === email && this.password === password) {
            return true
        }
        else {
            return false
        }
    }
    // Crear Hilo
    startThread(text) {
        const thread = {
            id_thread: Security.generateUUID(),
            text: text,
            id_user: this.id_user,
            created: new Date()
        }
        new ThreadDAO().create(thread)
    }
    // Responder Hilo
    answerThread(reply_text, id_thread) {
        const reply = {
            id_reply: Security.generateUUID(),
            reply_text: reply_text,
            id_user: this.id_user,
            id_thread: id_thread,
            created: new Date()
        }
        new ReplyDAO().create(reply)
    }
    // Dar Like a Hilo
    sendLikeToTread() {
        const like = {
            id_like: Security.generateUUID(),
            id_user: this.id_user,
            id_thread: id_thread,
            created: new Date()
        }
        new LikeDAO().create(like)
    }
}
export default User;