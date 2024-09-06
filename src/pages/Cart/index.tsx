import MobileContent from "../../component/Layout/MobileContent";
import useApi from "../../api/useApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Card, Divider, Spin } from "antd";
import { DeleteIcon } from "../../assets/icons";
import { ICartResponse, ImageGetResponse } from "../../@types/interface";
import { DataUpdateFunction } from "react-query/types/core/utils";
import { LoadingOutlined } from "@ant-design/icons";
import PopupButton from "../../component/ConfirmButton";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
	const { getCart, deleteCart, addToCart } = useApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: removeItemFromCart, isLoading: isItemDeleting } = useMutation(
		{
			mutationFn: (productId: string) => deleteCart(productId),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["Cart"] });
			},
		}
	);

	const {
		mutate,
		isLoading: isCartUpdating,
		variables,
	} = useMutation({
		mutationFn: (data: { productId: string; quantity: number }) =>
			addToCart(data.productId, data.quantity),
		onSuccess: (res) => {
			queryClient.setQueryData<
				DataUpdateFunction<
					ApiResponse<ICartResponse>,
					ApiResponse<ICartResponse>
				>
			>("Cart", (data: ApiResponse<ICartResponse>) => {
				const products = data?.data?.products.map((item) => {
					if (item.product._id === res.data.product) {
						return { ...item, quantity: res.data.quantity };
					}
					return item;
				});
				return { ...data, data: { products } };
			});
		},
	});
	function updateCart(productId: string, quantity: number) {
		mutate({ productId, quantity });
	}

	const {
		data: cartItems,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: "Cart",
		queryFn: getCart,
	});

	const AddRemoveButton = ({
		onRemove,
		quantity,
		onAdd,
		loading,
	}: {
		quantity: number;
		onAdd: () => void;
		onRemove: () => void;
		loading: boolean;
	}) => {
		return (
			<div className="flex items-center rounded-xl col-span-1">
				<Button type="text" onClick={onRemove} disabled={loading}>
					-
				</Button>
				<Button type="text">
					{loading ? (
						<Spin
							size={"small"}
							className="w-3"
							indicator={<LoadingOutlined size={8} />}
						/>
					) : (
						quantity
					)}
				</Button>
				<Button type="text" onClick={onAdd} disabled={loading}>
					+
				</Button>
			</div>
		);
	};

	const CartCard = ({
		image,
		name,
		price,
		quantity,
		onDelete,
		onAdd,
		onRemove,
		_id,
	}: {
		name: string;
		image: ImageGetResponse[];
		price: number | null;
		quantity: number;
		onDelete: () => void;
		onAdd: () => void;
		onRemove: () => void;
		_id: string;
	}) => {
		return (
			<Card className="p-5 rounded-none">
				<div className="flex gap-5 items-stretch">
					<img
						src={image[0].url}
						alt="product"
						className="h-[48px] w-[58px] rounded"
					/>
					<div className="flex flex-col gap-2.5 flex-grow">
						<span className="text-[10px] leading-3">{name}</span>
						<div className="flex justify-between items-center w-full">
							<div className="flex gap-5 items-center">
								<span className="text-[10px] leading-3">Rs {price}</span>

								<AddRemoveButton
									quantity={quantity}
									onAdd={onAdd}
									onRemove={onRemove}
									loading={isCartUpdating && variables?.productId === _id}
								/>
							</div>
							<PopupButton
								title="Remove from Cart?"
								description="Are you sure?"
								onConfirm={onDelete}>
								<DeleteIcon className="text-red-500 h-5 w-[18px] hover:scale-105 cursor-pointer" />
							</PopupButton>
						</div>
					</div>
				</div>
			</Card>
		);
	};

	const itemSubtotal = useMemo(() => {
		return cartItems?.data?.products?.reduce(
			(acc, curr) => acc + (curr.product?.price ?? 0) * curr.quantity,
			0
		);
	}, [cartItems]);

	const deliveryCharge = useMemo(() => {
		const totalWeight = cartItems?.data?.products?.reduce(
			(acc, curr) => acc + curr.quantity,
			0
		);
		return totalWeight ? (totalWeight >= 5 ? 0 : 100) : 0;
	}, [cartItems]);

	function navigateToCheckout() {
		navigate(
			{ pathname: "/checkout" },
			{ state: { subtotal: itemSubtotal, deliveryCharge } }
		);
	}
	return (
		<>
			{isLoading || isItemDeleting || isFetching ? (
				<Spin fullscreen />
			) : (
				<MobileContent title="Shopping Cart">
					{cartItems?.data.products ? (
						<div className="flex flex-col">
							{cartItems?.data?.products?.map((item) => (
								<CartCard
									key={item.product._id}
									{...item.product}
									quantity={item.quantity}
									onDelete={() => removeItemFromCart(item.product._id)}
									onAdd={() => updateCart(item.product._id, item.quantity + 1)}
									onRemove={() =>
										updateCart(item.product._id, item.quantity - 1)
									}
								/>
							))}

							<div className="flex flex-col py-5 gap-1">
								<span className="text-[8px] text-[#C50202] leading-[10px] mx-auto">
									Free shipping on order obove 5kg
								</span>
								<div className="flex flex-col px-5 gap-2.5">
									<div className="flex w-full justify-between items-center">
										<h3 className="text-[10px] font-semibold leading-3">
											Item Subtotal:
										</h3>
										<div className="flex justify-between items-center">
											<p className="text-[10px] font-semibold">
												{isItemDeleting || isCartUpdating ? (
													<Spin />
												) : (
													itemSubtotal
												)}
											</p>
										</div>
									</div>
									<div className="flex w-full justify-between items-center">
										<h3 className="text-[10px] font-semibold leading-3">
											Discount
										</h3>
										<div className="flex justify-between items-center">
											<p className="text-[10px] font-semibold">0</p>
										</div>
									</div>
									<div className="flex w-full justify-between items-center">
										<h3 className="text-[10px] font-semibold leading-3">
											DeliveryCharge
										</h3>
										<div className="flex justify-between items-center">
											<p className="text-[10px] font-semibold">
												Rs {deliveryCharge}
											</p>
										</div>
									</div>

									<Divider />
									<div className="flex w-full justify-between items-center">
										<h3 className="text-[10px] font-bold leading-3">
											Item Total:
										</h3>
										<div className="flex justify-between items-center">
											<p className="text-[10px] font-bold">
												Rs {itemSubtotal ? itemSubtotal + deliveryCharge : 0}
											</p>
										</div>
									</div>

									<button
										className="bg-[#C50202] text-white px-5 py-1 rounded w-full text-[10px] font-bold mt-5"
										type="button"
										onClick={navigateToCheckout}>
										Continue Checkout
									</button>
								</div>
							</div>
						</div>
					) : (
						<span>Nothiong to display</span>
					)}
				</MobileContent>
			)}
		</>
	);
};

export default Cart;
