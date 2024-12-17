import {
	LazyLoadImage,
	LazyLoadImageProps,
} from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ ...props }: LazyLoadImageProps) => {
	return (
		<LazyLoadImage
			effect="blur"
			loading="lazy"
			onError={(e) => {
				e.currentTarget.src = "https://via.placeholder.com/150";
			}}
			wrapperProps={{
				// If you need to, you can tweak the effect transition using the wrapper style.
				style: { transitionDelay: "1ms" },
			}}
			useIntersectionObserver
			{...props}
		/>
	);
};

export default Image;
