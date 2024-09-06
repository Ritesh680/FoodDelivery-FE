import { useQuery } from "react-query";
import MobileContent from "../../component/Layout/MobileContent";
import useApi from "../../api/useApi";
import { Spin } from "antd";

const ItemCard = ({ name, imageUrl }: { name: string; imageUrl: string }) => {
	return (
		<div className="flex justify-start gap-2.5 items-center p-5 bg-white [&:not(:last-child)]:border-b cursor-pointer hover:shadow-md">
			<img
				src={imageUrl}
				alt=""
				className="w-10 h-10 rounded-full object-cover"
			/>
			<span className="text-sm">{name}</span>
		</div>
	);
};
const Menu = () => {
	const { getCategories } = useApi();

	const { data: MenuItems, isLoading } = useQuery({
		queryKey: "Categories",
		queryFn: getCategories,
	});
	return (
		<>
			{isLoading ? (
				<Spin fullscreen />
			) : (
				<MobileContent title="Menu">
					<div className="px-2 flex flex-col gap-2">
						{MenuItems?.data.map((item) => (
							<ItemCard
								key={item._id}
								name={item.name}
								imageUrl={item.image.url}
							/>
						))}
					</div>
				</MobileContent>
			)}
		</>
	);
};

export default Menu;
