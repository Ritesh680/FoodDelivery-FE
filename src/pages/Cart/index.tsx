import MobileContent from "../../component/Layout/MobileContent";
import useApi from "../../api/useApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Card, Divider, Spin } from "antd";
import { DeleteIcon } from "../../assets/icons";
import { ICartResponse } from "../../@types/interface";
import { DataUpdateFunction } from "react-query/types/core/utils";
import { LoadingOutlined } from "@ant-design/icons";

const Cart = () => {
	const { getCart, deleteCart, addToCart } = useApi();
	const queryClient = useQueryClient();

	const { mutate: removeItemFromCart, isLoading: isItemDeleting } = useMutation(
		{
			mutationFn: (productId: string) => deleteCart(productId),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["Cart"] });
			},
		}
	);

	const { mutate, isLoading: isCartUpdating } = useMutation({
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
	}: {
		quantity: number;
		onAdd: () => void;
		onRemove: () => void;
	}) => {
		return (
			<div className="flex items-center rounded-xl">
				<Button
					size="small"
					onClick={onRemove}
					className="bg-gray-200 text-gray-800 rounded-l-xl px-2 rounded-r-none"
					disabled={isCartUpdating}>
					-
				</Button>
				<Button
					size="small"
					className="border-x-0 rounded-none pointer-events-none">
					{isCartUpdating ? (
						<Spin
							size={"small"}
							className="w-3"
							indicator={<LoadingOutlined size={8} />}
						/>
					) : (
						quantity
					)}
				</Button>
				<Button
					size="small"
					onClick={onAdd}
					className="bg-gray-200 text-gray-800 rounded-r-xl rounded-l-none px-2"
					disabled={isCartUpdating}>
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
	}: {
		name: string;
		image: string[];
		price: number | null;
		quantity: number;
		onDelete: () => void;
		onAdd: () => void;
		onRemove: () => void;
	}) => {
		return (
			<Card>
				<div className="flex gap-5">
					<img
						src={import.meta.env.VITE_BASE_URL + "/file/" + image[0]}
						alt="product"
						className="h-14 w-14 rounded"
					/>
					<div className="flex justify-between flex-grow items-center">
						<div className="flex flex-col gap-2.5">
							<h3 className="text-[10px] font-semibold">{name}</h3>
							<div className="flex gap-5 items-center">
								<p className="text-[10px] font-semibold">Rs {price}</p>
								<AddRemoveButton
									quantity={quantity}
									onAdd={onAdd}
									onRemove={onRemove}
								/>
							</div>
						</div>

						<DeleteIcon
							onClick={onDelete}
							className="text-red-500 h-5 w-[18px] hover:scale-105 cursor-pointer"
						/>
					</div>
				</div>
			</Card>
		);
	};
	return (
		<>
			{isLoading || isItemDeleting || isFetching ? (
				<Spin fullscreen />
			) : (
				<MobileContent title="Shopping Cart">
					{cartItems?.data.products ? (
						<div className="flex flex-col gap-5">
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

							<Divider />

							{
								<div>
									<h3 className="text-[10px] font-semibold">Total</h3>
									<div className="flex justify-between items-center">
										<p className="text-[10px] font-semibold">
											{cartItems?.data?.products?.reduce(
												(acc, curr) =>
													acc + (curr.product?.price ?? 0) * curr.quantity,
												0
											)}
										</p>
										<button className="bg-[#FFD700] text-white px-5 py-1 rounded">
											Checkout
										</button>
									</div>
								</div>
							}
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
