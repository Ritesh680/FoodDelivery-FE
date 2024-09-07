import { Button, ConfigProvider } from "antd";
import { PropsWithChildren } from "react";

const variantStyle = {
	primary: { primaryColor: "text-white", colorPrimaryBg: "blue" },
};

const CustomButton = ({
	variant,
	children,
}: PropsWithChildren<{ variant: keyof typeof variantStyle }>) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Button: variantStyle[variant],
				},
			}}>
			<Button type="primary">{children}</Button>
		</ConfigProvider>
	);
};

export default CustomButton;
