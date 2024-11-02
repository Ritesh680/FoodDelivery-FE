import { useQuery } from "react-query";
import QueryKeys from "../../constants/QueryKeys";
import useApi from "../../api/useApi";
import FoodCard from "../../component/FoodCard";
import { Spin } from "antd";
import ContentWrapper from "../../component/ContentHeader/ContentWrapper";

const BestSeller = () => {
	const { getBestSellerProducts } = useApi();
	const { data: OffersProducts, isLoading } = useQuery({
		queryKey: QueryKeys.Offers,
		queryFn: getBestSellerProducts,
	});
	const BestSellerProducts = OffersProducts?.data;
	return (
		<>
			{isLoading ? (
				<Spin fullscreen />
			) : (
				<ContentWrapper title="Best Sellers">
					<div className="ps-4 w-full grid gap-5 gap-y-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
						{BestSellerProducts?.map((item, index) => (
							<FoodCard
								key={index}
								id={item._id}
								withDetails
								details={item.shortDescription}
								originalPrice={item.price ?? 0}
								discountedPrice={item.discountedPrice ?? 0}
								foodName={item.name}
								foodImage={item?.image?.[0]?.url || ""}
							/>
						))}
					</div>
				</ContentWrapper>
			)}
		</>
	);
};

export default BestSeller;
