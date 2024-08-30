import {
	CartIcon,
	LocationIcon,
	MenuIcon,
	OffersIcon,
	UserIcon,
} from "../assets/icons";

export const NavItems = [
	{ name: "Menu", icon: MenuIcon, href: "/menu" },
	{ name: "Offers", icon: OffersIcon, href: "/offers" },
	{ name: "Location", icon: LocationIcon, href: "/location" },
	{ name: "Login", icon: UserIcon, href: "/login" },
	{ name: "Cart", icon: CartIcon, href: "/cart" },
];

export const MobileNavItems = [
	{ name: "Home", icon: LocationIcon, href: "/" },
	{ name: "Menu", icon: MenuIcon, href: "/menu" },
	{ name: "Offers", icon: OffersIcon, href: "/offers" },
	{ name: "Cart", icon: CartIcon, href: "/cart" },
	{ name: "Account", icon: UserIcon, href: "/profile" },
];
