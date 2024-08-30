import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { ChevronRight } from "../../assets/icons";

interface IDropdownProps {
	label: string;
	labelClass?: string;
	items: MenuProps["items"];
	icon?: React.ReactNode;
}
const DropdownComponent: React.FC<IDropdownProps> = ({
	label,
	labelClass,
	icon,
	items,
}) => (
	<Dropdown menu={{ items }}>
		<a onClick={(e) => e.preventDefault()}>
			<Space>
				<button className="flex items-center gap-1">
					{icon}
					<span className={labelClass}>{label}</span>
					<ChevronRight className="rotate-90 text-xs" />
				</button>
			</Space>
		</a>
	</Dropdown>
);

export default DropdownComponent;
