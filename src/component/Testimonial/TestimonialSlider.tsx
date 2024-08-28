import { useState } from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonials = ({
	testimonials,
}: {
	testimonials: { name: string; details: string; imgSrc: string }[];
}) => {
	const [index, setIndex] = useState(0);

	const nextIndex = index + 1 >= testimonials.length ? 0 : index + 1;
	const prevIndex = index - 1 < 0 ? testimonials.length - 1 : index - 1;

	function leftShiftHandler() {
		if (index - 1 < 0) {
			setIndex(testimonials.length - 1);
		} else {
			setIndex(index - 1);
		}
	}

	function rightShiftHandler() {
		if (index + 1 >= testimonials.length) {
			setIndex(0);
		} else {
			setIndex(index + 1);
		}
	}

	return (
		<div
			className="flex flex-col justify-center items-center
    mt-10 p-10 transition-all duration-700 rounded-md w-[1100px] mx-auto">
			<div className="flex items-center justify-center transition-all duration-500">
				<div
					className="w-1/3 translate-x-5 opacity-75 cursor-pointer hover:scale-110 transition-all duration-200"
					onClick={leftShiftHandler}>
					<TestimonialCard {...testimonials[prevIndex]} isActive={false} />
				</div>

				<div className="z-50">
					<TestimonialCard {...testimonials[index]} />
				</div>
				<div
					className="w-1/3 -translate-x-5 opacity-75 cursor-pointer hover:scale-110 transition-all duration-200"
					onClick={rightShiftHandler}>
					<TestimonialCard {...testimonials[nextIndex]} isActive={false} />
				</div>
			</div>

			<div className="flex text-3xl mt-5">
				<div className="flex items-center justify-center gap-2">
					{testimonials.map((_, i) => (
						<div
							key={i}
							className={`transition-all  rounded-full h-4 w-4 border-2 cursor-pointer ${
								index === i ? "p-0.5 bg-gray-400" : "bg-opacity-50 bg-white"
							}`}
							onClick={() => setIndex(i)}></div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
