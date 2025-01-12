import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext} from "../context/product";

function Home() {

	const {state}= useContext(ProductContext)
	return (
		<>
			<h1>Danh sach san pham</h1>
			{state.products.map((product) => (
				<div key={product.id} className="card">
					<Link to={`/product-detail/${product.id}`}>
						<img src={product.thumbnail} alt="" />
					</Link>
					<Link to={`/product-detail/${product.id}`}>
						<h2>{product.title}</h2>
					</Link>
					<p>${product.price}</p>
					<p>{product.description}</p>
					<button className="btn btn-danger">Add to cart</button>
				</div>
			))}
		</>
	);
}

export default Home;
