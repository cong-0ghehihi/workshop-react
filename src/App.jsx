import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard"
import ProductDetail from "./pages/ProductDetail";
import ProductForm from "./pages/admin/ProductForm";
import Notfound from "./pages/Notfound";
import LayoutClient from "./layouts/LayoutClient";
import AuthForm from "./pages/Auth/AuthForm";
import LayoutAdmin from "./layouts/LayoutAdmin";
import PrivateRoute from "./components/PrivateRoute";

function App() {

	return (
		<>

			<main>

				<Routes>

					<Route path="/login" element={<AuthForm />} />
					<Route path="/register" element={<AuthForm isRegister />} />

					<Route path="/" element={<LayoutClient />}>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Navigate to="/" />} />
						<Route path="/product-detail/:id" element={<ProductDetail />} />
					</Route>
					{/* <Route path="/about" element={<About />} />*/}
					<Route path="/admin" element={<PrivateRoute />}>
						<Route path="/admin" element={<LayoutAdmin />}>
							<Route index element={<Dashboard />} />
							<Route path="/admin/product-form" element={<ProductForm />} />
							<Route path="/admin/product-form/:id" element={<ProductForm />} />
							<Route path="*" element={<Notfound />} />
						</Route>
					</Route>
				</Routes>

			</main>

		</>
	);
}

export default App;
