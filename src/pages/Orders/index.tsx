import { TabPaneProps, Tabs } from "antd";
import RunningOrders from "./RunningOrders";
import OrderHistory from "./OrderHistory";
import useAuth from "../../hooks/useAuth";
import AdminOrders from "./AdminOrders";

interface Tab extends Omit<TabPaneProps, "tab"> {
	key: string;
	label: React.ReactNode;
}
const Orders = () => {
	const { userDetail } = useAuth();

	const TabItems: Tab[] = [
		{ key: "order1", label: "Running Orders", children: <RunningOrders /> },
		{ key: "order2", label: "", children: <RunningOrders /> },
		{ key: "order3", label: "", children: <RunningOrders /> },
		{ key: "order4", label: "", children: <RunningOrders /> },
		{ key: "order5", label: "Order History", children: <OrderHistory /> },
	];

	return (
		<>
			{userDetail?.user?.role === "admin" ? (
				<AdminOrders />
			) : (
				<div className="flex flex-col p-4 text-black w-screen mb-20">
					<span className="text-center">My Order</span>

					<Tabs className="flex justify-between" items={TabItems}></Tabs>
				</div>
			)}
		</>
	);
};

export default Orders;
