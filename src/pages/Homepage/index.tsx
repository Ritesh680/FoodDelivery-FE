import Banner from "../../component/Banner";
import ContentWrapper from "../../component/ContentHeader/ContentWrapper";
import FoodCard from "../../component/FoodCard";
import FoodCategoryContainer from "../../component/FoodCategoryContainer";

import TestimonialSlider from "../../component/Testimonial/TestimonialSlider";
import ImageSlider from "../../component/Carousel/Carousel";
import useApi from "../../api/useApi";
import { useQuery } from "react-query";
import { Carousel, Spin } from "antd";
import { useMemo, useState } from "react";
import Modal from "../../component/Modal";
import QueryKeys from "../../constants/QueryKeys";
import { Testimonials } from "../../constants/data/Testimonials";
import useInnerWidth from "../../hooks/useInnerWidth";

import TestimonialCard from "../../component/Testimonial/TestimonialCard";
import {
	ChickenSVG,
	CowSVG,
	FishSVG,
	FrozenFoodSVG,
	PigSVG,
} from "../../assets/icons";
import ViewMore from "../../component/ViewMore";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const HomePage = () => {
	const { getProducts, getCategories, getLandingPageData, getOffersProducts } =
		useApi();

	const [showOfferBanner, setShowOfferBanner] = useState(false);
	const navigate = useNavigate();

	const LandingPageData = useQuery({
		queryKey: [QueryKeys.LandingPage],
		queryFn: getLandingPageData,
	});

	const { data: Products, isLoading } = useQuery({
		queryKey: QueryKeys.Products,
		queryFn: getProducts,
	});
	const { data: Category } = useQuery({
		queryKey: QueryKeys.Categories,
		queryFn: getCategories,
	});
	const { data: OffersProducts } = useQuery({
		queryKey: QueryKeys.Offers,
		queryFn: getOffersProducts,
	});
	const TopOffersFoodItems = OffersProducts?.data;

	const BestSellersFoodItems = Products?.data.filter(
		(data) => data.isBestSeller
	);
	const Categories = Category?.data;

	const LandingImages = useMemo(() => {
		if (LandingPageData.isLoading) return [];
		return LandingPageData.data?.data?.[0]?.images?.map((image) => ({
			imgSrc: image.url,
		}));
	}, [LandingPageData.data?.data, LandingPageData.isLoading]);

	const { isMobileDevice } = useInnerWidth();

	const FOOD_CATEGORIES = [
		{ label: "100% Grass-Fed Buff", svg: CowSVG },
		{ label: "Pasture Raised Chicken", svg: ChickenSVG },
		{ label: "Heritage Pork", svg: PigSVG },
		{ label: "Wild caught Sea Foods", svg: FishSVG },
		{ label: "Frozen Foods", svg: FrozenFoodSVG },
	];
	if (isLoading) {
		return <Spin fullscreen size="large" />;
	}

	return (
		<>
			{showOfferBanner ? (
				<Modal
					open={showOfferBanner}
					onClose={() => setShowOfferBanner(false)}
				/>
			) : (
				""
			)}

			<div className="bg-gray-100 flex flex-col gap-5">
				<div className="w-full lg:px-16 lg:mt-16 mt-5 px-5 h-[170px] lg:h-[500px]">
					<ImageSlider slideItems={LandingImages ?? []} />
				</div>

				<Banner
					bannerItems={
						LandingPageData.data?.data[0]?.banner ?? ["Please Add Banner Items"]
					}
				/>

				<div className="flex lg:justify-between p-4 gap-[15px] bg-white lg:py-24 overflow-x-scroll items-start lg:items-center lg:px-[188px]">
					{FOOD_CATEGORIES.map((item, index) => (
						<FoodCategoryContainer
							key={index}
							name={item.label}
							icon={{ svg: item.svg }}
						/>
					))}
				</div>

				<ContentWrapper title="Shop By Category">
					<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-10 w-full">
						{Categories?.map((item, index) => (
							<Link key={index} to={`/menu/${item._id}`}>
								<div className="flex flex-col items-center gap-2">
									<img
										src={item.image?.url ?? "https://placehold.co/400"}
										alt={item.name}
										className="!w-[72px] !h-[72px] rounded-xl object-cover"
									/>
									<span className="text-base">{item.name}</span>
								</div>
							</Link>
						))}
					</div>
				</ContentWrapper>

				<ContentWrapper title="Top Offers">
					<div className="flex gap-4 overflow-x-scroll w-full">
						{TopOffersFoodItems?.slice(0, 9)?.map((item, index) => (
							<FoodCard
								key={index}
								id={item._id}
								withDetails
								originalPrice={item.price ?? 0}
								discountedPrice={item.discountedPrice ?? 0}
								foodName={item.name}
								details={item.shortDescription}
								foodImage={item?.image?.[0]?.url || ""}
							/>
						))}
						{(TopOffersFoodItems?.length ?? 0) >= 10 ? (
							<ViewMore handleClick={() => navigate("/offers")} />
						) : (
							""
						)}
					</div>
				</ContentWrapper>

				<ContentWrapper title="Best Sellers">
					<div className="flex w-full gap-[15px] overflow-x-scroll">
						{BestSellersFoodItems?.map((item, index) => (
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
						{(BestSellersFoodItems?.length ?? 0) >= 10 ? (
							<ViewMore handleClick={() => navigate("/best-seller")} />
						) : (
							""
						)}
					</div>
				</ContentWrapper>

				<div className="pt-10 pb-5 bg-[#FEFDE7]">
					<ContentWrapper title="What our Customer say's">
						{isMobileDevice ? (
							<div className="w-full px-5 mx-3 h-[500px]">
								<Carousel dotPosition={"bottom"} autoplay autoplaySpeed={5000}>
									{Testimonials.map((item, i) => (
										<TestimonialCard
											key={item.imgSrc + i}
											name={item.name}
											imgSrc={item.imgSrc}
											details={item.details}
											isActive={true}
										/>
									))}
								</Carousel>
							</div>
						) : (
							<div className="flex justify-center items-center">
								<TestimonialSlider testimonials={Testimonials} />
							</div>
						)}
					</ContentWrapper>
				</div>
			</div>
		</>
	);
};

export default HomePage;
