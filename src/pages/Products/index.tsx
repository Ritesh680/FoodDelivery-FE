import QueryTable from "../../component/StaticTable/QueryTable";
import useApi from "../../api/useApi";
import { IProduct } from "../../@types/interface";
import { Button } from "antd";
import { useNavigate } from "react-router";

const ProductList = () => {
	const { getProducts } = useApi();
	const navigate = useNavigate();
	return (
		<QueryTable<ApiResponse<IProduct[]>, IProduct>
			title="Products"
			queryKey="Products"
			actions={
				<Button
					className="default"
					htmlType="button"
					onClick={() => navigate("/admin/products/create")}>
					Add new Product
				</Button>
			}
			queryFunction={getProducts}
			tableHeaders={[
				{
					key: "name",
					title: "Name",
					dataIndex: "name",
					sortDirections: ["descend", "ascend"],
					sorter: (a, b) => a.name.localeCompare(b.name),
				},
				{
					key: "price",
					title: "Price",
					dataIndex: "price",
					sortDirections: ["descend", "ascend"],
					sorter: (a, b) => a.name.localeCompare(b.name),
				},
				{ key: "description", title: "Description", dataIndex: "description" },
				{ key: "category", title: "Category", dataIndex: "category" },
				{
					key: "discountedPrice",
					title: "Discounted Price",
					dataIndex: "discountedPrice",
				},
				{ key: "quantity", title: "Quantity", dataIndex: "quantity" },
				{
					key: "_id",
					title: "Action",
					dataIndex: "_id",
					render: (item) => {
						return (
							<div className="flex items-center gap-4">
								<Button
									type="default"
									htmlType="button"
									onClick={() => navigate(`/admin/products/edit/${item}`)}>
									{"->"}
								</Button>
							</div>
						);
					},
				},
			]}
		/>
	);
};

export default ProductList;
