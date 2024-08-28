import Banner from "../../component/Banner";
import ContentWrapper from "../../component/ContentHeader/ContentWrapper";
import FoodCard from "../../component/FoodCard";
import FoodCategoryContainer from "../../component/FoodCategoryContainer";
import { faker } from "@faker-js/faker";

import TestimonialSlider from "../../component/Testimonial/TestimonialSlider";

const HomePage = () => {
	const BannerItems = [
		"Free Shipping ON +Rs 999",
		"FREE Frozen French Fries On All Orders",
	];

	function generateRandomFoodItems(count: number) {
		const foodItems = Array.from({ length: count }, () => ({
			foodName: faker.commerce.productName(),
			originalPrice: parseFloat(faker.commerce.price()),
			discountedPrice: parseFloat(faker.commerce.price()),
			foodImage: faker.image.urlPicsumPhotos(),
		}));

		return foodItems;
	}

	function generateRandomCategories(count: number) {
		const categories = Array.from({ length: count }, () => ({
			categoryName: faker.commerce.department(),
			categoryImage: faker.image.urlPicsumPhotos(),
		}));

		return categories;
	}

	function generateRandomTestimonials(count: number) {
		const testimonials = Array.from({ length: count }, () => ({
			name: faker.name.fullName(),
			details: faker.lorem.sentence(),
			imgSrc: faker.image.avatar(),
		}));

		return testimonials;
	}

	const TopOffersFoodItems = generateRandomFoodItems(10);
	const BestSellersFoodItems = generateRandomFoodItems(10);
	const Categories = generateRandomCategories(6);
	const Testimonials = generateRandomTestimonials(6);

	return (
		<div className="bg-gray-100">
			<img
				src="image1.png"
				alt="Logo"
				className="w-4/5 mx-auto rounded-md object-cover h-[500px]"
			/>
			<Banner bannerItems={BannerItems} />

			<div className="flex justify-center gap-[95px] pt-[93px] px-[188px] pb-[50px] bg-white">
				{[...Array(5)].map((_, index) => (
					<FoodCategoryContainer key={index} />
				))}
			</div>

			<div className="pt-10">
				<ContentWrapper title="Top Offers">
					<div className="flex justify-center gap-[25px] mx-auto px-5">
						{TopOffersFoodItems.map((item, index) => (
							<FoodCard
								key={index}
								withDetails
								originalPrice={item.originalPrice}
								discountedPrice={item.discountedPrice}
								foodName={item.foodName}
								foodImage={item.foodImage}
								handleButtonClick={() => console.log("Button Clicked")}
							/>
						))}
					</div>
				</ContentWrapper>
			</div>

			<div className="mt-10 py-10">
				<ContentWrapper title="Best Sellers">
					<div className="flex justify-center gap-[25px] mx-auto px-5">
						{BestSellersFoodItems.map((item, index) => (
							<FoodCard
								key={index}
								withDetails
								originalPrice={item.originalPrice}
								discountedPrice={item.discountedPrice}
								foodName={item.foodName}
								foodImage={item.foodImage}
								handleButtonClick={() => console.log("Button Clicked")}
							/>
						))}
					</div>
				</ContentWrapper>
			</div>

			<div className="mt-10 bg-white py-10">
				<ContentWrapper title="Explore By Category">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto place-items-center gap-10">
						{Categories.map((item, index) => (
							<FoodCard
								key={index}
								withDetails={false}
								foodName={item.categoryName}
								foodImage={item.categoryImage}
							/>
						))}
					</div>
				</ContentWrapper>
			</div>

			<div className="py-10 bg-[#FEFDE7]">
				<ContentWrapper title="What our Customer say's">
					<div className="flex justify-center items-center">
						<TestimonialSlider testimonials={Testimonials} />
					</div>
				</ContentWrapper>
			</div>
		</div>
	);
};

export default HomePage;
