import express, { urlencoded, json } from "express";
import { Novu } from "@novu/node";
import Security from "./modules/Security.js";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const novu = new Novu("fe365d89231180940e0b0f2479a5dbcd");
const app = express();
const PORT = process.env.PORT;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

//Protección contra CSRF - Q'Profe
app.use(cookieParser());

// Configuración de csurf - Q'Profe
app.use(csurf({ cookie: true }));


const users = [];
const threadList = [];

const generateID = () => Security.generateUUID().toString()

//Login
app.post("/api/login", (req, res) => {
	const { email, password } = req.body;

	let result = users.filter(
		(user) => user.email === email && user.password === password
	); //--------------------------------------------------------------------------------------------------------

	if (result.length !== 1) {
		return res.json({
			error_message: "Credenciales incorrectas",
		});
	}

	res.json({
		message: "Logueo exitoso",
		id: result[0].id,
	});
});
//Register
app.post("/api/register", async (req, res) => {
	const { email, password, username } = req.body;
	const id = generateID();
	const result = users.filter(
		(user) => user.email === email && user.password === password
	);

	if (result.length === 0) {
		const newUser = { id, email, password, username };
		await novu.subscribers.identify(id, { email });

		users.push(newUser); //-----------------------------------------------------------------------------------

		return res.json({
			message: "Cuenta creada exitosamente",
		});
	}
	res.json({
		error_message: "El usuario ya existe",
	});
});
//CreateThread
app.post("/api/create/thread", async (req, res) => {
	const { thread, userId } = req.body;
	let threadId = generateID();

	threadList.unshift({
		id: threadId,
		title: thread,
		userId,
		replies: [],
		likes: [],
	}); //---------------------------------------------------------------------------------------------------------

	await novu.topics.create({
		key: threadId,
		name: thread,
	 });
	await novu.topics.addSubscribers(threadId, {
	 	subscribers: [userId],
	 });
	res.json({
		message: "Post creado exitosamente",
		threads: threadList,
	});
});
//GetAllThreads
app.get("/api/all/threads", (req, res) => {
	res.json({

		threads: threadList, //----------------------------------------------------------------------------------------

	});
});
//SendLike
app.post("/api/thread/like", (req, res) => {
	const { threadId, userId } = req.body;

	const result = threadList.filter((thread) => thread.id === threadId); //--------------------------------------------

	const threadLikes = result[0].likes;
	const authenticateReaction = threadLikes.filter((user) => user === userId);
	if (authenticateReaction.length === 0) {
		threadLikes.push(userId);
		return res.json({
			message: "Has reaccionado al post",
		});
	}
	res.json({
		error_message: "Solo puedes reaccionar una vez",
	});
});
//ReplyThread
app.post("/api/thread/replies", (req, res) => {
	const { id } = req.body;

	const result = threadList.filter((thread) => thread.id === id); //-------------------------------------------------

	res.json({
		replies: result[0].replies,
		title: result[0].title,
	});
});
//CreateReply
app.post("/api/create/reply", async (req, res) => {
	const { id, userId, reply } = req.body;

	const result = threadList.filter((thread) => thread.id === id); //-------------------------------------------------

	const username = users.filter((user) => user.id === userId); //----------------------------------------------------

	result[0].replies.unshift({ name: username[0].username, text: reply });

	 await novu.trigger("topicnotification", {
	 	to: [{ type: "Topic", topicKey: id }],
	 });

	res.json({
		message: "Respuesta agregada",
	});
});

//SecurityFunctions
app.post("/api/security/generate", async (req,res) =>{
	const { msg } = req.body
	const response = await Security.passwordHash(msg)
	res.json({
		sec : response
	})
})

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});