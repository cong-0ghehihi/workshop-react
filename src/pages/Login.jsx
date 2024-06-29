import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import instance from "../axios";
import { useNavigate } from "react-router-dom";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})
const Login = () => {

	const nav = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: zodResolver(schema) })

	const onSubmit = (data) => {
		console.log(data);
		(async () => {
			try {
				const res = await instance.post(`/login`, data);

				localStorage.setItem('user', res.data)
				if (confirm('Redirect to home page')) {
					nav('/')
					console.log('111');
				}
			} catch (error) {
				console.log(error);
				alert(error.reponse.data || 'Login failed')
			}
		})()
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Login</h1>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input className="form-control" type="email" {...register("email", { required: true })} />
					{errors.email && <p className="text-danger">{errors.email.message}</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input className="form-control" type="password" {...register("password", { required: true })} />
					{errors.password && <p className="text-danger">{errors.password.message}</p>}
				</div>
				<button className="btn btn-primary w-100" type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Login;
