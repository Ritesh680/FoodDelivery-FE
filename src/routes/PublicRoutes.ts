import { ROUTES } from "../constants";
import CategoryList from "../pages/Categories";

import HomePage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Login/Register";
import ProductDetail from "../pages/Products/ProductDetail";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Menu from "../pages/Menu";
import CategoryItems from "../pages/Categories/CategoryItems";

const PublicRoutes = [
	{
		name: "Home",
		route: ROUTES.HOME,
		content: HomePage,
	},
	{ name: "Menu", route: ROUTES.MENU, content: Menu },
	{
		name: "Product Detail",
		route: ROUTES.VIEW_PRODUCTS,
		content: ProductDetail,
	},

	{
		name: "Categories",
		route: ROUTES.CATEGORIES,
		content: CategoryList,
	},
	{
		name: "View Categories",
		route: ROUTES.VIEW_CATEGORIES,
		content: CategoryItems,
	},
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
	{
		name: "Terms and Condition",
		route: ROUTES.TERMS_AND_CONDITION,
		content: PrivacyPolicy,
	},
];
export default PublicRoutes;