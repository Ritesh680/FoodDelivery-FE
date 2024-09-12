import { AutoComplete, Button, Input, Space, Spin } from "antd";

import { SearchIcon } from "../../assets/icons";
import { CloseSquareFilled, GlobalOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import useApi from "../../api/useApi";
import useDebounce from "../../hooks/useDebounce";
import QueryKeys from "../../constants/QueryKeys";

const Location = () => {
	const [search, setSearch] = useState("");
	const [location, setLocation] = useState<string>();
	const [latitude, setLatitude] = useState<number>();
	const [longitude, setLongitude] = useState<number>();
	const { getLocation } = useApi();
	const queryClient = useQueryClient();
	const debouncedValue = useDebounce(search, 500);

	const enabled: boolean = useMemo(
		() => !!debouncedValue || !!latitude || !!longitude,
		[debouncedValue, latitude, longitude]
	);

	const { data, isLoading } = useQuery({
		queryKey: [QueryKeys.Location, debouncedValue, latitude, longitude],
		queryFn: getLocation,
		onSuccess: (data) => {
			if (latitude && longitude) {
				const location =
					(data?.[0].streetName ? data?.[0].streetName + "," : "") +
					(data?.[0].city ? data?.[0].city + "," : "") +
					(data?.[0].county ? data?.[0].county + "," : "") +
					(data?.[0].state ? data?.[0].state + "," : "") +
					(data?.[0].country ? data?.[0].country : "");

				setLocation(location);
			}
		},
		enabled,
	});

	function getGeoLocation() {
		navigator.geolocation.getCurrentPosition((position) => {
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
			queryClient.invalidateQueries(QueryKeys.Location);
		});
	}

	function clearSearch() {
		setSearch("");
		setLocation("");
		setLatitude(undefined);
		setLongitude(undefined);
		queryClient.invalidateQueries(QueryKeys.Location);
	}

	const options = useMemo(() => {
		if (data?.length === 0) return [];
		return data?.map((item) => {
			const location =
				(item.city ? item.city + "," : "") +
				(item.county ? item.county + "," : "") +
				(item.state ? item.state + "," : "") +
				(item.country ? item.country : "");

			return { label: location, value: location };
		});
	}, [data]);

	return (
		<div className="flex justify-around sm:py-[70px] sm:px-[90px] items-center shadow-md rounded-lg">
			<Space.Compact
				style={{ width: "100%" }}
				className="flex items-center gap-5 lg:gap-[200px]">
				<AutoComplete
					allowClear={{
						clearIcon: <CloseSquareFilled />,
					}}
					options={options}
					searchValue={search}
					onClear={clearSearch}
					value={location ?? search}
					onSelect={(value) => {
						setLatitude(undefined);
						setLongitude(undefined);
						setSearch(value);
					}}
					className="w-full">
					<Input
						prefix={<SearchIcon />}
						placeholder="Search for your location"
						addonAfter={isLoading ? <Spin /> : ""}
						value={search}
						onChange={(e) => {
							setLatitude(undefined);
							setLongitude(undefined);
							setSearch(e.target.value);
						}}
						className="sm:min-w-[400px]"
					/>
				</AutoComplete>

				<Button
					type="text"
					htmlType="button"
					onClick={getGeoLocation}
					className="text-[8px] sm:text-base">
					<GlobalOutlined /> Use current Lcoation
				</Button>
			</Space.Compact>
		</div>
	);
};

export default Location;
