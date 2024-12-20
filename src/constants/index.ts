import { HomeOutlined } from "@ant-design/icons";
import { CartIcon, MenuIcon, OffersIcon, UserIcon } from "../assets/icons";

export const MobileNavItems = [
	{ name: "Home", icon: HomeOutlined, href: "/" },
	{ name: "Menu", icon: MenuIcon, href: "/menu" },
	{ name: "Offers", icon: OffersIcon, href: "/offers" },
	{ name: "Cart", icon: CartIcon, href: "/cart" },
	{ name: "Account", icon: UserIcon, href: "/login" },
];

export const ROUTES = {
	HOME: "/",
	ADMIN: "admin",
	PRODUCTS: "products",
	MENU: "menu",
	MENU_SINGLE: "menu/:id",
	EDIT_PRODUCT: "products/edit/:id",
	CREATE_PRODUCT: "products/create",
	VIEW_PRODUCTS: "products/:id",
	CATEGORIES: "categories",
	EDIT_CATEGORY: "categories/edit/:id",
	CREATE_CATEGORY: "categories/create",
	VIEW_CATEGORIES: "category/:id",
	OFFERS: "offers",
	ORDERS: "orders",
	SETTINGS: "profile",
	USERS: "users",
	LOGIN: "login",
	REGISTER: "register",
	VERIFY: "verify",
	CART: "cart",
	PROFILE: "profile",
	EDIT_PROFILE: "profile/update",
	CHECKOUT: "checkout",
	TERMS_AND_CONDITION: "terms-and-conditions",
	LANDING_PAGE: "landing-page",
	BEST_SELLER: "best-seller",
	FORGOT_PASSWORD: "forgot-password",
	RESET_PASSWORD: "reset-password/:token",
	ADDRESS: "billing-address",
};
export const NAVBAR_HIDDEN_PAGES = [
	"/login",
	"/register",
	"/menu",
	"/cart",
	"/checkout",
];

export const REGEX_PHONE_NUMBER =
	/^(?:(?:\+)?\d{1,3}(?:\s|-|\.)?)?\(?\d{3}\)?(?:\s|-|\.)?\d{3}(?:\s|-|\.)?\d{3,4}$/;

export const REGEX_EMAIL =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const STATIC_DATA = {
	PHONE_NUMBER: "+977-9844378959",
	ADDRESS: "New Baneshwor, Kathmandu, Nepal",
	EMAIL: "pokharelroshan13@gmail.com",
	FACEBOOK: "https://www.facebook.com/chickendeliveryktm?mibextid=LQQJ4d",
	WHATSAPP: "https://wa.me/9779844378959",
	INSTAGRAM: "https://www.instagram.com",
	OPENING_HOURS: "8am - 9pm",
};
