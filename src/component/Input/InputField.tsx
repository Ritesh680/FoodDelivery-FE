import { Form, Input } from "antd";

import {
	FieldValues,
	UseControllerProps,
	useController,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> extends UseControllerProps<T> {
	type?: "text" | "number";
	placeholder: string;
	label?: string;
}
const InputField = <T extends FieldValues>({
	name,
	control,
	rules,
	defaultValue,
	type = "text",
	placeholder,
	label,
}: InputFieldProps<T>) => {
	const {
		field,
		formState: { errors },
	} = useController({ name, control, rules, defaultValue });
	return (
		<Form.Item label={label} layout="vertical" required={!!rules?.required}>
			<Input
				type={type}
				{...field}
				placeholder={placeholder}
				className="w-full py-2 rounded-lg"
				status={errors[name] ? "error" : ""}
			/>
		</Form.Item>
	);
};

export default InputField;
