import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bar from "./bar/Bar";
import Security from "./modules/Security";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const loginUser = async () => {
		try {
			const pw = await Security.HashPassword(password);
			const response = await fetch("http://localhost:4000/api/auth/login", {
			  method: "POST",
			  body: JSON.stringify({
				email,
				pw,
			  }),
			  headers: {
				"Content-Type": "application/json",
			  },
			});
	  
			if (!response.ok) {
			  const data = await response.json();
			  throw new Error(data.error_message || "Error en el inicio de sesión");
			}
	  
			const data = await response.json();
			alert(data.message);
			navigate("/dashboard");
			localStorage.setItem("_id", data.id);
		  } catch (error) {
			console.error(error);
			alert("Hubo un error en el inicio de sesión. Por favor, inténtelo de nuevo.");
		  }
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser().then(() => {
			setEmail("");
			setPassword("");
		});
		
	};

	return (
		<div>
			<Bar />
			<div className='container'>
				<div className="mt-4 border border-2 p-4 rounded col-6 mx-auto">
					<div className="mt-2">
						<h1 className='text-center'>Iniciar Sesión</h1>
					</div>
					<div className="mt-4">
						<form className='loginForm' onSubmit={handleSubmit}>
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
								<button className='btn btn-primary' type="submit">Iniciar Sesión</button>
							</div>
							<p className="mt-3">
								¿No tienes una cuenta? <Link to='/register'>Regístrate</Link>
							</p>
						</form>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Login;