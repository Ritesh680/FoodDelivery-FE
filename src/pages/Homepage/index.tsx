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

const HomePage = () => {
	const { getProducts, getCategories, getLandingPageData } = useApi();

	const [showOfferBanner, setShowOfferBanner] = useState(false);

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

	const TopOffersFoodItems = Products?.data;
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

	const isMobile = useInnerWidth();

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

				<div className="flex lg:justify-between p-4 gap-[15px] bg-white lg:py-24 overflow-x-scroll">
					{[...Array(8)].map((_, index) => (
						<FoodCategoryContainer key={index} />
					))}
				</div>

				<ContentWrapper title="Top Offers">
					<div className="flex ps-4 gap-4 overflow-x-scroll w-full">
						{TopOffersFoodItems?.map((item, index) => (
							<FoodCard
								key={index}
								id={item._id}
								withDetails
								originalPrice={item.price ?? 0}
								discountedPrice={item.discountedPrice ?? 0}
								foodName={item.name}
								foodImage={item?.image?.[0]?.url || ""}
							/>
						))}
					</div>
				</ContentWrapper>

				<ContentWrapper title="Best Sellers">
					<div className="flex w-full p-4 gap-[15px] overflow-x-scroll">
						{BestSellersFoodItems?.map((item, index) => (
							<FoodCard
								key={index}
								id={item._id}
								withDetails
								originalPrice={item.price ?? 0}
								discountedPrice={item.discountedPrice ?? 0}
								foodName={item.name}
								foodImage={item?.image?.[0]?.url || ""}
							/>
						))}
					</div>
				</ContentWrapper>

				<ContentWrapper title="Explore By Category">
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-10 px-4">
						{Categories?.map((item, index) => (
							<FoodCard
								id={item._id}
								key={index}
								withDetails={false}
								foodName={item.name}
								foodImage={item.image?.url || ""}
							/>
						))}
					</div>
				</ContentWrapper>

				<div className="pt-10 pb-5 bg-[#FEFDE7]">
					<ContentWrapper title="What our Customer say's">
						{isMobile ? (
							<div className="w-full px-5 mx-3 h-[500px]">
								<Carousel dotPosition={"bottom"} autoplay autoplaySpeed={5000}>
									{Testimonials.map((item) => (
										<TestimonialCard
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
