import { TabPaneProps, Tabs } from "antd";
import RunningOrders from "./RunningOrders";
import OrderHistory from "./OrderHistory";

interface Tab extends Omit<TabPaneProps, "tab"> {
	key: string;
	label: React.ReactNode;
}
const Orders = () => {
	const TabItems: Tab[] = [
		{ key: "order1", label: "Running Orders", children: <RunningOrders /> },
		{ key: "order2", label: "", children: <RunningOrders /> },
		{ key: "order3", label: "", children: <RunningOrders /> },
		{ key: "order4", label: "", children: <RunningOrders /> },
		{ key: "order5", label: "Order History", children: <OrderHistory /> },
	];
	return (
		<div className="flex flex-col p-4 text-black w-screen mb-20">
			<span className="text-center">My Order</span>

			<Tabs className="flex justify-between" items={TabItems}></Tabs>
		</div>
	);
};

export default Orders;
