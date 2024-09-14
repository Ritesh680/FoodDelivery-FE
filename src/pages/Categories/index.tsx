import QueryTable from "../../component/StaticTable/QueryTable";
import useApi from "../../api/useApi";
import { ICategory } from "../../@types/interface";
import { Button, message } from "antd";
import { useNavigate } from "react-router";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import PopupButton from "../../component/ConfirmButton";
import { useMutation, useQueryClient } from "react-query";
import QueryKeys from "../../constants/QueryKeys";

const CategoryList = () => {
	const { getCategories, deleteCategory } = useApi();
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const {
		mutate: deleteThisCategory,
		isLoading: isCategoryDeleting,
		variables,
	} = useMutation({
		mutationFn: (id: string) => deleteCategory(id),
		onSuccess: () => {
			message.success("Category deleted successfully");
			navigate("/admin/categories");
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Categories],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.SingleCategory],
			});
		},
	});
	return (
		<QueryTable<ApiResponse<ICategory[]>, ICategory>
			title="Categories"
			queryKey={QueryKeys.Categories}
			actions={
				<Button
					className="default"
					htmlType="button"
					onClick={() => navigate("/admin/categories/create")}>
					Add new Category
				</Button>
			}
			queryFunction={getCategories}
			tableHeaders={[
				{
					key: "name",
					title: "Name",
					dataIndex: "name",
					sortDirections: ["descend", "ascend"],
					sorter: (a, b) => a.name.localeCompare(b.name),
				},
				{
					key: "image",
					title: "Image",
					dataIndex: "image",
					render: (item: ICategory["image"]) => {
						return (
							<img
								src={item?.[0]?.url}
								alt="item"
								className="w-20 h-20 object-cover rounded"
								onError={(e) => {
									e.currentTarget.src = "https://via.placeholder.com/150";
								}}
								loading="lazy"
							/>
						);
					},
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
									onClick={() => navigate(`/admin/categories/edit/${item}`)}>
									<InfoCircleOutlined />
								</Button>

								<PopupButton
									title="Delete Category"
									description="Are you sure?"
									onConfirm={() => {
										deleteThisCategory(item);
									}}>
									<Button
										type="primary"
										danger
										loading={isCategoryDeleting && variables === item}>
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

export default CategoryList;
