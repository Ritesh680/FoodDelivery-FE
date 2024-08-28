import Banner from "../../component/Banner";
import ContentWrapper from "../../component/ContentHeader/ContentWrapper";
import FoodCard from "../../component/FoodCard";
import FoodCategoryContainer from "../../component/FoodCategoryContainer";
import { faker } from "@faker-js/faker";

const HomePage = () => {
	const BannerItems = [
		"Free Shipping ON +Rs 999",
		"FREE Frozen French Fries On All Orders",
	];

	//generate random food items with random prices and discounts: foodName, originalPrice, discountedPrice,foodImage and generate random foodImageUrl from unsplash.com

	function generateRandomFoodItems(count: number) {
		const foodItems = Array.from({ length: count }, () => ({
			foodName: faker.commerce.productName(),
			originalPrice: parseFloat(faker.commerce.price()),
			discountedPrice: parseFloat(faker.commerce.price()),
			foodImage: faker.image.urlPicsumPhotos(),
		}));

		return foodItems;
	}

	const FoodItems = generateRandomFoodItems(10);

	return (
		<div className="my-10">
			<img
				src="image1.png"
				alt="Logo"
				className="w-4/5 mx-auto rounded-md object-cover h-[500px]"
			/>
			<Banner bannerItems={BannerItems} />

			<div className="flex justify-center gap-[95px] pt-[93px] px-[188px] pb-[50px]">
				{[...Array(5)].map((_, index) => (
					<FoodCategoryContainer key={index} />
				))}
			</div>

			<ContentWrapper title="Top Offers">
				<div className="flex justify-center gap-[25px] mx-auto px-5">
					{FoodItems.map((item, index) => (
						<FoodCard
							key={index}
							withDetails={false}
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
	);
};

export default HomePage;
