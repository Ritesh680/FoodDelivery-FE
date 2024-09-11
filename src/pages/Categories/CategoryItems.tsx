import { Breadcrumb, Spin } from "antd";
import { useQuery } from "react-query";
import useApi from "../../api/useApi";
import { useParams } from "react-router";
import FoodCard from "../../component/FoodCard";
import QueryKeys from "../../constants/QueryKeys";

const CategoryItems = () => {
	const { getCategoryById } = useApi();
	const { id } = useParams();

	const CategoryData = useQuery({
		queryKey: [QueryKeys.Categories, id],
		queryFn: () => getCategoryById(id!),
		enabled: !!id,
	});

	if (CategoryData.isLoading) return <Spin />;

	return (
		<div className="flex flex-col gap-5 sm:gap-10 ">
			<div className="flex flex-col bg-[#FEFDE799] py-10 sm:py-14 px-4 sm:px-20 sm:gap-12">
				<Breadcrumb
					separator="/"
					items={[
						{ title: "Home", href: "/" },
						{ title: CategoryData.data?.data.name },
					]}
				/>
			</div>
			<div className="flex flex-wrap gap-5 px-20">
				{CategoryData.data?.data.products.map((item) => (
					<FoodCard
						key={item._id}
						id={item._id}
						foodImage={item.image?.[0]?.url ?? ""}
						foodName={item.name}
						withDetails
						originalPrice={item.price ?? 0}
						discountedPrice={item.discountedPrice ?? 0}
					/>
				))}
			</div>
		</div>
	);
};

export default CategoryItems;
