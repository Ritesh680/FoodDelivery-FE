import { Button, Image, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import useApi from "../../api/useApi";
import ButtonGroup from "antd/es/button/button-group";
import useInnerWidth from "../../hooks/useInnerWidth";
import FoodCard from "../../component/FoodCard";
import { useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import QueryKeys from "../../constants/QueryKeys";
import { useDispatch, useSelector } from "react-redux";
import { updateCart as UPDATE_CART } from "../../slice/cartSlice";
import { RootState } from "../../store";
import { replaceSrc } from "../../utils/function";

const ProductDetail = () => {
	const [count, setCount] = useState(1);

	const navigate = useNavigate();
	const { id } = useParams();
	const queryClient = useQueryClient();

	const { authenticated } = useAuth();
	const { isMobileDevice } = useInnerWidth();
	const { getProductById, addToCart, getProducts } = useApi();
	const [showDescription, setShowDescription] = useState(false);

	const dispatch = useDispatch();
	const cartItems = useSelector((state: RootState) => state.cart.cart);

	function toggleDescription() {
		setShowDescription(!showDescription);
	}

	function addCount() {
		setCount(count + 1);
	}
	function reductCount() {
		setCount(count - 1);
	}

	const { data, isLoading } = useQuery({
		queryKey: [QueryKeys.SingleProduct, id],
		queryFn: () => getProductById(id!),
		enabled: !!id,
	});

	const ItemsInStock: number = useMemo(() => {
		if (isLoading || !data) return 0;
		const quantityInCart = cartItems.find(
			(item) => item.productId == data.data._id
		)?.quantity;
		if (!quantityInCart) return data.data.quantity;

		return data.data.quantity - quantityInCart;
	}, [cartItems, data, isLoading]);

	const { data: Products, isLoading: isProductsLoading } = useQuery({
		queryKey: [QueryKeys.Products, "", 1, 7],
		queryFn: getProducts,
	});

	const itemsInCart = useMemo(() => {
		return authenticated
			? data?.data?.cart?.find((item) => item?.product === id)?.quantity ?? 0
			: 0;
	}, [data?.data?.cart, id, authenticated]);

	const AddItemToCart = useMutation({
		mutationFn: () => addToCart(data?.data._id ?? "", itemsInCart + count),
		onSuccess: (res) => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });
			setCount(0);
			dispatch(
				UPDATE_CART({
					productId: res.data[0].product._id,
					quantity: res.data[0].product.quantity,
					price: res.data[0].product.price,
					discountedPrice: res.data[0].product.discountedPrice,
					name: res.data[0].product.name,
				})
			);
		},
	});

	function handleBuyNow() {
		navigate("/checkout" + `?buyNow=true&productId=${id}&quantity=${count}`);
	}
	function handleAddToCart() {
		AddItemToCart.mutate();
	}

	const discount = useMemo(() => {
		const product = data?.data;
		if (product) {
			const discount =
				(((product.price ?? 0) - (product.discountedPrice ?? 0)) /
					(product.price ?? 1)) *
				100;
			return Math.round(discount);
		}
		return 0;
	}, [data?.data]);

	useEffect(() => {
		if (isLoading || !data?.data) return;

		if (!data?.data?.shortDescription) {
			setShowDescription(true);
		}
	}, [data?.data, data?.data?.shortDescription, isLoading]);

	return (
		<>
			{isLoading ? (
				<Spin fullscreen />
			) : (
				<div className="flex flex-col gap-6">
					<div className="flex sm:flex-row flex-col gap-5 sm:gap-20 py-5 sm:items-start px-5 sm:px-20">
						<Image
							className="w-screen sm:!min-w-[550px] max-w-[550px] h-[197px] sm:!h-[422px] object cover rounded"
							src={replaceSrc(data?.data?.image?.[0]?.url)}
						/>

						<div className="flex flex-col sm:flex-grow gap-[5px] sm:gap-5 px-2 py-2">
							<h1 className="text-sm sm:text-2xl sm:font-bold">
								{data?.data?.name}
							</h1>

							<div className="flex flex-col sm:gap-4">
								<span className="text-[7px] leading-3 sm:text-base font-normal">
									{data?.data.shortDescription}
								</span>
								{showDescription ? (
									<span className="text-[7px] leading-3 sm:text-base font-normal flex">
										{data?.data.description}
									</span>
								) : (
									""
								)}
								<Button
									type="link"
									className={`${
										data?.data.shortDescription ? "" : "hidden"
									} text-[7px] sm:text-base text-[#29A157] font-inter w-fit p-0`}
									onClick={toggleDescription}>
									See {showDescription ? "less" : "More"}
								</Button>
							</div>

							<p className={`text-red-500`}>
								{ItemsInStock ? (
									<>
										IN STOCK :
										<span className="font-bold">{ItemsInStock} kg</span>
									</>
								) : (
									"OUT OF STOCK"
								)}
							</p>
							<div className="flex sm:flex-col justify-between items-start">
								<div className="flex sm:gap-3 flex-col">
									<div className="flex gap-1 sm:gap-5 items-center">
										<span className="text-xxs sm:text-2xl sm:font-bold">
											Rs {data?.data.discountedPrice}
										</span>
										<span className="text-[10px] sm:text-base font-normal line-through decoration-red-500">
											Rs {data?.data.price}
										</span>
									</div>

									<span className="text-[7px] sm:text-base text-[#29A157] font-inter">
										{discount}% OFF
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
												onClick={reductCount}
												disabled={count === 0}>
												-
											</Button>
											<Button
												type="default"
												size="small"
												loading={AddItemToCart.isLoading}>
												{count}
											</Button>
											<Button
												type="default"
												size="small"
												className="bg-gray-300"
												onClick={addCount}
												disabled={count === ItemsInStock}>
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
									onClick={handleBuyNow}
									className="bg-yellow-500 sm:w-full sm:text-lg sm:font-bold text-white">
									Buy Now
								</Button>
								<Button
									type="primary"
									size={isMobileDevice ? "small" : "large"}
									onClick={handleAddToCart}
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
								<span className="text-xs sm:text-2xl font-bold px-5 sm:px-16">
									You might also like
								</span>
								<div className="flex px-5 sm:px-16 gap-4 overflow-x-scroll w-full">
									{Products?.data
										?.filter((data) => data._id !== id)
										.map((item, index) => (
											<FoodCard
												id={item._id}
												key={index}
												withDetails
												details={item.shortDescription}
												originalPrice={item.price ?? 0}
												discountedPrice={item.discountedPrice ?? 0}
												foodName={item.name}
												foodImage={item.image?.[0]?.url ?? ""}
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
