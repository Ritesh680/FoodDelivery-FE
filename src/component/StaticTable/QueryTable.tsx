/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableColumnsType } from "antd";
import React from "react";
import StaticTable from ".";
import { QueryFunctionContext, useQuery } from "react-query";

interface IQueryTableProps<
	TData extends { data: T[] },
	T extends {
		_id: string | number | React.ReactElement;
		[key: string | number]: any;
	}
> {
	tableHeaders: TableColumnsType<T>;
	queryKey: string;
	queryFunction: (context: QueryFunctionContext) => Promise<TData>;
	title?: string;
	actions?: React.ReactNode;
}
const QueryTable = <
	TData extends { data: T[]; metaData: MetaObject },
	T extends {
		_id: string | number;
		[key: string | number]: any;
	}
>({
	queryKey,
	queryFunction,
	tableHeaders,
	title,
	actions,
}: IQueryTableProps<TData, T>) => {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: [queryKey],
		queryFn: queryFunction,
	});
	const tableData = data && data?.data;

	// const metaInformation = data && data?.metaData;
	return (
		<StaticTable
			title={title}
			actions={actions}
			tableData={tableData}
			tableHeaders={tableHeaders}
			isLoading={isLoading}
			isFetching={isFetching}
		/>
	);
};

export default QueryTable;
