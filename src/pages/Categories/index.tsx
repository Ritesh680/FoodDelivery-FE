import QueryTable from "../../component/StaticTable/QueryTable";
import useApi from "../../api/useApi";
import { ICategory } from "../../@types/interface";
import { Button } from "antd";
import { useNavigate } from "react-router";

const CategoryList = () => {
	const { getCategories } = useApi();
	const navigate = useNavigate();
	return (
		<QueryTable<ApiResponse<ICategory[]>, ICategory>
			title="Categories"
			queryKey="Categories"
			actions={
				<Button
					className="default"
					htmlType="button"
					onClick={() => navigate("/categories/create")}>
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
					render: (item) => {
						return (
							<img
								src={import.meta.env.VITE_BASE_URL + "/file/" + item}
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

export default CategoryList;
