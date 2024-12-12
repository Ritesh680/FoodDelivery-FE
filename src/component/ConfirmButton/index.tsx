import React, { PropsWithChildren } from "react";
import type { PopconfirmProps } from "antd";
import { Popconfirm } from "antd";

interface IPopupButtonProps {
	title: string;
	description: string;
	onConfirm: PopconfirmProps["onConfirm"];
	isLoading?: boolean;
}

const PopupButton: React.FC<PropsWithChildren<IPopupButtonProps>> = ({
	title,
	description,
	onConfirm,
	isLoading,
	children,
}) => (
	<Popconfirm
		title={title}
		description={description}
		onConfirm={onConfirm}
		okButtonProps={{ loading: isLoading }}
		okText="Yes"
		align={{ useCssTransform: true }}
		cancelText="No">
		{children}
	</Popconfirm>
);

export default PopupButton;
