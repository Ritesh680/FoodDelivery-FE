import Banner from "../../component/Banner";
import ContentWrapper from "../../component/ContentHeader/ContentWrapper";
import FoodCard from "../../component/FoodCard";
import FoodCategoryContainer from "../../component/FoodCategoryContainer";
import { faker } from "@faker-js/faker";

import TestimonialSlider from "../../component/Testimonial/TestimonialSlider";
import ImageSlider from "../../component/Carousel/Carousel";
import useApi from "../../api/useApi";
import { useQuery } from "react-query";
import { Spin } from "antd";
import { useState } from "react";
import Modal from "../../component/Modal";
import QueryKeys from "../../constants/QueryKeys";

const HomePage = () => {
	const { getProducts, getCategories } = useApi();

	const [showOfferBanner, setShowOfferBanner] = useState(false);
	const BannerItems = [
		"Free Shipping ON +Rs 999",
		"FREE Frozen French Fries On All Orders",
	];

	const { data: Products, isLoading } = useQuery({
		queryKey: QueryKeys.Products,
		queryFn: getProducts,
	});
	const { data: Category } = useQuery({
		queryKey: QueryKeys.Categories,
		queryFn: getCategories,
	});

	function generateRandomTestimonials(count: number) {
		const testimonials = Array.from({ length: count }, () => ({
			name: faker.name.fullName(),
			details: faker.lorem.sentence(),
			imgSrc: "",
		}));

		return testimonials;
	}

	function generateRandomLandingImages(count: number) {
		const landingImages = Array.from({ length: count }, () => ({
			imgSrc: faker.image.urlPicsumPhotos(),
		}));

		return landingImages;
	}

	const TopOffersFoodItems = Products?.data;
	const BestSellersFoodItems = Products?.data;
	const Categories = Category?.data;
	const Testimonials = generateRandomTestimonials(6);
	const LandingImages = generateRandomLandingImages(4);

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
					<ImageSlider slideItems={LandingImages} />
				</div>

				<Banner bannerItems={BannerItems} />

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
								foodImage={item.image?.[0]?.url || ""}
							/>
						))}
					</div>
				</ContentWrapper>

				<div className="py-10 bg-[#FEFDE7]">
					<ContentWrapper title="What our Customer say's">
						<div className="flex justify-center items-center">
							<TestimonialSlider testimonials={Testimonials} />
						</div>
					</ContentWrapper>
				</div>
			</div>
		</>
	);
};

export default HomePage;
