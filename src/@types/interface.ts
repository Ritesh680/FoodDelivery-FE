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

	images?: ImageGetResponse[];
	discountedPrice: number | null;
	quantity: number;
}

export interface ICreateCategory {
	name: string;
	image: string;
	images?: ImageGetResponse;
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
export interface ICategory extends Omit<ICreateCategory, "image"> {
	_id: string;
	createdAt: string;
	updatedAt: string;
	image?: ImageGetResponse[];
	__v: number;
	products: IProduct[];
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
	};
	quantity: number;
	_id: string;
}

export interface IUserResponse {
	name: string;
	email: string;
	phone: string;
	role: string;
	_id: string;
}
