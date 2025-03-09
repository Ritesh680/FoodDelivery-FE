import SearchBar from "../../Searchbar";
import DropdownComponent from "../../Dropdown";
import { LocationIcon } from "../../../assets/icons";
import Image from "../../Image";

const MobileNavHeader = () => {
	return (
		<div className="flex justify-between lg:justify-start gap-7 items-center">
			<a href="/" className="">
				<Image
					src="/logo.jpeg"
					alt="Logo"
					className="h-10 w-10 lg:h-[75px] lg:w-24 "
				/>
			</a>
			<div className="w-[187px] sm:w-[417px]">
				<SearchBar
					placeholder="Search for product "
					handleSearch={() => {
						//
					}}
				/>
			</div>
			<div className="sm:hidden">
				<DropdownComponent
					label="Location"
					labelClass="text-xs tracking-[5%]"
					icon={<LocationIcon className="text-xs" />}
					items={[{ label: "Location", key: "location" }]}
				/>
			</div>
		</div>
	);
};

export default MobileNavHeader;
