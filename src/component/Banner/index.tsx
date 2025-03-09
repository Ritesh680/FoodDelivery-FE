import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { StarIcon } from "../../assets/icons";

const Banner = ({ bannerItems }: { bannerItems: string[] }) => {
	const [dummyBannerItems, setDummybannerItems] = useState(bannerItems);

	useEffect(() => {
		if (bannerItems.length < 6) {
			const newBannerItems = bannerItems.slice(0, 6 - bannerItems.length);
			const updatedDummyBannerItems = [...bannerItems, ...newBannerItems];

			setDummybannerItems(updatedDummyBannerItems);
		}
	}, [bannerItems]);

	return (
		<div className="bg-gradient-to-r from-[#FFD600] to-[#C50202] ] my-4 py-[20.5px] overflow-hidden">
			<Marquee gradient={false} speed={50}>
				<div className="flex gap-10 px-4">
					{dummyBannerItems.map((item, index) => (
						<div
							key={index}
							className="text-center text-black text-sm flex items-center gap-2 text-nowrap font-bold">
							<StarIcon />
							{item}
						</div>
					))}
				</div>
			</Marquee>
		</div>
	);
};

export default Banner;
