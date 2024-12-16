import React, { useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Card, Image, Spin, message } from "antd";
import { useDispatch } from "react-redux";

import {
	CheckOutlined,
	LoadingOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

import useApi from "../../api/useApi";
import { updateCart } from "../../slice/cartSlice";
import QueryKeys from "../../constants/QueryKeys";

interface FoodCardWithDetails {
	id: string;
	foodImage: string;
	foodName: string;
	originalPrice: number;
	discountedPrice?: number;
	withDetails: true;
	details: string;
}
interface FoodCardWithOutDetails {
	id: string;
	foodImage: string;
	foodName: string;
	originalPrice?: number;
	discountedPrice?: number;
	withDetails: false;
	details: string;
}

type FoodCardProps = FoodCardWithDetails | FoodCardWithOutDetails;

const FoodCard = ({
	id,
	foodImage,
	foodName,
	originalPrice,
	discountedPrice,
	withDetails,
	details,
}: FoodCardProps) => {
	const { addToCart } = useApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const discountPercent = useMemo(() => {
		if (!discountedPrice) return 0;
		return calculateDiscount(originalPrice ?? 0, discountedPrice ?? 0);
	}, [originalPrice, discountedPrice]);

	const isDiscounted = useMemo(() => {
		if (!discountedPrice) return false;
		return originalPrice ? discountedPrice < originalPrice : false;
	}, [discountedPrice, originalPrice]);

	function calculateDiscount(originalPrice: number, discountedPrice: number) {
		return Math.round(
			((originalPrice - discountedPrice) / originalPrice) * 100
		);
	}

	const AddItemToCart = useMutation({
		mutationFn: (productId: string) => addToCart(productId),
		onSuccess: (res) => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });
			message.success("Item added to cart");
			dispatch(
				updateCart({
					productId: res.data[0].product._id,
					quantity: res.data[0].product.quantity,
					price: res.data[0].product.price,
					discountedPrice: res.data[0]?.product.discountedPrice ?? 0,
					name: res.data[0].product.name,
					image: res.data[0].product.image,
				})
			);
		},
	});

	const loading = useMemo(() => {
		return AddItemToCart.isLoading && AddItemToCart.variables === id;
	}, [AddItemToCart.isLoading, AddItemToCart.variables, id]);

	const success = useMemo(
		() => AddItemToCart.isSuccess && id === AddItemToCart.variables,
		[AddItemToCart.isSuccess, AddItemToCart.variables, id]
	);

	return (
		<>
			<Card
				onClick={() =>
					navigate(withDetails ? `/products/${id}` : `/menu/${id}`)
				}
				loading={false}
				cover={
					<Image
						src={foodImage}
						alt={foodName}
						loading="eager"
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
						? "w-[160px] min-h-[212px] sm:h-[363px] sm:w-[305px] cursor-pointer"
						: "w-full h-full"
				} hover:shadow-lg`}>
				{withDetails ? (
					<div className="p-2">
						<Meta className="text-[10px] font-semibold" title={foodName}></Meta>
						<p className="text-[10px] truncate flex">{details}</p>
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
								onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.preventDefault();
									e.stopPropagation();
									AddItemToCart.mutate(id);
								}}
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
