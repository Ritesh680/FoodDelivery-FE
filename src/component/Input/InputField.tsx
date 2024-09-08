import { Form, Input } from "antd";

import {
	FieldValues,
	UseControllerProps,
	useController,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> extends UseControllerProps<T> {
	type?: "text" | "number" | "password";
	placeholder: string;
	label?: string;
	showErrorMessage?: boolean;
}
const InputField = <T extends FieldValues>({
	name,
	control,
	rules,
	defaultValue,
	type = "text",
	placeholder,
	label,
	showErrorMessage = true,
	disabled,
}: InputFieldProps<T>) => {
	const {
		field,
		formState: { errors },
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue });

	if (type === "password") {
		return (
			<Form.Item
				label={label}
				layout="vertical"
				required={!!rules?.required}
				className="text-xxs lg:text-base w-full">
				<Input.Password
					{...field}
					placeholder={placeholder}
					className="w-full py-2 rounded-lg"
					status={errors[name] ? "error" : ""}
					disabled={disabled}
				/>
				{showErrorMessage && error && (
					<p className="text-red-500 text-xxs lg:text-xs">{error?.message}</p>
				)}
			</Form.Item>
		);
	}
	return (
		<Form.Item
			label={label}
			layout="vertical"
			required={!!rules?.required}
			className="text-xxs lg:text-base w-full">
			<Input
				type={type}
				{...field}
				placeholder={placeholder}
				className="w-full py-2 rounded-lg"
				status={errors[name] ? "error" : ""}
				disabled={disabled}
			/>
			{showErrorMessage && error && (
				<p className="text-red-500 text-xxs lg:text-xs">{error?.message}</p>
			)}
		</Form.Item>
	);
};

export default InputField;
