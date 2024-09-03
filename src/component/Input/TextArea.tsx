import { Form, Input } from "antd";

import {
	FieldValues,
	UseControllerProps,
	useController,
} from "react-hook-form";

interface TextAreaProps<T extends FieldValues> extends UseControllerProps<T> {
	placeholder: string;
	label?: string;
}
const TextArea = <T extends FieldValues>({
	name,
	control,
	rules,
	defaultValue,
	placeholder,
	label,
}: TextAreaProps<T>) => {
	const {
		field,
		formState: { errors },
	} = useController({ name, control, rules, defaultValue });
	return (
		<Form.Item label={label} layout="vertical" required={!!rules?.required}>
			<Input.TextArea
				{...field}
				placeholder={placeholder}
				className="w-full py-2 rounded-lg"
				status={errors[name] ? "error" : ""}
				rows={4}
			/>
		</Form.Item>
	);
};

export default TextArea;
