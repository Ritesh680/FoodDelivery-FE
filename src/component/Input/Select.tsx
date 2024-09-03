import { ConfigProvider, Form, Select } from "antd";

import {
	FieldValues,
	UseControllerProps,
	useController,
} from "react-hook-form";

interface SelectProps<T extends FieldValues> extends UseControllerProps<T> {
	options: { label: string; value: string | number; disabled?: boolean }[];
	label?: string;
	loading?: boolean;
}

const SelectField = <T extends FieldValues>({
	name,
	control,
	rules,
	defaultValue,
	options,
	label,
	loading,
}: SelectProps<T>) => {
	const {
		field,
		formState: { errors },
	} = useController({ name, control, rules, defaultValue });
	return (
		<ConfigProvider
			theme={{
				components: {
					Select: {
						controlHeight: 40,
						optionSelectedBg: "#78bdf3",
						optionSelectedColor: "#fff",
						optionActiveBg: "#FEE2E2",
					},
				},
			}}>
			<Form.Item label={label} layout="vertical" required={!!rules?.required}>
				<Select
					{...field}
					defaultValue=""
					status={errors[name] ? "error" : ""}
					options={options}
					loading={loading}
				/>
			</Form.Item>
		</ConfigProvider>
	);
};

export default SelectField;
