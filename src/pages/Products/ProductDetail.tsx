import { Button, Image, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import useApi from "../../api/useApi";
import ButtonGroup from "antd/es/button/button-group";
import useInnerWidth from "../../hooks/useInnerWidth";
import FoodCard from "../../component/FoodCard";
import { useMemo } from "react";
import useAuth from "../../hooks/useAuth";

const ProductDetail = () => {
	const { authenticated } = useAuth();
	const { id } = useParams();
	const { getProductById, addToCart, getProducts } = useApi();
	const { isMobileDevice } = useInnerWidth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ["Product", id],
		queryFn: () => getProductById(id!),
		enabled: !!id,
	});

	const { data: Products, isLoading: isProductsLoading } = useQuery({
		queryKey: "Products",
		queryFn: getProducts,
	});

	const AddItemToCart = useMutation({
		mutationFn: (data: { productId: string; quantity: number }) =>
			addToCart(data.productId, data.quantity),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Product"] });
			queryClient.invalidateQueries({ queryKey: ["Cart"] });
		},
	});
	const itemsInCart = useMemo(() => {
		return authenticated
			? data?.data?.cart?.find((item) => item?.product === id)?.quantity ?? 0
			: 0;
	}, [data?.data?.cart, id, authenticated]);
	return (
		<>
			{isLoading ? (
				<Spin fullscreen />
			) : (
				<div className="flex flex-col gap-6">
					<div className="flex sm:flex-row flex-col gap-5 sm:gap-20 py-5 sm:items-center px-5 sm:px-20">
						<Image
							className="w-[335px] sm:w-[550px] h-[197px] sm:h-[422px] object cover rounded"
							src={data?.data?.image[0]?.url}
							fallback="https://via.placeholder.com/150"
						/>

						<div className="flex flex-col sm:flex-grow gap-[5px] sm:gap-5 px-2">
							<h1 className="text-sm sm:text-2xl sm:font-bold">
								{data?.data?.name}
							</h1>
							<p className="text-[7px] leading-3 sm:text-base font-normal">
								{data?.data.description}
							</p>

							<div className="flex sm:flex-col justify-between items-start">
								<div className="flex sm:gap-3 flex-col">
									<div className="flex gap-1 items-center">
										<span className="text-xxs sm:text-2xl sm:font-bold">
											Rs 999
										</span>
										<span className="text-[8px] sm:text-base font-normal line-through decoration-red-500">
											Rs 999
										</span>
									</div>

									<span className="text-[7px] sm:text-sm text-[#29A157] font-inter">
										7% OFF
									</span>
								</div>

								{authenticated && (
									<div className="flex items-center gap-5">
										<span className="hidden sm:block text-lg font-semibold font-inter">
											Quantity
										</span>
										<ButtonGroup>
											<Button
												type="default"
												size="small"
												className="bg-gray-300"
												onClick={() =>
													AddItemToCart.mutate({
														productId: id ?? "",
														quantity: itemsInCart - 1,
													})
												}
												disabled={itemsInCart === 0}>
												-
											</Button>
											<Button
												type="default"
												size="small"
												loading={AddItemToCart.isLoading}>
												{itemsInCart}
											</Button>
											<Button
												type="default"
												size="small"
												className="bg-gray-300"
												onClick={() =>
													AddItemToCart.mutate({
														productId: id ?? "",
														quantity: itemsInCart + 1,
													})
												}>
												+
											</Button>
										</ButtonGroup>
									</div>
								)}
							</div>

							<div className="flex sm:w-full sm:justify-between gap-4 sm:gap-[43px] mt-2 sm:mt-0">
								<Button
									type="default"
									size={isMobileDevice ? "small" : "large"}
									className="bg-yellow-500 sm:w-full sm:text-lg sm:font-bold text-white">
									Buy Now
								</Button>
								<Button
									type="primary"
									size={isMobileDevice ? "small" : "large"}
									onClick={() => navigate("/cart")}
									className="sm:w-full py-2.5 sm:text-lg sm:font-bold text-white">
									Add to Cart
								</Button>
							</div>
						</div>
					</div>

					{!isProductsLoading &&
						Products?.data &&
						Products.data?.length > 1 && (
							<div className="flex flex-col gap-6">
								<span className="text-xs font-bold px-5">
									You might also like
								</span>
								<div className="flex ps-4 gap-4 overflow-x-scroll w-full">
									{Products?.data
										?.filter((data) => data._id !== id)
										.map((item, index) => (
											<FoodCard
												key={index}
												withDetails
												originalPrice={item.price ?? 0}
												discountedPrice={item.price ?? 0}
												foodName={item.name}
												foodImage={item.image[0]?.url}
												loading={
													AddItemToCart.isLoading &&
													AddItemToCart.variables?.productId === item._id
												}
												success={
													AddItemToCart.isSuccess &&
													item._id === AddItemToCart.variables?.productId
												}
												handleCardClick={() => navigate("/product/" + item._id)}
												handleButtonClick={(
													e: React.MouseEvent<HTMLButtonElement>
												) => {
													e.preventDefault();
													e.stopPropagation();
													AddItemToCart.mutate({
														productId: item._id,
														quantity: 1,
													});
												}}
											/>
										))}
								</div>
							</div>
						)}
				</div>
			)}
		</>
	);
};

export default ProductDetail;
