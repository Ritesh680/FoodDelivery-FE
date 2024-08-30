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
		<div
			className={`${
				!withDetails && "items-center justify-center"
			} border rounded-xl lg:h-[363px] lg:min-w-[305px] flex flex-col min-h-[202px] min-w-[250px] relative`}>
			<img
				src={foodImage ?? "foodItem.png"}
				alt={foodName ?? "foodItem"}
				className={`${
					withDetails
						? "h-[236px] w-full "
						: "h-full hover:opacity-70 transition-all duration-200"
				} rounded-t-xl cursor-pointer object-cover`}
			/>

			{withDetails ? (
				<div className="p-2.5 flex flex-col gap-5">
					<span className="font-semibold text-base">
						{foodName ?? "Mutton Mince / Keema(1kg)"}
					</span>
					<div className="flex w-full justify-between items-center">
						<div className="flex gap-5 items-center">
							{isDiscounted ? (
								<>
									<span className="text-base font-semibold">
										{`Rs ${discountedPrice ?? 200}`}
									</span>
									<span className="text-xs text-gray-500 line-through font-thin decoration-red-500">
										{`Rs ${originalPrice ?? 300}`}
									</span>
								</>
							) : (
								<span className="text-base font-semibold">
									{`Rs ${originalPrice ?? 200}`}
								</span>
							)}
						</div>

						<button
							type="button"
							className="bg-red-500 text-white rounded-md px-2.5 py-1"
							onClick={handleButtonClick}>
							Add
						</button>
					</div>

					{isDiscounted && (
						<span className="text-[#29A157] text-xs">
							{discountPercent}% OFF
						</span>
					)}
				</div>
			) : (
				<div
					className={`absolute flex h-full items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 w-full cursor-pointer bg-[#737373] bg-opacity-70 rounded-t-xl`}>
					<span className="text-center text-white font-bold text-5xl text-wrap ">
						{foodName ?? "test"}
					</span>
				</div>
			)}
		</div>
	);
};

export default FoodCard;
