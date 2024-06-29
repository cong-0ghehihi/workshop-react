import axios from "axios";

export const instance = axios.create({
	baseURL: "http://localhost:3000",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});
export const getProducts = () => instance.get('/products');
export const getProductById = (id) => instance.get(`/products/${id}`);
export const deleteProduct = (id) => instance.delete(`/products/${id}`);
export const updateProduct = (data)=>instance.patch(`/products/${data.id}`, data) 

