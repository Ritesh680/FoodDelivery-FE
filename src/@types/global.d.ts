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
}
