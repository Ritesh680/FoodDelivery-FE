/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
import useInnerWidth from "../../hooks/useInnerWidth";

interface IStaticTableProps<
	T extends {
		_id: string | number | React.ReactElement;
		[key: string | number]: any;
	}
> {
	tableHeaders: TableColumnsType<T>;
	tableData?: T[];
	title?: string;
	actions?: React.ReactNode;
	isLoading?: boolean;
	isFetching?: boolean;
}

const StaticTable = <T extends { _id: string | number; [key: string]: any }>({
	tableHeaders,
	tableData,
	title,
	actions,
	isLoading,
	isFetching,
}: IStaticTableProps<T>) => {
	const { isMobileDevice } = useInnerWidth();
	return (
		<div className="flex flex-col w-screen">
			{(title || actions) && (
				<div className="bg-blue-400 px-4 py-3 flex justify-between items-center w-screen">
					<h2 className="font-bold text-white text-lg">{title || ""}</h2>
					<div className="flex gap-x-4 items-center">
						{isFetching && !isLoading && <Spin fullscreen={false} />}
						{actions ?? ""}
					</div>
				</div>
			)}

			<Table
				bordered
				scroll={{ x: isMobileDevice ? 1000 : 0 }}
				columns={tableHeaders}
				dataSource={tableData}
				showSorterTooltip={{ target: "sorter-icon" }}
				className="p-5 table-auto mb-10"
				rowKey={(record) => record._id.toString()}
				tableLayout="auto"
			/>
		</div>
	);
};

export default StaticTable;
