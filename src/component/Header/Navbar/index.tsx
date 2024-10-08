import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Menu, MenuProps } from "antd";

import DropdownComponent from "../../Dropdown";
import {
	CartIcon,
	LocationIcon,
	MenuIcon,
	OffersIcon,
	UserIcon,
} from "../../../assets/icons";
import useAuth from "../../../hooks/useAuth";
import AdminRoutes from "../../../routes/AdminRoutes";
import useApi from "../../../api/useApi";
import AutoComplete from "../../AutoComplete";
import { ICategory } from "../../../@types/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type MenuItem = Required<MenuProps>["items"][number];

const Navbar = ({ categories }: { categories: ICategory[] }) => {
	const { authenticated, userDetail } = useAuth();

	const { getProducts } = useApi();
	const navigate = useNavigate();
	const cart = useSelector((state: RootState) => state.cart.cart);
	const cartItemsCount = useMemo(
		() => cart.reduce((acc, curr) => acc + curr.quantity, 0),
		[cart]
	);

	const MenuItems: MenuItem[] = useMemo(
		() => [
			{
				key: "menu",
				icon: <MenuIcon />,
				label: "Menu",
				children: categories.map((category) => ({
					key: category._id,
					label: <Link to={`/menu/${category._id}`}>{category.name}</Link>,
					children: category.subcategories.length
						? category.subcategories?.map((subCategory) => ({
								key: subCategory._id,
								label: (
									<Link to={`/menu/${category._id}?sub=${subCategory.name}`}>
										{subCategory.name}
									</Link>
								),
						  }))
						: undefined,
				})),
			},
			{
				key: "offers",
				icon: <OffersIcon />,
				label: " Offers",
				children: [
					{
						key: "offers1",
						label: <Link to="/offers?category=top">Top Offers</Link>,
					},
					{
						key: "offers2",
						label: <Link to="/offers?category=dashain">Dashain Offers</Link>,
					},
					{
						key: "offers3",
						label: <Link to="/offers?category=daily">Daily Offers</Link>,
					},
					{
						key: "offers4",
						label: <Link to="/offers?category=seasonal">Seasonal Offers</Link>,
					},
				],
			},

			// {
			// 	key: "location",
			// 	icon: <LocationIcon />,
			// 	label: "Location",

			// 	children: [
			// 		{ key: "locationExpand", label: <Location />, selectable: true },
			// 	],
			// },
			{
				key: "cart",
				icon: <CartIcon />,
				label: (
					<>
						<span>Cart</span>
						<Badge
							count={cartItemsCount}
							className="absolute top-3 -1right-1"></Badge>
					</>
				),
				onClick: () => navigate("/cart"),
			},
			{
				key: "login",
				icon: <UserIcon />,
				label: authenticated ? "Profile" : "Login",
				onClick: () => navigate(authenticated ? "profile" : "/login"),
			},
		],
		[categories, cartItemsCount, authenticated, navigate]
	);

	// const NavItems: NavItems[] = useMemo(
	// 	() => [
	// 		{
	// 			component: (
	// 				<Menu
	// 					items={MenuItems}
	// 					mode="horizontal"
	// 					className="border-0 hover:border-none"
	// 					openKeys={openKeys}
	// 				/>
	// 			),
	// 		},

	// 		// {
	// 		// 	component: (
	// 		// 		<div className="relative w-full">
	// 		// 			<Button
	// 		// 				className="border-0 shadow-none w-full"
	// 		// 				onClick={toggleLocation}>
	// 		// 				<LocationIcon /> Location
	// 		// 			</Button>

	// 		// 			{showLocation ? (
	// 		// 				<div
	// 		// 					className={`absolute right-0 top-10 bg-white z-50 rounded shadow-2xl ${
	// 		// 						showLocation ? "block" : "hidden"
	// 		// 					}`}>
	// 		// 					<Location />
	// 		// 				</div>
	// 		// 			) : null}
	// 		// 		</div>
	// 		// 	),
	// 		// },
	// 	],
	// 	[MenuItems]
	// );

	const List: MenuItem[] = useMemo(() => {
		if (userDetail?.user?.role === "admin") {
			return AdminRoutes.filter((item) => !item.hidden).map((route) => ({
				label: route.name,
				key: route.route,
				icon: <route.icon />,
				onClick: () => navigate(`/admin/${route.route}`),
			}));
		} else {
			return MenuItems;
		}
	}, [userDetail?.user?.role, navigate, MenuItems]);

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

			<Menu
				items={List}
				mode="horizontal"
				className="hidden lg:flex flex-grow justify-end border-0 gap-2"
			/>
		</nav>
	);
};

export default Navbar;
