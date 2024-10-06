import { PropsWithChildren } from "react";
import ContentHeader from ".";

const ContentWrapper = ({
	title,
	children,
}: PropsWithChildren<{ title: string }>) => {
	return (
		<div className="flex flex-col gap-5 items-center py-5 overflow-hidden lg:px-16 px-5">
			<ContentHeader title={title} />

			{children}
		</div>
	);
};

export default ContentWrapper;
