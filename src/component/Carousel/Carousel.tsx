import React from "react";
import { Carousel } from "antd";
import Image from "../Image";

interface ICarouselProps {
	slideItems: { imgSrc: string }[];
}
const ImageSlider: React.FC<ICarouselProps> = ({ slideItems }) => {
	return (
		<Carousel dotPosition={"bottom"} autoplay autoplaySpeed={5000}>
			{slideItems.length ? (
				slideItems.map((item, index) => (
					<div key={index}>
						<Image
							src={item.imgSrc}
							className={`w-full rounded-xl object-cover h-[170px] lg:h-[500px]`}
							alt="Logo"
						/>
					</div>
				))
			) : (
				<Image
					src={"https://placehold.co/600x400"}
					alt="Logo"
					className="w-full rounded-xl object-cover h-[170px] lg:h-[500px]"
				/>
			)}
		</Carousel>
	);
};

export default ImageSlider;
