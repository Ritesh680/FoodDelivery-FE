import Banner from "../../component/Banner";
import ContentWrapper from "../../component/ContentHeader/ContentWrapper";
import FoodCard from "../../component/FoodCard";
import FoodCategoryContainer from "../../component/FoodCategoryContainer";
import { faker } from "@faker-js/faker";

import TestimonialSlider from "../../component/Testimonial/TestimonialSlider";
import ImageSlider from "../../component/Carousel/Carousel";
import useApi from "../../api/useApi";

const HomePage = () => {
	const { addToCart } = useApi();
	const BannerItems = [
		"Free Shipping ON +Rs 999",
		"FREE Frozen French Fries On All Orders",
	];

	function generateRandomFoodItems(count: number) {
		const foodItems = Array.from({ length: count }, () => ({
			_id: faker.random.alphaNumeric(),
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

	function generateRandomLandingImages(count: number) {
		const landingImages = Array.from({ length: count }, () => ({
			imgSrc: faker.image.urlPicsumPhotos(),
		}));

		return landingImages;
	}

	const TopOffersFoodItems = generateRandomFoodItems(10);
	const BestSellersFoodItems = generateRandomFoodItems(10);
	const Categories = generateRandomCategories(6);
	const Testimonials = generateRandomTestimonials(6);
	const LandingImages = generateRandomLandingImages(4);

	return (
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
				<div className="flex w-full lg:justify-between p-5 gap-[15px] overflow-x-scroll">
					{TopOffersFoodItems.map((item, index) => (
						<FoodCard
							key={index}
							withDetails
							originalPrice={item.originalPrice}
							discountedPrice={item.discountedPrice}
							foodName={item.foodName}
							foodImage={item.foodImage}
							handleButtonClick={() => addToCart(item._id, 1)}
						/>
					))}
				</div>
			</ContentWrapper>

			<ContentWrapper title="Best Sellers">
				<div className="flex w-full lg:justify-between p-4 gap-[15px] overflow-x-scroll">
					{BestSellersFoodItems.map((item, index) => (
						<FoodCard
							key={index}
							withDetails
							originalPrice={item.originalPrice}
							discountedPrice={item.discountedPrice}
							foodName={item.foodName}
							foodImage={item.foodImage}
							handleButtonClick={() => addToCart(item._id, 1)}
						/>
					))}
				</div>
			</ContentWrapper>

			<ContentWrapper title="Explore By Category">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto place-items-center gap-10 p-4">
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
