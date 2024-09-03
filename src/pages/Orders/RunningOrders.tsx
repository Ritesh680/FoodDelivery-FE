import { faker } from "@faker-js/faker";

const RunningOrders = () => {
	function generateRandomFoodItems(count: number) {
		const foodItems = Array.from({ length: count }, () => ({
			foodName: faker.commerce.productName(),
			quantity: faker.datatype.number({ min: 1, max: 10 }),
			price: parseFloat(faker.commerce.price()),
			foodImage: faker.image.urlPicsumPhotos(),
		}));

		return foodItems;
	}

	const foodItems = generateRandomFoodItems(10);
	const ItemCard = ({
		foodImage,
		quantity,
		price,
		foodName,
	}: {
		foodName: string;
		quantity: number;
		price: number;
		foodImage: string;
	}) => {
		return (
			<div className="py-1 sm:py-3 flex gap-5 w-full px-1 sm:px-4 rounded-sm hover:shadow-lg cursor-pointer hover:scale-[101%]">
				<img
					src={foodImage}
					alt={foodName}
					className="w-14 h-12 sm:w-20 sm:h-20 rounded-xl"
				/>
				<div className="flex flex-col justify-between w-full my-2">
					<span className="text-[10px] leading-3 text-black font-semibold">
						{foodName}
					</span>
					<div className="flex justify-between">
						<span className="text-[10px] font-normal leading-3">
							Rs {price}
						</span>
						<span className="text-[10px] font-normal leading-3">
							Qty: {quantity}
						</span>
					</div>
				</div>
			</div>
		);
	};
	return (
		<>
			{foodItems.length ? (
				<div className="flex flex-col gap-4">
					{foodItems.map((items) => (
						<ItemCard {...items} />
					))}

					<div className="flex justify-between shadow shadow-slate-200 p-4">
						<span>Item Total:</span>
						<span>
							Rs{" "}
							{foodItems.reduce(
								(acc, curr) => acc + curr.quantity * curr.price,
								0
							)}
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

export default RunningOrders;
