import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
	console.log(key);
};

interface ITabItems {
	items: TabsProps["items"];
	tabPosition: TabsProps["tabPosition"];
	type: TabsProps["type"];
}

const items1: TabsProps["items"] = [
	{
		key: "1",
		label: "Tab 1",
		children: "Content of Tab Pane 1",
	},
	{
		key: "2",
		label: "Tab 2",
		children: "Content of Tab Pane 2",
	},
	{
		key: "3",
		label: "Tab 3",
		children: "Content of Tab Pane 3",
	},
];

const TabComponent: React.FC<ITabItems> = ({
	items = items1,
	tabPosition = "top",
	type,
}) => (
	<Tabs
		defaultActiveKey="1"
		items={items}
		onChange={onChange}
		tabPosition={tabPosition}
		type={type}
	/>
);

export default TabComponent;
