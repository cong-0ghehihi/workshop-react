import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  { getProductById } from "../axios";

const ProductDetail = () => {
	const { id } = useParams();
	const [p, setP] = useState({});
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getProductById(id);
				setP(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return (
		<div>
			<h1>Product Detail</h1>
			<img src={p.thumbnail} alt="" />
			<h1>{p.title}</h1>
		</div>
	);
};

export default ProductDetail;
