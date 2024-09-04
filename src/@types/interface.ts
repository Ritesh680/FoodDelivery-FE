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
	discountedPrice: number | null;
	quantity: number;
}

export interface ICreateCategory {
	name: string;
	image: string;
}

export interface IGetProduct {
	success: boolean;
	data: IProduct;
}

export interface IGetProducts {
	success: boolean;
	data: IProduct[];
}

export interface IProduct extends ICreateProduct {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface ICategory extends ICreateCategory {
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
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
	product: string;
	quantity: number;
	_id: string;
}
