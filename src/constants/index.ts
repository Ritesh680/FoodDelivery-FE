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
	{ name: "Account", icon: UserIcon, href: "/login" },
];

export const ROUTES = {
	ADMIN: "admin",
	PRODUCTS: "products",
	EDIT_PRODUCT: "products/edit/:id",
	CREATE_PRODUCT: "products/create",
	CATEGORIES: "categories",
	EDIT_CATEGORY: "categories/edit/:id",
	CREATE_CATEGORY: "categories/create",
	ORDERS: "orders",
	SETTINGS: "settings",
	USERS: "users",
};
export const NAVBAR_HIDDEN_PAGES = ["/login", "/register", "/menu", "/cart"];
