import { Link, useNavigate } from "react-router-dom";
import DropdownComponent from "../../Dropdown";
import {
	CartIcon,
	LocationIcon,
	MenuIcon,
	OffersIcon,
	UserIcon,
} from "../../../assets/icons";
import { useCallback, useMemo, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import AdminRoutes from "../../../routes/AdminRoutes";
import useApi from "../../../api/useApi";
import AutoComplete from "../../AutoComplete";
import { Button, Dropdown, MenuProps } from "antd";
import Location from "../../Location";

type Icon = React.FunctionComponent<
	React.SVGProps<SVGSVGElement> & {
		title?: string | undefined;
	}
>;

interface NavIconWithComponent {
	name?: never;
	icon?: never;
	component: React.ReactNode;
	onclick?: never;
}
interface NavIconWithNavigate {
	name: string;
	icon: Icon;
	component?: never;
	onclick: () => void;
}

type NavItems = NavIconWithComponent | NavIconWithNavigate;

const Navbar = () => {
	const [showLocation, setShowLocation] = useState(false);
	const { authenticated, userDetail } = useAuth();

	const { getProducts } = useApi();
	const navigate = useNavigate();

	const toggleLocation = useCallback(() => {
		setShowLocation((prev) => !prev);
	}, []);

	const MenuItems: MenuProps["items"] = useMemo(
		() => [
			{
				key: "menu1",
				label: <Link to="/category/chicken">Menu</Link>,
			},
			{ key: "menu2", label: <Link to="/category/momo">Momo</Link> },
			{ key: "menu3", label: <Link to="/category/burger">Burger</Link> },
			{ key: "menu4", label: <Link to="/category/pizza">Pizza</Link> },
		],
		[]
	);

	const OffersItems: MenuProps["items"] = useMemo(
		() => [
			{
				key: "offers1",
				label: <Link to="/offers?category=top">Top Offers</Link>,
				className: "py-[26.5px]",
			},
			{
				key: "offers2",
				label: <Link to="/offers?category=dashain">Dashain Offers</Link>,
				className: "py-[26.5px]",
			},
			{
				key: "offers3",
				label: <Link to="/offers?category=daily">Daily Offers</Link>,
				className: "py-[26.5px]",
			},
			{
				key: "offers4",
				label: <Link to="/offers?category=seasonal">Seasonal Offers</Link>,
				className: "py-[26.5px]",
			},
		],
		[]
	);

	const NavItems: NavItems[] = useMemo(
		() => [
			{
				component: (
					<Dropdown menu={{ items: MenuItems }}>
						<Button className="border-0 shadow-none w-full">
							<MenuIcon /> Menu
						</Button>
					</Dropdown>
				),
			},
			{
				component: (
					<Dropdown menu={{ items: OffersItems }}>
						<Button className="border-0 shadow-none w-full">
							<OffersIcon /> Offers
						</Button>
					</Dropdown>
				),
			},
			{
				component: (
					<div className="relative w-full">
						<Button
							className="border-0 shadow-none w-full"
							onClick={toggleLocation}>
							<LocationIcon /> Location
						</Button>

						{showLocation ? (
							<div
								className={`absolute right-0 top-10 bg-white z-50 rounded shadow-2xl ${
									showLocation ? "block" : "hidden"
								}`}>
								<Location />
							</div>
						) : null}
					</div>
				),
			},
			{ name: "Login", icon: UserIcon, onclick: () => navigate("/login") },
			{ name: "Cart", icon: CartIcon, onclick: () => navigate("/cart") },
		],
		[MenuItems, OffersItems, toggleLocation, showLocation, navigate]
	);

	const List: NavItems[] = useMemo(() => {
		if (userDetail?.user?.role === "admin") {
			return AdminRoutes.filter((item) => !item.hidden).map((route) => ({
				name: route.name,
				icon: route.icon as Icon,
				onclick: () => navigate(`/admin/${route.route}`),
			}));
		} else {
			return NavItems;
		}
	}, [userDetail?.user?.role, navigate, NavItems]);

	const NavItemList = useMemo(() => {
		return [...List].map((item) =>
			item.name === "Login" && authenticated
				? {
						...item,
						href: "/profile",
						name: "Profile",
						onclick: () => navigate("/profile"),
				  }
				: item
		);
	}, [authenticated, List, navigate]);

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
				className="hidden absolute lg:relative top-14 lg:top-0 right-0 xl:flex lg:items-center lg:w-auto w-full bg-white shadow-2xl lg:shadow-none p-2 rounded-b-lg z-50"
				id="menu">
				<nav>
					<ul className="text-xl text-center items-center pt-4 gap-x-8 lg:text-lg lg:flex lg:pt-0">
						{NavItemList.map((item, index) => (
							<li
								key={index}
								className="flex gap-4 items-center py-2 lg:py-0 w-full sm:hover:border lg:hover:border-none">
								{item.component ? (
									item.component
								) : (
									<Button
										className="text-sm flex items-center gap-2 hover:scale-y-105 border-none shadow-none w-full"
										onClick={item.onclick}>
										{item.icon && <item.icon />}
										{item.name}
									</Button>
								)}
							</li>
						))}
						{/* //FIXME: ERROR WHILE CLOSING THE DROPDOWN */}
					</ul>
				</nav>
			</div>
		</nav>
	);
};

export default Navbar;
