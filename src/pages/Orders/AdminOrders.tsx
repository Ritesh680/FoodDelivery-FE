import QueryKeys from "../../constants/QueryKeys";
import useApi from "../../api/useApi";
import QueryTable from "../../component/StaticTable/QueryTable";
import { IOrderData } from "../../@types/interface";
import { Select } from "antd";
import { useMutation, useQueryClient } from "react-query";

const AdminOrders = () => {
	const { getOrders, updateOrderPaymentStatus, updateOrderStatus } = useApi();
	const queryClient = useQueryClient();

	const {
		mutate: updatePaymentStatus,
		isLoading: isPaymentUpdating,
		variables: paymentVariables,
	} = useMutation({
		mutationFn: (data: { id: string; status: string }) =>
			updateOrderPaymentStatus(data.id, data.status),
		onSuccess: (_data, variables) => {
			queryClient.setQueriesData<ApiResponse<IOrderData[]> | undefined>(
				QueryKeys.AdminOrders,
				(oldData: ApiResponse<IOrderData[]> | undefined) => {
					return {
						...oldData,
						data: oldData?.data.map((order) => {
							if (order._id === variables.id) {
								return { ...order, paymentStatus: variables.status };
							}
							return order;
						}),
					} as ApiResponse<IOrderData[]>;
				}
			);
		},
	});

	const Status = useMutation({
		mutationFn: (data: { id: string; status: string }) =>
			updateOrderStatus(data.id, data.status),
		onSuccess: (_res, variables) => {
			queryClient.setQueriesData<ApiResponse<IOrderData[]> | undefined>(
				QueryKeys.AdminOrders,
				(oldData: ApiResponse<IOrderData[]> | undefined) => {
					return {
						...oldData,
						data: oldData?.data.map((order) => {
							if (order._id === variables.id) {
								return { ...order, status: variables.status };
							}
							return order;
						}),
					} as ApiResponse<IOrderData[]>;
				}
			);
		},
	});

	function handlePaymentStatusChange(id: string, status: string) {
		updatePaymentStatus({ id, status });
	}
	function handleStatusChange(id: string, status: string) {
		Status.mutate({ id, status });
	}

	return (
		<div>
			<QueryTable<ApiResponse<IOrderData[]>, IOrderData>
				queryFunction={getOrders}
				title="Orders"
				queryKey={QueryKeys.AdminOrders}
				tableHeaders={[
					{
						title: "Name",
						key: "user",
						render: (item) => item?.name,
						dataIndex: "user",
					},
					{
						title: "Products",
						dataIndex: "products",
						key: "products",
						render: (item: IOrderData["products"]) =>
							item
								.map((product) => {
									return product.product?.name + " (" + product.quantity + ")";
								})
								.join(", "),
					},
					{
						title: "Status",
						key: "status",
						dataIndex: "status",

						render: (item, record) => (
							<Select
								variant="filled"
								value={item?.toUpperCase()}
								className={`${
									item.toUpperCase() == "COMPLETED"
										? "bg-green-500"
										: item.toUpperCase() == "CANCELLED"
										? "bg-red-500"
										: "bg-yellow-500"
								} text-white outline-none`}
								onChange={(e) => handleStatusChange(record._id, e as string)}
								loading={
									Status.isLoading && Status.variables?.id === record._id
								}>
								<Select.Option value="completed">Completed</Select.Option>
								<Select.Option value="Cancelled">Cancelled</Select.Option>
							</Select>
						),
					},
					{
						title: "Payment Method",
						key: "paymentMethod",
						dataIndex: "paymentMethod",
					},
					{
						title: "Payment Status",
						key: "paymentStatus",
						dataIndex: "paymentStatus",
						render: (item, record) => (
							<Select
								variant="filled"
								value={item?.toUpperCase()}
								className={`${
									item.toUpperCase() == "PAID"
										? "bg-green-500"
										: "bg-yellow-500"
								} text-white outline-none min-w-[100px]`}
								onChange={(e) =>
									handlePaymentStatusChange(record._id, e as string)
								}
								loading={
									isPaymentUpdating && paymentVariables?.id === record._id
								}>
								<Select.Option value="pending">Pending</Select.Option>
								<Select.Option value="paid">Paid</Select.Option>
							</Select>
						),
					},
					{
						title: "Contact Number",
						key: "contact",
						dataIndex: "contact",
					},
					{
						title: "Order Date",
						key: "createdAt",
						dataIndex: "createdAt",
						sorter: (a, b) =>
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							(new Date(a.createdAt) as any) - (new Date(b.createdAt) as any),
						render: (item) => {
							return new Date(item).toLocaleString();
						},
					},
				]}
			/>
		</div>
	);
};

export default AdminOrders;
