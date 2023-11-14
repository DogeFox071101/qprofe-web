import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bar from "./bar/Bar";
import Security from "./modules/Security";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const signUp = async () => {
		const pw = await Security.HashPassword(password)
		fetch("http://localhost:4000/api/register", {
			method: "POST",
			body: JSON.stringify({
				email,
				pw,
				username,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
				} else {
					alert("Cuenta creada exitosamente");
					navigate("/login");
				}
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		signUp().then(() => {
			setEmail("");
			setUsername("");
			setPassword("");
		});
		
	};
	return (
		<div>
			<Bar />
			<div className='container'>
				<div className="mt-4 border border-2 p-4 rounded col-6 mx-auto">
					<div className="mt-2">
						<h1 className='text-center'>Crea una cuenta</h1>
					</div>
					<div className="mt-4">
						<form className='registerForm' onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor='username' className="form-label">Nombre:</label>
								<input
									className="form-control"
									type='text'
									name='username'
									id='username'
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									placeholder="Nombre completo"
								/>
							</div>
							<div className="mb-3">
								<label htmlFor='email' className="form-label">Correo electrónico:</label>
								<input
									className="form-control"
									type='text'
									name='email'
									id='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Ingresar email"
								/>
							</div>
							<div className="mb-3">
								<label htmlFor='password' className="form-label">Contraseña:</label>
								<input
									className="form-control"
									type='password'
									name='password'
									id='password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Ingresar contraseña"
								/>
							</div>
							<div className="d-grid gap-2">
								<button type='submit' className='btn btn-primary'>Registrarme</button>
							</div>
							<p className="mt-3">
								¿Ya tienes una cuenta? <Link to='/login'>Iniciar sesión</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>

	);
};

export default Register;