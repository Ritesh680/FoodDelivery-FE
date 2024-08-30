import SearchBar from "../../Searchbar";

import MobileNavigation from "./MobileNavigation";
import { NavItems } from "../../../constants";

const Navbar = () => {
	return (
		<>
			<nav className=" relative lg:px-16 px-5 bg-white shadow-md md:flex flex-wrap items-center lg:py-0 py-2">
				<div className="flex-1 flex justify-between items-center">
					<a href="/" className="flex text-lg font-semibold">
						<img src="logo.jpeg" alt="Logo" className="h-10 lg:h-20" />
					</a>
					<div className="md:hidden">
						<SearchBar
							placeholder="Search for product "
							handleSearch={() => {
								//
							}}
						/>
					</div>
				</div>
				<label
					htmlFor="menu-toggle"
					className="cursor-pointer lg:hidden md:block hidden">
					<svg
						className="fill-current text-gray-900"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20">
						<title>menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
					</svg>
				</label>
				<input className="hidden" type="checkbox" id="menu-toggle" />
				<div
					className="hidden absolute lg:relative top-14 lg:top-0 right-0 lg:flex lg:items-center lg:w-auto w-full bg-white shadow-2xl lg:shadow-none p-2 rounded-b-lg "
					id="menu">
					<nav>
						<ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex lg:pt-0">
							<li>
								<SearchBar
									placeholder="Search for product "
									handleSearch={() => {
										//
									}}
								/>
							</li>
							{NavItems.map((item) => (
								<li className="flex gap-4 items-center py-2 lg:py-0">
									{item.icon && <item.icon />}
									<a href="/" className="text-lg text-gray-600">
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</nav>

			<div className="md:hidden absolute bottom-0">
				<MobileNavigation />
			</div>
		</>
	);
};

export default Navbar;
