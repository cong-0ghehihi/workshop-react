import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schemaLogin, schemaRegister } from "../../schemaValid/authSchema";
import { instance } from "../../axios";

const AuthForm = ({ isRegister }) => {
  const nav = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(isRegister ? schemaRegister : schemaLogin) });

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        const res = await instance.post('/register', data);
        console.log('register', res);
        localStorage.setItem('user', res.data.accessToken);
        dispatch({ type: 'REGISTER', payload: { user: res.data.user } });

        if (confirm("Successfully, redirect to login page?")) nav("/login");
      } else {
        const res = await instance.post('/login', data);
        console.log('login', res);

        // Extract user data from the response
        const user = res.data.user;
        localStorage.setItem('user', res.data.accessToken);
        dispatch({ type: 'LOGIN', payload: { user } });

        if (confirm("Successfully, redirect to admin page?")) nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{isRegister ? "Register" : "Login"}</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input className="form-control" type="email" {...register("email")} />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input className="form-control" type="password" {...register("password")} />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>

        {isRegister && (
          <div className="mb-3">
            <label htmlFor="confirmPass" className="form-label">Confirm Password</label>
            <input className="form-control" type="password" {...register("confirmPass")} />
            {errors.confirmPass && <p className="text-danger">{errors.confirmPass.message}</p>}
          </div>
        )}

        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
