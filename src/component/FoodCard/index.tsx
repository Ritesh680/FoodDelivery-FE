import {
	CheckOutlined,
	LoadingOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Image, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useMemo } from "react";

interface FoodCardWithDetails {
	foodImage: string;
	foodName: string;
	originalPrice: number;
	discountedPrice?: number;
	withDetails: true;
	loading: boolean;
	success: boolean;
	handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleCardClick: () => void;
}
interface FoodCardWithOutDetails {
	foodImage: string;
	foodName: string;
	originalPrice?: number;
	discountedPrice?: number;
	withDetails: false;
	loading?: boolean;
	success?: boolean;
	handleButtonClick?: () => void;
	handleCardClick?: () => void;
}

type FoodCardProps = FoodCardWithDetails | FoodCardWithOutDetails;

const FoodCard = ({
	foodImage,
	foodName,
	originalPrice,
	discountedPrice,
	withDetails,
	handleButtonClick,
	loading,
	success,
	handleCardClick,
}: FoodCardProps) => {
	const discountPercent = useMemo(() => {
		if (!discountedPrice) return 0;
		return calculateDiscount(discountedPrice ?? 0, originalPrice ?? 0);
	}, [originalPrice, discountedPrice]);

	const isDiscounted = useMemo(() => {
		if (!discountedPrice) return false;
		return originalPrice ? discountedPrice < originalPrice : false;
	}, [discountedPrice, originalPrice]);

	function calculateDiscount(originalPrice: number, discountedPrice: number) {
		return Math.round(
			((discountedPrice - originalPrice) / originalPrice) * 100
		);
	}
	return (
		<>
			<Card
				onClick={handleCardClick}
				loading={false}
				cover={
					<Image
						src={foodImage}
						alt={foodName}
						preview={
							withDetails
								? false
								: {
										visible: false,
										mask: (
											<span className="text-sm sm:text-5xl font-bold">
												{foodName}
											</span>
										),
								  }
						}
						fallback="https://via.placeholder.com/150"
						onError={(e) => {
							e.currentTarget.src = "https://via.placeholder.com/150";
						}}
						previewPrefixCls="test"
						className={`object-cover !h-32 lg:min-w-[305px] min-w-[160px] sm:!h-[236px] rounded-md`}
					/>
				}
				className={`${
					withDetails
						? "w-[160px] h-[212px] sm:h-[363px] sm:w-[305px] cursor-pointer"
						: "w-full h-full"
				}`}>
				{withDetails ? (
					<div className="p-2">
						<Meta className="text-[10px] font-semibold" title={foodName}></Meta>
						<div className="flex w-full justify-between items-end mt-1 sm:mt-2">
							<div className="flex gap-2 sm:gap-5 items-center">
								{isDiscounted ? (
									<>
										<span className="text-[8px] sm:text-xs">{`Rs ${discountedPrice}`}</span>
										<span className="text-[8px] sm:text-xs text-gray-500 line-through font-thin decoration-red-500">
											{`Rs ${originalPrice}`}
										</span>
									</>
								) : (
									<span className="text-[10px] sm:text-xs">{`Rs ${originalPrice}`}</span>
								)}
							</div>

							<button
								type="button"
								className="bg-[#c50202] text-white rounded text-[8px] sm:text-xs px-2 py-1 flex gap-2 items-center hover:shadow-md hover:scale-105"
								onClick={handleButtonClick}
								disabled={loading || success}>
								{loading ? (
									<Spin size="small" spinning indicator={<LoadingOutlined />} />
								) : (
									<>
										{success ? (
											<CheckOutlined className="text-[10px] text-xs" />
										) : (
											<>
												<ShoppingCartOutlined className="text-[10px] text-xs" />
												Add
											</>
										)}
									</>
								)}
							</button>
						</div>
						{isDiscounted && (
							<span className="text-[#29A157] text-[8px] sm:text-xs">
								{discountPercent}% OFF
							</span>
						)}
					</div>
				) : (
					""
				)}
			</Card>
		</>
	);
};

export default FoodCard;
