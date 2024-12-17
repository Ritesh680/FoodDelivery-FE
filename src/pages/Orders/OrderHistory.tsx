import { MyOrders } from "../../@types/interface";
import Image from "../../component/Image";
const ItemCard = ({
	foodImage,
	orderQuantity,
	price,
	name,
}: {
	name: string;
	orderQuantity: number;
	price: number;
	foodImage: string;
}) => {
	return (
		<div className="py-1 sm:py-3 flex gap-5 w-full px-1 sm:px-4 rounded-sm hover:shadow-lg cursor-pointer hover:scale-[101%]">
			<Image
				src={foodImage}
				alt={name}
				className="w-14 h-12 sm:w-20 sm:h-20 rounded-xl"
			/>
			<div className="flex flex-col justify-between w-full my-2">
				<span className="text-[10px] leading-3 text-black font-semibold">
					{name}
				</span>
				<div className="flex justify-between">
					<span className="text-[10px] font-normal leading-3">Rs {price}</span>
					<span className="text-[10px] font-normal leading-3">
						Qty: {orderQuantity}
					</span>
				</div>
			</div>
		</div>
	);
};
const OrderHistory = ({
	deliveredProducts,
	cancelledProducts,
}: {
	deliveredProducts?: MyOrders["deliveredProducts"];
	cancelledProducts?: MyOrders["cancelledProducts"];
}) => {
	const orders = [
		...(deliveredProducts ?? []).map((prod) => ({
			...prod,
			status: "delivered",
		})),
		...(cancelledProducts ?? []).map((prod) => ({
			...prod,
			status: "cancelled",
		})),
	];
	return (
		<>
			{orders?.length ? (
				<div className="flex flex-col gap-4">
					{orders.map((items) => (
						<ItemCard
							name={items.name}
							orderQuantity={items.orderQuantity}
							price={items.price ?? 0}
							key={items._id}
							foodImage={items.image?.[0]?.url ?? ""}
						/>
					))}

					<div className="flex justify-between shadow shadow-slate-200 p-4">
						<span>Item Total:</span>
						<span>
							Rs{" "}
							{orders
								.reduce(
									(acc, curr) => acc + curr.orderQuantity * (curr.price ?? 0),
									0
								)
								.toFixed(2)}
						</span>
					</div>
				</div>
			) : (
				<div className="text-black h-[50vh] items-center justify-center flex flex-col w-full gap-2">
					<span className="text-sm font-bold text-red-500">
						No order available
					</span>
					<span className="text-sm font-bold">
						Buy something to see your order here.
					</span>
				</div>
			)}
		</>
	);
};

export default OrderHistory;
