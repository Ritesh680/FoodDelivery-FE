import {
	OrderedListOutlined,
	SettingTwoTone,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import { MenuIcon, OffersIcon } from "../assets/icons";

import ProductPage from "../pages/Products";
import Orders from "../pages/Orders";
import CreateOrEditProduct from "../pages/Products/CreateOrEdit";
import { ROUTES } from "../constants";
import CategoryList from "../pages/Categories";
import CreateOrEditCategory from "../pages/Categories/CreateOrEditCategory";
import Profile from "../pages/Profile";
import Users from "../pages/Users";

const AdminRoutes = [
	{
		name: "Products",
		route: ROUTES.PRODUCTS,
		content: ProductPage,
		icon: OffersIcon,
	},
	{
		name: "Create Product",
		route: ROUTES.CREATE_PRODUCT,
		content: CreateOrEditProduct,
		icon: OffersIcon,
		hidden: true,
	},
	{
		name: "Edit Product",
		route: ROUTES.EDIT_PRODUCT,
		content: CreateOrEditProduct,
		icon: OffersIcon,
		hidden: true,
	},
	{
		name: "Categories",
		route: ROUTES.CATEGORIES,
		content: CategoryList,
		icon: MenuIcon,
	},
	{
		name: "Create Category",
		route: ROUTES.CREATE_CATEGORY,
		content: CreateOrEditCategory,
		icon: MenuIcon,
		hidden: true,
	},
	{
		name: "Edit Category",
		route: ROUTES.EDIT_CATEGORY,
		content: CreateOrEditCategory,
		icon: MenuIcon,
		hidden: true,
	},
	{
		name: "Orders",
		route: ROUTES.ORDERS,
		content: Orders,
		icon: OrderedListOutlined,
	},
	{
		name: "Users",
		route: ROUTES.USERS,
		content: Users,
		icon: UsergroupAddOutlined,
	},
	{
		name: "Settings",
		route: ROUTES.SETTINGS,
		content: Profile,
		icon: SettingTwoTone,
	},
];
export default AdminRoutes;
