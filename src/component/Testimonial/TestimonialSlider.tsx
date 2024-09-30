import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonials = ({
	testimonials,
}: {
	testimonials: { name: string; details: string; imgSrc: string }[];
}) => {
	const [index, setIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(isMobileDevice());

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

	function isMobileDevice() {
		return window.innerWidth < 768;
	}

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(isMobileDevice());
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div
			className="flex flex-col justify-center items-center
   p-5 transition-all duration-700 rounded-md mx-auto">
			<div className="w-2/3 flex flex-col md:flex-row items-center justify-center transition-all duration-500 gap-5 md:gap-0">
				<div
					className={
						!isMobileDevice()
							? "translate-x-5 opacity-75 cursor-pointer hover:scale-110 transition-all duration-200"
							: ""
					}
					onClick={leftShiftHandler}>
					<TestimonialCard {...testimonials[prevIndex]} isActive={isMobile} />
				</div>

				<div className={!isMobile ? "z-10" : ""}>
					<TestimonialCard {...testimonials[index]} isActive={true} />
				</div>
				<div
					className={
						!isMobile
							? "-translate-x-5 opacity-75 cursor-pointer hover:scale-110 transition-all duration-200"
							: ""
					}
					onClick={rightShiftHandler}>
					<TestimonialCard {...testimonials[nextIndex]} isActive={isMobile} />
				</div>
			</div>

			<div className="hidden md:flex text-3xl mt-5">
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
