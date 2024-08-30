import React from "react";
import { Carousel } from "antd";

interface ICarouselProps {
	slideItems: { imgSrc: string }[];
}
const ImageSlider: React.FC<ICarouselProps> = ({ slideItems }) => {
	return (
		<Carousel dotPosition={"bottom"} autoplay autoplaySpeed={5000}>
			{slideItems.map((item, index) => (
				<div key={index}>
					<img
						key={item.imgSrc + index}
						src={item.imgSrc}
						alt="Logo"
						className="w-full rounded-xl object-cover h-[170px] lg:h-[500px]"
					/>
				</div>
			))}
		</Carousel>
	);
};

export default ImageSlider;
