import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Breadcrumb, Pagination, Spin } from "antd";
import useApi from "../../api/useApi";
import { useNavigate, useParams } from "react-router";
import FoodCard from "../../component/FoodCard";
import QueryKeys from "../../constants/QueryKeys";
import Image from "../../component/Image";

const CategoryItems = () => {
	const { getCategoryById } = useApi();
	const [selectedSubCategory, setSelectedSubCategory] = useState("all");
	const { id } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);

	const CategoryData = useQuery({
		queryKey: [QueryKeys.Categories, id, page, selectedSubCategory],
		queryFn: () => getCategoryById(id!, selectedSubCategory, page),
		onSuccess: () => setPage(1),
		enabled: !!id,
	});

	const products = useMemo(() => {
		return CategoryData.data?.data?.products?.sort((prodA, prodB) => {
			const { price: priceA, discountedPrice: disA } = prodA;
			const { price: priceB, discountedPrice: disB } = prodB;

			const discountPercentA = ((priceA! - (disA ?? 0)) / priceA!) * 100;
			const discountPercentB = ((priceB! - (disB ?? 0)) / priceB!) * 100;

			return discountPercentB - discountPercentA;
		});
	}, [CategoryData.data?.data.products]);

	useEffect(() => {
		const sub = searchParams.get("sub");
		if (sub) {
			const subCategory = CategoryData.data?.data.subcategories.find(
				(cat) => cat.name.toLowerCase() === sub.toLowerCase()
			);
			if (subCategory) {
				setSelectedSubCategory(subCategory._id);
			} else {
				navigate(`/menu/${id}`, { replace: true });
			}
		}
	}, [CategoryData.data?.data.subcategories, id, navigate, searchParams]);

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
					<div className="flex gap-[60px]  overflow-x-scroll">
						<div
							className={`flex flex-col gap-2 py-5 cursor-pointer ${
								selectedSubCategory == "all" ? " border-b-2 border-red-500" : ""
							}`}
							onClick={() => setSelectedSubCategory("all")}>
							<Image
								src={CategoryData.data?.data?.image?.url}
								alt={"all"}
								className="min-w-[100px] sm:w-[100px] h-[100px] rounded-full object-cover"
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
									src={item.image?.url}
									alt={item.name}
									className="min-w-[100px] max-w-[100px] h-[100px] rounded-full object-cover"
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
			<span className="text-base py-2 rounded-xl px-5 sm:px-20 -mt-5 sm:-mt-10 border-b">
				{CategoryData.data?.metaData.total} items
			</span>
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-5 sm:px-20 pb-5 mx-auto">
				{products?.map((item) => (
					<FoodCard
						key={item._id}
						id={item._id}
						foodImage={item.image?.[0]?.url ?? ""}
						foodName={item.name}
						details={item.shortDescription}
						withDetails
						originalPrice={item.price ?? 0}
						discountedPrice={item.discountedPrice ?? 0}
					/>
				))}
			</div>

			<div className="flex mx-auto pb-10">
				<Pagination
					current={page}
					total={CategoryData.data?.metaData.total}
					hideOnSinglePage
					onChange={(page) => setPage(page)}></Pagination>
			</div>
		</div>
	);
};

export default CategoryItems;
