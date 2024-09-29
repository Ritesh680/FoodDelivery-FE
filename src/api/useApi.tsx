import { QueryFunctionContext } from "react-query";
import {
	AddToCartResponse,
	ICartResponse,
	ICategory,
	ICreateCategory,
	ICreateProduct,
	IOrderData,
	IProduct,
	IUserResponse,
	MyOrders,
} from "../@types/interface";
import useAxiosRequest from "../hooks/useAxiosRequest";

export interface RegisterData {
	name: string;
	email: string;
	password: string;
	phone: string;
	role?: string;
}

interface LoginData {
	email: string;
	password: string;
}

interface IUser {
	name: string;
	email: string;
	phone: string;
	role: string;
	_id: string;
}

interface ILoginResponse {
	token: string;
	status: string;
	user: IUser;
	"token-expire": string;
}

interface ILoginResponse {
	latitude: number;
	longitude: number;
	country: string;
	state: string;
	zipcode: string;
	countryCode: string;
	county: string;
	streetName?: string;
	city?: string;
	extra: {
		confidence: number;
		confidenceKM: number;
	};
	provider: "opencage";
}
interface ICreateOrder {
	products: Array<{ product: string; quantity: number }>;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	city: string;
	street: string;
	payment: string;
}
export default function useApi() {
	const { axiosRequest } = useAxiosRequest();

	const register = async (data: RegisterData) => {
		return axiosRequest<ApiResponse<any>>("POST", "/user", data);
	};

	const verifyOtp = async (data: { otp: number }) => {
		return axiosRequest("post", "/auth/verify", data);
	};

	const updateProfile = async (id: string, data: RegisterData) => {
		return axiosRequest("PUT", `/user/${id}`, data);
	};
	const login = async (data: LoginData) => {
		return axiosRequest<ILoginResponse>("POST", "/auth/local/login", data);
	};

	const logout = async () => {
		return axiosRequest("POST", "/auth/logout");
	};

	//PRODUCTS

	const getProducts: (
		context: QueryFunctionContext
	) => Promise<ApiResponse<IProduct[]>> = async ({ queryKey }) => {
		const [_key, params = ""] = queryKey;

		return axiosRequest<ApiResponse<IProduct[]>>(
			"GET",
			`/product/?search=${params}`
		);
	};
	const getOffersProducts: (
		context: QueryFunctionContext
	) => Promise<ApiResponse<IProduct[]>> = async () => {
		return axiosRequest<ApiResponse<IProduct[]>>("GET", "/product/offers");
	};
	const getProductById = async (id: string) => {
		return axiosRequest<ApiResponse<IProduct>>("GET", `/product/${id}`);
	};
	const createProduct = async (data: ICreateProduct) => {
		return axiosRequest("POST", "/product", data);
	};
	const editProduct = async (id: string, data: ICreateProduct) => {
		return axiosRequest("PUT", `/product/${id}`, data);
	};

	const deleteProduct = async (id: string) => {
		return axiosRequest("DELETE", `/product/${id}`);
	};

	const deleteProductImage = async (id: string, fileId: string) => {
		return axiosRequest("DELETE", `/product/${id}/file/${fileId}`);
	};

	//CATEGORIES

	const getCategories: (
		context: QueryFunctionContext
	) => Promise<ApiResponse<ICategory[]>> = async () => {
		return axiosRequest<ApiResponse<ICategory[]>>("GET", "/category");
	};

	const getSubCategoriesByCategoryId = async (id: string) => {
		return axiosRequest<ApiResponse<ICategory[]>>(
			"GET",
			`/category/${id}/subcategories`
		);
	};

	const getCategoryById = async (id: string) => {
		return axiosRequest<ApiResponse<ICategory>>("GET", `/category/${id}`);
	};

	const createCategory = async (data: ICreateCategory) => {
		return axiosRequest("POST", "/category", data);
	};

	const editCategory = async (id: string, data: ICreateCategory) => {
		return axiosRequest("PUT", `/category/${id}`, data);
	};

	const deleteCategoryImage = async (id: string, fileId: string) => {
		return axiosRequest("DELETE", `/category/${id}/file/${fileId}`);
	};

	const deleteCategory = async (id: string) => {
		return axiosRequest("DELETE", `/category/${id}`);
	};

	const deleteImage = async (fileId: string) => {
		return axiosRequest("DELETE", `/file/${fileId}`);
	};

	//cart

	const addToCart = async (productId: string, quantity = 1) => {
		return axiosRequest<ApiResponse<AddToCartResponse>>("POST", "/cart/add", {
			productId,
			quantity,
		});
	};

	const getCart = async () => {
		return axiosRequest<ApiResponse<ICartResponse>>("GET", "/cart");
	};

	const deleteCart = async (productId: string) => {
		return axiosRequest<ApiResponse<ICartResponse>>(
			"DELETE",
			`/cart/${productId}/remove`
		);
	};

	//USERS

	const getAllUsers: (
		context: QueryFunctionContext
	) => Promise<ApiResponse<IUserResponse[]>> = async ({ queryKey }) => {
		const [_, search = ""] = queryKey;
		return await axiosRequest("GET", "/user?search=" + search);
	};

	// location

	const getLocation: (
		context: QueryFunctionContext
	) => Promise<ILoginResponse[]> = async ({ queryKey }) => {
		const [_key, search = "", latitude, longitude] = queryKey;
		return axiosRequest(
			"GET",
			`/location?location=${search}&latitude=${latitude}&longitude=${longitude}`
		);
	};

	//order
	const confirmOrder = async (data: ICreateOrder) => {
		return axiosRequest<ApiResponse<IOrderData>>("POST", "/order/create", data);
	};
	const getOrders: (
		context: QueryFunctionContext
	) => Promise<ApiResponse<IOrderData[]>> = async () => {
		return axiosRequest<ApiResponse<IOrderData[]>>("GET", "/order/all");
	};

	const getMyOrders: (
		context: QueryFunctionContext
	) => Promise<ApiResponse<MyOrders>> = async () => {
		return axiosRequest<ApiResponse<MyOrders>>("GET", "/order/my");
	};

	const updateOrderPaymentStatus = async (id: string, status: string) => {
		return axiosRequest("PUT", `/order/update/${id}/payment`, { status });
	};

	const updateOrderStatus = async (id: string, status: string) => {
		return axiosRequest("PUT", `/order/update/${id}/status`, { status });
	};

	return {
		register,
		verifyOtp,
		updateProfile,
		login,
		logout,
		createProduct,
		getProducts,
		getOffersProducts,
		getProductById,
		editProduct,
		deleteProduct,
		deleteProductImage,
		getCategories,
		getCategoryById,
		getSubCategoriesByCategoryId,
		createCategory,
		editCategory,
		deleteCategoryImage,
		deleteCategory,
		deleteImage,
		addToCart,
		getCart,
		deleteCart,
		getAllUsers,
		getLocation,
		confirmOrder,
		getOrders,
		getMyOrders,
		updateOrderPaymentStatus,
		updateOrderStatus,
	};
}
