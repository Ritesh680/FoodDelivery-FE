import { ROUTES } from "../constants";
import Cart from "../pages/Cart";
import CategoryList from "../pages/Categories";
import CheckoutPage from "../pages/Checkout";
import Orders from "../pages/Orders";

import Profile from "../pages/Profile";

const AuthenticatedRoutes = [
	{
		name: "Cart",
		route: ROUTES.CART,
		content: Cart,
	},
	{
		name: "Profile",
		route: ROUTES.PROFILE,
		content: Profile,
	},

	{
		name: "Edit Profile",
		route: ROUTES.EDIT_PROFILE,
		content: CategoryList,
	},

	{
		name: "Orders",
		route: ROUTES.ORDERS,
		content: Orders,
	},
	{
		name: "Checkout",
		route: ROUTES.CHECKOUT,
		content: CheckoutPage,
	},
];
export default AuthenticatedRoutes;
