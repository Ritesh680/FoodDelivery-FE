import { QueryFunctionContext } from "react-query";
import {
	AddToCartResponse,
	ICartResponse,
	ICategory,
	ICreateCategory,
	ICreateProduct,
	IProduct,
} from "../@types/interface";
import useAxiosRequest from "../hooks/useAxiosRequest";

interface RegisterData {
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
export default function useApi() {
	const { axiosRequest } = useAxiosRequest();

	const register = async (data: RegisterData) => {
		return axiosRequest("POST", "/user", data);
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
	) => Promise<ApiResponse<IProduct[]>> = async () => {
		return axiosRequest<ApiResponse<IProduct[]>>("GET", "/product");
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

	const deleteProductImage = async (id: string, fileId: string) => {
		return axiosRequest("DELETE", `/product/${id}/file/${fileId}`);
	};

	//CATEGORIES

	const getCategories: (
		context: QueryFunctionContext
	) => Promise<ApiResponse<ICategory[]>> = async () => {
		return axiosRequest<ApiResponse<ICategory[]>>("GET", "/category");
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

	const addToCart = async (productId: string, quantity: number) => {
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

	return {
		register,
		login,
		logout,
		createProduct,
		getProducts,
		getProductById,
		editProduct,
		deleteProductImage,
		getCategories,
		getCategoryById,
		createCategory,
		editCategory,
		deleteCategoryImage,
		deleteCategory,
		deleteImage,
		addToCart,
		getCart,
		deleteCart,
	};
}
