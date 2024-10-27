import { ROUTES } from "../constants";
import Address from "../pages/Address";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import Orders from "../pages/Orders";

import Profile from "../pages/Profile";
import UpdateProfile from "../pages/Profile/UpdateProfile";

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
		content: UpdateProfile,
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
	{
		name: "Address",
		route: ROUTES.ADDRESS,
		content: Address,
	},
];
export default AuthenticatedRoutes;
