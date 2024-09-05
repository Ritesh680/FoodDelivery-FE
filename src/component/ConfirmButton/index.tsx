import React, { PropsWithChildren } from "react";
import type { PopconfirmProps } from "antd";
import { Popconfirm } from "antd";

interface IPopupButtonProps {
	title: string;
	description: string;
	onConfirm: PopconfirmProps["onConfirm"];
}

const PopupButton: React.FC<PropsWithChildren<IPopupButtonProps>> = ({
	title,
	description,
	onConfirm,

	children,
}) => (
	<Popconfirm
		title={title}
		description={description}
		onConfirm={onConfirm}
		okText="Yes"
		align={{ useCssTransform: true }}
		cancelText="No">
		{children}
	</Popconfirm>
);

export default PopupButton;
