import { NavItems } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import DropdownComponent from "../../Dropdown";
import { LocationIcon } from "../../../assets/icons";
import { useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import AdminRoutes from "../../../routes/AdminRoutes";
import useApi from "../../../api/useApi";
import AutoComplete from "../../AutoComplete";

const Navbar = () => {
	const { authenticated, userDetail } = useAuth();

	const { getProducts } = useApi();
	const navigate = useNavigate();

	const List = useMemo(() => {
		if (userDetail?.user?.role === "admin") {
			return AdminRoutes.filter((item) => !item.hidden).map((route) => ({
				name: route.name,
				icon: route.icon,
				href: `/admin/${route.route}`,
			}));
		} else {
			return NavItems;
		}
	}, [userDetail?.user?.role]);

	const NavItemList = useMemo(() => {
		return [...List].map((item) =>
			item.name === "Login" && authenticated
				? { ...item, href: "/profile", name: "Profile" }
				: item
		);
	}, [authenticated, List]);

	return (
		<nav
			className={`relative lg:px-16 px-5 bg-white shadow-md sm:flex flex-wrap items-center justify-between lg:py-0 sm:py-2`}>
			<div className="flex justify-between lg:justify-start gap-7 items-center">
				<a href="/" className="">
					<img
						src="/logo.jpeg"
						alt="Logo"
						className="h-10 w-10 lg:h-[75px] lg:w-24 "
					/>
				</a>
				<div className="w-[187px] sm:w-[417px]">
					<AutoComplete
						queryFunction={getProducts}
						queryKey="Products"
						onSelect={(id: string) => navigate("/product/" + id)}
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
				className="hidden absolute lg:relative top-14 lg:top-0 right-0 xl:flex lg:items-center lg:w-auto w-full bg-white shadow-2xl lg:shadow-none p-2 rounded-b-lg "
				id="menu">
				<nav>
					<ul className="text-xl text-center items-center pt-4 gap-x-12 lg:text-lg lg:flex lg:pt-0">
						{NavItemList.map((item, index) => (
							<li
								key={item.href + index}
								className="flex gap-4 items-center py-2 lg:py-0 hover:scale-y-105">
								<Link
									to={item.href}
									className="text-sm text-gray-600 flex items-center gap-2">
									{item.icon && <item.icon />}
									{item.name}
								</Link>
							</li>
						))}
						{/* //FIXME: ERROR WHILE CLOSING THE DROPDOWN */}
						{/* <li className="flex gap-4 items-center py-2 lg:py-0 hover:scale-y-105 cursor-pointer hover:text-red-500">
							<Dropdown
								placement="bottomLeft"
								arrow
								menu={{ items: LocationItems, itemRef: "location" }}>
								<span
									className="text-sm text-gray-600 flex items-center gap-2 hover:scale-y-105 cursor-pointer hover:text-red-500"
									onClick={() => setIsLocationActive(!isLocationActive)}>
									<LocationIcon />
									Location
								</span>
							</Dropdown>
						</li> */}
					</ul>
				</nav>
			</div>
		</nav>
	);
};

export default Navbar;
