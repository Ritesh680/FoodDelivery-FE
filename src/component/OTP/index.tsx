import { Flex, Input } from "antd";
import type { GetProps } from "antd";
import {
	FieldValues,
	UseControllerProps,
	useController,
} from "react-hook-form";

type OTPProps = GetProps<typeof Input.OTP>;

interface Props<T extends FieldValues> extends UseControllerProps<T> {
	status?: "error" | "warning";
}

const OTPInput = <T extends FieldValues>({
	name,
	control,
	defaultValue,
	rules,
	status,
}: Props<T>) => {
	const { field } = useController({ name, control, defaultValue, rules });
	const onChange: OTPProps["onChange"] = (text) => {
		field.onChange(text);
	};

	const sharedProps: OTPProps = {
		onChange,
	};

	return (
		<Flex gap="middle" align="center" vertical>
			<Input.OTP
				value={field.value}
				length={4}
				size="large"
				status={status}
				formatter={(str) => str.toUpperCase()}
				{...sharedProps}
			/>
		</Flex>
	);
};

export default OTPInput;
