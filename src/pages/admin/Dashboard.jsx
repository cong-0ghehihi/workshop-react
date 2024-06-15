import React, { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../axios";

const Dashboard = ({ data, removeProduct }) => {

	const [searchTerm, setSearchTerm] = useState('');

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value)
	}
const searchData = data.filter((p)=>p.title.toLowerCase().includes(searchTerm.toLowerCase()));
	return (
		<div>
			<h1>Hello, admin</h1>
			<Link to="/admin/product-form" className="btn btn-primary">
				Add new product
			</Link>

			<div className="search-bar">
				<input type="text"
				placeholder="Search by title..."
				className="form-control"
					value={searchTerm}
					onChange={handleSearchChange }
				/>
			</div>

			<table className="table table-bordered table-striped text-center">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Thumbnail</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{searchData.map((p) => (
						<tr key={p.id}>
							<td>{p.id}</td>
							<td>{p.title}</td>
							<td>{p.price}</td>
							<td>{p.description || "Dang cap nhat"}</td>
							<td>{p.thumbnail ? <img src={p.thumbnail} alt="Dang cap nhat" /> : "Dang cap nhat"}</td>
							<td>
								<button className="btn btn-danger" onClick={() => removeProduct(p.id)}>Delete</button>
								<Link to={`/admin/product-form/${p.id}`} className="btn btn-warning">
									Edit
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
