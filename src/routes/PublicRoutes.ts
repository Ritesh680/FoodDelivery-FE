import { ROUTES } from "../constants";

import HomePage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Login/Register";
import ProductDetail from "../pages/Products/ProductDetail";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Menu from "../pages/Menu";
import Offers from "../pages/Offers";
import VerifyOtp from "../pages/Login/VerifyOtp";
import CategoryItems from "../pages/Categories/CategoryItems";

const PublicRoutes = [
	{
		name: "Home",
		route: ROUTES.HOME,
		content: HomePage,
	},
	{ name: "Menu", route: ROUTES.MENU, content: Menu },
	{ name: "Menu Details", route: ROUTES.MENU_SINGLE, content: CategoryItems },
	{
		name: "Product Detail",
		route: ROUTES.VIEW_PRODUCTS,
		content: ProductDetail,
	},
	{ name: "Offers", route: ROUTES.OFFERS, content: Offers },

	{
		name: "Login",
		route: ROUTES.LOGIN,
		content: Login,
	},
	{
		name: "Register",
		route: ROUTES.REGISTER,
		content: Register,
	},
	{ name: "Verify OTP", route: ROUTES.VERIFY, content: VerifyOtp },
	{
		name: "Terms and Condition",
		route: ROUTES.TERMS_AND_CONDITION,
		content: PrivacyPolicy,
	},
];
export default PublicRoutes;
