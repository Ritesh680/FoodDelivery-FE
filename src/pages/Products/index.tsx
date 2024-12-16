import QueryTable from "../../component/StaticTable/QueryTable";
import useApi from "../../api/useApi";
import { Button, message } from "antd";
import { useNavigate } from "react-router";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import PopupButton from "../../component/ConfirmButton";
import { useMutation, useQueryClient } from "react-query";
import QueryKeys from "../../constants/QueryKeys";

const ProductList = () => {
	const { getProducts, deleteProduct } = useApi();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {
		mutate: deleteThisProduct,
		isLoading: isProductDeleting,
		variables,
	} = useMutation({
		mutationFn: (id: string) => deleteProduct(id),
		onSuccess: () => {
			message.success("Product deleted successfully");
			navigate("/admin/products");
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Products],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.SingleProduct],
			});
		},
	});
	return (
		<QueryTable<ApiResponse<IProduct[]>, IProduct>
			title="Products"
			queryKey={QueryKeys.Products}
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
					render: (value) => <p className="w-40 truncate">{value}</p>,
				},
				{
					key: "description",
					title: "Description",
					dataIndex: "description",
					render: (value) => <p className="line-clamp-3">{value}</p>,
				},
				{
					key: "category",
					title: "Category",
					dataIndex: "category",
					render: (value) => <p className="w-28 truncate">{value.name}</p>,
				},
				{
					key: "price",
					title: "Price",
					dataIndex: "price",
					sortDirections: ["descend", "ascend"],
					sorter: (a, b) => (a.price ?? 0) - (b.price ?? 0),
				},
				{
					key: "discountedPrice",
					title: "Discounted Price",
					dataIndex: "discountedPrice",
					render: (item) => item ?? "N/A",
				},
				{
					key: "quantity",
					title: "Quantity",
					dataIndex: "quantity",
					sortDirections: ["descend", "ascend"],
					sorter: (a, b) => a.quantity - b.quantity,
				},
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
									<InfoCircleOutlined />
								</Button>
								<PopupButton
									title="Delete Category"
									description="Are you sure?"
									onConfirm={() => {
										deleteThisProduct(item);
									}}>
									<Button
										type="primary"
										danger
										loading={isProductDeleting && variables === item}>
										<DeleteOutlined />
									</Button>
								</PopupButton>
							</div>
						);
					},
				},
			]}
		/>
	);
};

export default ProductList;
