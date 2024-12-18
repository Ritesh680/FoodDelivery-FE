/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
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
	meta?: MetaObject;
	page?: number;
	setPage?: (page: number) => void;
}

const StaticTable = <T extends { _id: string | number; [key: string]: any }>({
	tableHeaders,
	tableData,
	title,
	actions,
	isLoading,
	isFetching,
	meta,
	page,
	setPage,
}: IStaticTableProps<T>) => {
	const { isMobileDevice } = useInnerWidth();
	const columns = useMemo(() => {
		const copy = [...tableHeaders];
		copy.unshift({
			title: "S.N.",
			rowScope: "row",
			render: (_item, _row, index) => {
				return <>{((page ?? 1) - 1) * 12 + (index + 1)}</>;
			},
		});
		return copy;
	}, [tableHeaders, page]);
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
				columns={columns}
				dataSource={tableData}
				showSorterTooltip={{ target: "sorter-icon" }}
				className="p-5 table-auto mb-10"
				rowKey={(record) => record._id.toString()}
				tableLayout="auto"
				pagination={{
					pageSize: 12,
					total: meta?.total,
					current: page,
					onChange: (page) => setPage?.(page),
					showSizeChanger: false,
				}}
			/>
		</div>
	);
};

export default StaticTable;
