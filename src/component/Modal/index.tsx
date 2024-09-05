import React, { PropsWithChildren } from "react";
import { Modal as AntdModal, ModalProps } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
interface IModalProps extends ModalProps {
	open: boolean;
	onClose: () => void;
}

const Modal: React.FC<PropsWithChildren<IModalProps>> = ({ open, onClose }) => {
	if (!open) return null;
	return (
		<>
			<AntdModal
				closeIcon={null}
				footer={null}
				centered
				open={open}
				className="w-[553px] h-[503px] relative"
				styles={{
					content: {
						backgroundColor: "#c50202",
						color: "#fff",
						maxWidth: "553px",
					},
					header: { backgroundColor: "#c50202" },
					wrapper: { backgroundColor: "#737373", opacity: "80%" },
				}}>
				<div className="py-5 lg:py-10 flex flex-col gap-2 lg:gap-5 items-center">
					<h1 className="text-5xl lg:text-7xl font-bold font-mono text-center">
						SPECIAL DEAL
					</h1>
					<span className="text-center text-3xl font-light font-mono">
						Limited time offer!
					</span>
					<div className="absolute -bottom-[100px]">
						<div className="flex flex-col gap-10 items-center">
							<button className="bg-white text-red-500 p-2.5 rounded-[20px] text-base lg:text-xl font-bold">
								Buy now
							</button>
							<CloseCircleOutlined
								className="text-[40px] text-white cursor-pointer hover:scale-105 hover:text-gray-300 transition-all duration-200"
								onClick={onClose}
							/>
						</div>
					</div>
				</div>
			</AntdModal>
		</>
	);
};

export default Modal;
