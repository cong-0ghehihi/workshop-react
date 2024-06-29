import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/product";
import { deleteProduct } from "../../axios";

const Dashboard = () => {
	const { state, dispatch } = useContext(ProductContext); // Lấy state và dispatch từ context

	const [filteredData, setFilteredData] = useState([]); // Khai báo state cho dữ liệu sản phẩm sau khi tìm kiếm

	const handleSearchChange = (e) => {
		const result = state.products.filter((p) => p.title.toLowerCase().includes(e.target.value.toLowerCase()));
		setFilteredData(result);
	};

	console.log(filteredData); // In state ra console để kiểm tra

	const removeProduct = async (productId) => {
		try {
			await deleteProduct(productId); // Gọi API để xóa sản phẩm
			dispatch({ type: 'DELETE_PRODUCT', payload: productId }); // Dispatch hành động xóa sản phẩm
		} catch (error) {
			console.error('Error deleting product:', error); // Bắt lỗi nếu có
		}
	};

	useEffect(() => {
		if (state) {
			setFilteredData(state.products); // Khởi tạo filteredData với tất cả sản phẩm ban đầu
		}
	}, [state]); // Chỉ chạy effect này khi state thay đổi

	return (
		<div>
			<h1>Hello, admin</h1>
			<Link to="/admin/product-form" className="btn btn-primary">
				Add new product
			</Link>

			<div className="search-bar">
				<input
					type="text"
					placeholder="Search by title..."
					className="form-control"
					onChange={handleSearchChange} // Cập nhật từ khóa tìm kiếm khi người dùng nhập
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
					{filteredData.map((p) => ( // Sử dụng filteredData để hiển thị dữ liệu đã tìm kiếm
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
