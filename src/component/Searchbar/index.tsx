import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { SearchIcon } from "../../assets/icons";

const SearchBar = ({
	handleSearch,
	placeholder,
}: {
	handleSearch: (query: string) => void;
	placeholder?: string;
}) => {
	const [query, setQuery] = useState<string>("");
	const debouncedValue = useDebounce(query, 500);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	useEffect(() => {
		handleSearch(debouncedValue);
	}, [debouncedValue, handleSearch]);
	return (
		<div className="relative flex items-center border rounded border-neutral-300 w-full px-3">
			<input
				type="text"
				placeholder={placeholder ?? "Search"}
				className="h-10 border-0 ml-7 w-full"
				value={query}
				onChange={handleChange}
			/>
			<SearchIcon className="absolute text-neutral-300" />
		</div>
	);
};

export default SearchBar;
