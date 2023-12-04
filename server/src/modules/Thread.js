class Thread {
    id_thread
    title
    id_user
    created
    constructor(id_thread, title, id_user, created) {
        this.id_thread = id_thread
        this.title = title
        this.id_user = id_user
        this.created = new Date()
    }
    
}
export default Thread