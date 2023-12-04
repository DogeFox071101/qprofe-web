import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navb from "./Navb";

const Replies = () => {
	const [replyList, setReplyList] = useState([]);
	const [reply, setReply] = useState("");
	const [title, setTitle] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	// Función para obtener el token CSRF de la cookie - Q'Profe
	const obtenerTokenCSRF = () => {
		const cookies = document.cookie.split("; ");
		for (const cookie of cookies) {
		  const [name, value] = cookie.split("=");
		  if (name === "XSRF-TOKEN") {
			return value;
		  }
		}
		return null;
	  };

	const addReply = () => {

		// Obtener el token CSRF de la cookie
		const csrfToken = obtenerTokenCSRF();

		fetch("http://localhost:4000/api/create/reply", {
			method: "POST",
			body: JSON.stringify({
				id,
				userId: localStorage.getItem("_id"),
				reply,
			}),
			headers: {
				"Content-Type": "application/json",
				"csrf-token": csrfToken,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				alert(data.message);
				navigate("/dashboard");
			})
			.catch((err) => console.error(err));
	};
	const handleSubmitReply = (e) => {
		e.preventDefault();
		addReply();
		setReply("");
	};

	useEffect(() => {
		const fetchReplies = () => {
			fetch("http://localhost:4000/api/thread/replies", {
				method: "POST",
				body: JSON.stringify({
					id,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setReplyList(data.replies);
					setTitle(data.title);
				})
				.catch((err) => console.error(err));
		};
		fetchReplies();
	}, [id]);

	return (
		<>
			<Navb />
			<div className='container'>
				<div className="mt-4 border border-2 p-4 rounded col-12 mx-auto">
					<div className="mt-2">
						<h1 className='repliesTitle'>{title}</h1>
					</div>
					<form className='modal__content' onSubmit={handleSubmitReply}>
						<label htmlFor='reply' className="form-label">Responder al post:</label>
						<textarea
							rows={5}
							value={reply}
							onChange={(e) => setReply(e.target.value)}
							type='text'
							name='reply'
							className='modalInput'
						/>
						<button className='modalBtn btn btn-primary'>Enviar</button>
					</form>
				</div>
				<div className='thread__container'>
					{replyList.map((reply) => (
						<div className='thread__item'>
							<p>{reply.text}</p>
							<div className='react__container'>
								<p style={{ opacity: "0.5" }}>por {reply.name}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>

	);
};

export default Replies;