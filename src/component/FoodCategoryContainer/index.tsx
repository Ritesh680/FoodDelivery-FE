import { TestIcon } from "../../assets/icons";

const FoodCategoryContainer = () => {
	return (
		<div className="min-w-[120px] min-h-[90px] lg:min-w-[135px] flex flex-col justify-center items-center gap-5 lg:gap-[35px] p-1.5 bg-white cursor-pointer hover:scale-105 transition-all duration-200">
			<div className="h-10 w-10 lg:h-[100px] lg:w-[100px] bg-[rgba(252,249,179,1)] rounded-full border-black border lg:border-[5px] flex items-center justify-center">
				<TestIcon className="text-4xl lg:text-6xl" />
			</div>
			<span className="text-center text-base lg:font-normal">
				100% Grass-Fed Buff
			</span>
		</div>
	);
};

export default FoodCategoryContainer;
