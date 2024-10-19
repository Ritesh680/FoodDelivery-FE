import { STATIC_DATA } from "../../constants";

const Payment = ({ id }: { id: string }) => {
	return (
		<div className="flex flex-col items-center">
			<img
				src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png"
				alt="QR"
				className="h-80"
			/>
			<p>
				Please send the receipt to this WhatsApp Number:{" "}
				<a
					href={STATIC_DATA.WHATSAPP + `?text=Payment for order number ${id}`}
					className="underline text-blue-400 italic"
					target="__blank"
					aria-label="Chat on WhatsApp">
					{STATIC_DATA.PHONE_NUMBER}
				</a>
			</p>
		</div>
	);
};

export default Payment;
