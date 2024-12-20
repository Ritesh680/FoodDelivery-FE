import { useQuery } from "react-query";
import QueryKeys from "../../constants/QueryKeys";
import useApi from "../../api/useApi";
import FoodCard from "../../component/FoodCard";
import { Pagination, Spin } from "antd";
import ContentWrapper from "../../component/ContentHeader/ContentWrapper";
import { useState } from "react";

const Offers = () => {
	const { getOffersProducts } = useApi();
	const [page, setPage] = useState(1);
	const { data: OffersProducts, isLoading } = useQuery({
		queryKey: [QueryKeys.Offers, page],
		queryFn: getOffersProducts,
	});
	const TopOffersFoodItems = OffersProducts?.data;
	return (
		<>
			{isLoading ? (
				<Spin fullscreen />
			) : (
				<ContentWrapper title="Top Offers">
					<div className="ps-4 w-full grid gap-5 gap-y-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
						{TopOffersFoodItems?.map((item, index) => (
							<FoodCard
								key={index}
								id={item._id}
								withDetails
								originalPrice={item.price ?? 0}
								discountedPrice={item.discountedPrice ?? 0}
								details={item.shortDescription}
								foodName={item.name}
								foodImage={item?.image?.[0]?.url || ""}
							/>
						))}
					</div>
					<div>
						<Pagination
							total={OffersProducts?.metaData?.total}
							current={page}
							hideOnSinglePage
							onChange={(val) => setPage(val)}
						/>
					</div>
				</ContentWrapper>
			)}
		</>
	);
};

export default Offers;
