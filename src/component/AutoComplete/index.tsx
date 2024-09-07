import {
	AutoComplete as AntdAutocomplete,
	AutoCompleteProps,
	Input,
} from "antd";
import React from "react";
import { QueryFunctionContext, useQuery } from "react-query";
import useDebounce from "../../hooks/useDebounce";

interface IAutoCompleteProps<
	TData extends { data: T[] },
	T extends {
		_id: string | number | React.ReactElement;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string | number]: any;
	}
> {
	queryKey: string;
	queryFunction: (context: QueryFunctionContext) => Promise<TData>;
	onSelect: (id: string) => void;
}

type AutoComplete = AutoCompleteProps["options"];
type IOptions = AutoComplete & { id: string }[];
const AutoComplete = <
	TData extends { data: T[]; metaData: MetaObject },
	T extends {
		_id: string | number;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string | number]: any;
	}
>({
	queryKey,
	queryFunction,
	onSelect,
}: IAutoCompleteProps<TData, T>) => {
	const [search, setSearch] = React.useState("");
	const debouncedValue = useDebounce(search, 500);
	const [options, setOptions] = React.useState<IOptions>();

	const handleOnSelect = (option: { id: string }) => {
		onSelect(option.id);
	};

	useQuery({
		queryKey: [queryKey, debouncedValue],
		queryFn: queryFunction,
		onSuccess: (data) => {
			setOptions(
				data.data.map((item) => ({
					value: item.name,
					label: item.name,
					id: item._id.toString(),
				}))
			);
		},
	});

	return (
		<AntdAutocomplete
			size="large"
			className="w-full"
			options={options}
			value={search}
			onChange={(value) => setSearch(value)}
			onSelect={(_value, option) => handleOnSelect(option)}>
			<Input.Search size="large" placeholder="Search" />
		</AntdAutocomplete>
	);
};

export default AutoComplete;
