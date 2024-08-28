import SearchBar from "../../Searchbar";
import {
	CartIcon,
	LocationIcon,
	MenuIcon,
	OffersIcon,
	UserIcon,
} from "../../../assets/icons";

const Navbar = () => {
	const NavItems = [
		{ name: "Menu", icon: MenuIcon, href: "#menu" },
		{ name: "Offers", icon: OffersIcon, href: "#offers" },
		{ name: "Location", icon: LocationIcon, href: "#location" },
		{ name: "Login", icon: UserIcon, href: "/login" },
		{ name: "Cart", icon: CartIcon, href: "/cart" },
	];
	return (
		<div className="flex items-center justify-between px-10 shadow-lg">
			<div className="flex w-1/2 items-center gap-20">
				<img src="logo.jpeg" alt="Logo" className="h-20" />
				<SearchBar
					placeholder="Search for product "
					handleSearch={() => {
						//
					}}
				/>
			</div>

			<nav className="flex gap-10">
				{NavItems.map((item) => (
					<div className="flex gap-4 items-center">
						{item.icon && <item.icon />}
						<a href="/" className="text-lg text-gray-600">
							{item.name}
						</a>
					</div>
				))}
			</nav>
		</div>
	);
};

export default Navbar;
