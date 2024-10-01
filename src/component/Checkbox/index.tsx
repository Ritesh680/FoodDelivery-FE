import {
	FieldValues,
	UseControllerProps,
	useController,
} from "react-hook-form";

interface Props<T extends FieldValues> extends UseControllerProps<T> {
	label: string;
}

const Checkbox = <T extends FieldValues>({
	name,
	control,
	defaultValue,
	rules,
	label,
}: Props<T>) => {
	const { field } = useController({ name, control, defaultValue, rules });

	return (
		<div className="flex gap-4 items-center">
			<input type="checkbox" {...field} id={name} checked={field.value} />
			<label htmlFor={name}>{label}</label>
		</div>
	);
};

export default Checkbox;
