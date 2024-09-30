export interface IUserResponse {
	success: true;
	status: string;
	token: string;
	user: IUser;
	"token-expire": string;
}

interface IUser {
	name: string;
	email: string;
	phone: string;
	role: string;
	_id: string;
	picture: string;
}

export interface ICreateProduct {
	name: string;
	price: number | null;
	description: string;
	category: string;
	image: string[];
	subCategory: string;
	images?: ImageGetResponse[];
	discountedPrice: number | null;
	quantity: number;
}

export interface SubCategories {
	name: string;
	image: string;
	images?: ImageGetResponse;
}

export interface ICreateCategory {
	name: string;
	image: string;
	images?: ImageGetResponse;
	subCategories?: SubCategories[];
}

export interface IGetProduct {
	success: boolean;
	data: IProduct;
}

export interface IGetProducts {
	success: boolean;
	data: IProduct[];
}

export interface ImageGetResponse {
	_id: string;
	name: string;
	url: string;
	size: number;
	type: string;
	fileId: string;
	createdAt: string;
	updatedAt: string;
}

export interface IProduct extends Omit<ICreateProduct, "image"> {
	_id: string;
	createdAt: string;
	updatedAt: string;
	image?: ImageGetResponse[];
	cart: { product: string; quantity: number }[];
	__v: number;
}
export interface ICategory
	extends Omit<ICreateCategory, "image" | "subCategories"> {
	_id: string;
	createdAt: string;
	updatedAt: string;
	image?: ImageGetResponse;
	__v: number;
	products: IProduct[];
	subcategories: SubCategoriesResponse[];
}

interface SubCategoriesResponse {
	_id: string;
	name: string;
	image: ImageGetResponse;
}

export interface CartProduct {
	product: IProduct;
	quantity: number;
	_id: string;
}
export interface ICartResponse {
	products: CartProduct[];
}

export interface AddToCartResponse {
	product: {
		_id: string;
		name: string;
		price: number;
		discountedPrice: number;
		quantity: number;
	};
	_id: string;
}

export interface IUserResponse {
	name: string;
	email: string;
	phone: string;
	role: string;
	_id: string;
}

export interface IOrderData {
	_id: string;
	user: IUserResponse;
	products: { product: IProduct; quantity: number }[];
	status: string;
	paymentMethod: string;
	paymentStatus: string;
	contact: string;
	orderQuantity: number;
}
export interface MyOrders {
	cancelledProducts: (IProduct & { orderQuantity: number })[];
	deliveredProducts: (IProduct & { orderQuantity: number })[];
	pendingProducts: (IProduct & { orderQuantity: number })[];
}
