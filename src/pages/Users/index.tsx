import QueryTable from "../../component/StaticTable/QueryTable";
import useApi from "../../api/useApi";
import { IUserResponse } from "../../@types/interface";
import { Button } from "antd";
import { useNavigate } from "react-router";
import useInnerWidth from "../../hooks/useInnerWidth";

const UserList = () => {
	const { getAllUsers } = useApi();
	const navigate = useNavigate();
	const { isMobileDevice } = useInnerWidth();
	return (
		<QueryTable<ApiResponse<IUserResponse[]>, IUserResponse>
			title="Users"
			queryKey="users"
			queryFunction={getAllUsers}
			tableHeaders={[
				{
					key: "name",
					title: "Name",
					dataIndex: "name",
					fixed: isMobileDevice ? "left" : undefined,
					sortDirections: ["descend", "ascend"],
					sorter: (a, b) => a.name.localeCompare(b.name),
				},
				{
					key: "email",
					title: "Email",
					dataIndex: "email",
					sortDirections: ["descend", "ascend"],
					sorter: (a, b) => a.name.localeCompare(b.name),
				},
				{ key: "phone", title: "Phone", dataIndex: "phone" },
				{ key: "role", title: "Role", dataIndex: "role" },
				{
					key: "provider",
					title: "Provider",
					dataIndex: "provider",
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

export default UserList;
