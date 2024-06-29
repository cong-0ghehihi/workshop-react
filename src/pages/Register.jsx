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
const Register = () => {

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
				await instance.post(`/register`, data);
                if(confirm('Redirect to login page')){
					nav('/login')
					console.log('111');
				}
			} catch (error) {
				console.log(error);
				alert(error.reponse.data || 'Register fail')
			}
		})()
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Register</h1>
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

export default Register;
