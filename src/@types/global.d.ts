import { AxiosError } from 'axios';

export {};
declare global {
	interface ApiResponse<T> {
		success: boolean;
		data: T;
		metaData: MetaObject;
	}
	interface MetaObject {
		total: number;
		currentPage: number;
		pageSize: number;
		nextPage: number;
		lastPage: number;
	}
	type ErrorObject = {
		message: string;
	};
	type ApiError = AxiosError<ErrorObject>;
}
