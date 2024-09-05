import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { useMemo } from "react";

interface FoodCardWithDetails {
	foodImage: string;
	foodName: string;
	originalPrice: number;
	discountedPrice: number;
	withDetails: true;
	handleButtonClick: () => void;
}
interface FoodCardWithOutDetails {
	foodImage: string;
	foodName: string;
	originalPrice?: number;
	discountedPrice?: number;
	withDetails: false;
	handleButtonClick?: () => void;
}

type FoodCardProps = FoodCardWithDetails | FoodCardWithOutDetails;

const FoodCard = ({
	foodImage,
	foodName,
	originalPrice = 300,
	discountedPrice = 200,
	withDetails,
	handleButtonClick,
}: FoodCardProps) => {
	const discountPercent = useMemo(() => {
		if (discountedPrice > originalPrice) return 0;
		return calculateDiscount(originalPrice, discountedPrice);
	}, [originalPrice, discountedPrice]);

	const isDiscounted = useMemo(() => {
		return discountedPrice < originalPrice;
	}, [discountedPrice, originalPrice]);

	function calculateDiscount(originalPrice: number, discountedPrice: number) {
		return Math.round(
			((originalPrice - discountedPrice) / originalPrice) * 100
		);
	}
	return (
		<>
			<Card
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
						className={`object-cover !h-32 lg:min-w-[305px] min-w-[150px] sm:!h-[236px] rounded-md`}
					/>
				}
				className={`${
					withDetails
						? "w-[150px] h-[202px] sm:h-[363px] sm:w-[305px]"
						: "w-full h-full"
				} `}>
				{withDetails ? (
					<div className="p-2">
						<Meta className="text-[10px] font-semibold" title={foodName}></Meta>
						<div className="flex w-full justify-between items-end sm:mt-2">
							<div className="flex gap-5 items-center">
								{isDiscounted ? (
									<>
										<span className="text-[10px] sm:text-xs">{`Rs ${discountedPrice}`}</span>
										<span className="text-[10px] sm:text-xs text-gray-500 line-through font-thin decoration-red-500">
											{`Rs ${originalPrice}`}
										</span>
									</>
								) : (
									<span className="text-[10px] sm:text-xs">{`Rs ${originalPrice}`}</span>
								)}
							</div>

							<button
								type="button"
								className="bg-[#c50202] text-white rounded text-[8px] sm:text-xs px-2 py-1 flex gap-2 items-center"
								onClick={handleButtonClick}>
								<ShoppingCartOutlined className="text-[10px] text-xs" />
								Add
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
