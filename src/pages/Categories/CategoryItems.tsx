import { Breadcrumb, Spin } from "antd";
import { useQuery } from "react-query";
import useApi from "../../api/useApi";
import { useParams } from "react-router";
import FoodCard from "../../component/FoodCard";
import QueryKeys from "../../constants/QueryKeys";
import { useMemo, useState } from "react";

const CategoryItems = () => {
	const { getCategoryById } = useApi();
	const [selectedSubCategory, setSelectedSubCategory] = useState("all");
	const { id } = useParams();

	const CategoryData = useQuery({
		queryKey: [QueryKeys.Categories, id],
		queryFn: () => getCategoryById(id!),
		enabled: !!id,
	});

	const filteredProducts = useMemo(() => {
		const products = CategoryData.data?.data.products;
		if (selectedSubCategory === "all") return products;
		products?.filter((item) => item.subCategory === selectedSubCategory);
	}, [selectedSubCategory, CategoryData.data?.data.products]);

	if (CategoryData.isLoading) return <Spin />;

	return (
		<div className="flex flex-col gap-5 sm:gap-10 ">
			<div className="flex flex-col bg-[#FEFDE799] px-4 sm:px-20">
				<div className="py-[22px]">
					<Breadcrumb
						separator="/"
						items={[
							{ title: "Home", href: "/" },
							{ title: CategoryData.data?.data.name },
						]}
					/>
					<h1 className="text-[32px] leading-10 font-bold mt-[30px]">
						{CategoryData.data?.data.name}
					</h1>
				</div>

				{CategoryData.data?.data.subcategories.length ? (
					<div className="flex gap-[60px] py-[50px]">
						<div
							className={`flex flex-col gap-2 py-5 cursor-pointer ${
								selectedSubCategory == "all" ? " border-b-2 border-red-500" : ""
							}`}
							onClick={() => setSelectedSubCategory("all")}>
							<img
								src={CategoryData.data?.data.image?.url}
								alt={"all"}
								className="w-[100px] h-[100px] rounded-full"
							/>
							<span className="text-base font-semibold text-center">All</span>
						</div>
						{CategoryData.data?.data.subcategories.map((item) => (
							<div
								key={item._id}
								className={`flex flex-col gap-2 py-5 cursor-pointer ${
									selectedSubCategory == item._id
										? " border-b-2 border-red-500"
										: ""
								}`}
								onClick={() => setSelectedSubCategory(item._id)}>
								<img
									src={item.image.url}
									alt={item.name}
									className="w-[100px] h-[100px] rounded-full"
								/>
								<span className="text-base font-semibold text-center">
									{item.name}
								</span>
							</div>
						))}
					</div>
				) : (
					<></>
				)}
			</div>
			<div className="flex flex-wrap gap-5 px-10 sm:px-20">
				{filteredProducts?.map((item) => (
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
