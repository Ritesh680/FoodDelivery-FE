import { TestIcon } from "../../assets/icons";

const FoodCategoryContainer = () => {
	return (
		<div className="w-[135px] flex flex-col justify-center items-center gap-[35px]">
			<div className="h-[100px] w-[100px] bg-[rgba(252,249,179,1)] rounded-full border-black border-[5px] flex items-center justify-center">
				<TestIcon className="text-[57px]" />
			</div>
			<span className="text-center text-[16px] font-normal">
				100% Grass-Fed Buff
			</span>
		</div>
	);
};

export default FoodCategoryContainer;
