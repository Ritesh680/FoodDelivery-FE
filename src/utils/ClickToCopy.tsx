import { message } from "antd";

const CopyToClipboardButton = ({ content }: { content: string }) => {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			message.success("Text copied to clipboard");
		} catch (error) {
			console.error("Unable to copy to clipboard:", error);
		}
	};

	return (
		<button
			onClick={handleCopy}
			className="bg-white px-3 font-bold text-base italic">
			{content ?? "test"}
		</button>
	);
};

export default CopyToClipboardButton;
