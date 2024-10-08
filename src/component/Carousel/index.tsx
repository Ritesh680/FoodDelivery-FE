import { useState, useEffect, useCallback, PropsWithChildren } from "react";
import { ChevronRight } from "../../assets/icons";

const Carousel = ({
	children: slides,
	autoSlide = false,
	autoSlideInterval = 3000,
}: PropsWithChildren<{
	children: JSX.Element[];
	autoSlide?: boolean;
	autoSlideInterval?: number;
}>) => {
	const [curr, setCurr] = useState(0);

	const prev = () =>
		setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

	const next = useCallback(
		() => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1)),
		[slides.length]
	);

	useEffect(() => {
		if (!autoSlide) return;
		const slideInterval = setInterval(next, autoSlideInterval);
		return () => clearInterval(slideInterval);
	}, [autoSlide, autoSlideInterval, next]);

	return (
		<div className="overflow-hidden relative">
			<div
				className="flex transition-transform ease-out duration-500 w-full"
				style={{ transform: `translateX(-${curr * 100}%)` }}>
				{slides}
			</div>
			<div className="absolute inset-0 flex items-center justify-between p-4">
				<button
					onClick={prev}
					className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
					<ChevronRight className="rotate-180" />
				</button>
				<button
					onClick={next}
					className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
					<ChevronRight />
				</button>
			</div>
			<div className="absolute bottom-4 right-0 left-0">
				<div className="flex items-center justify-center gap-2">
					{slides.map((_, i) => (
						<div
							key={i}
							className={`transition-all bg-white rounded-full  ${
								curr === i ? "p-0.5" : "bg-opacity-50"
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Carousel;
