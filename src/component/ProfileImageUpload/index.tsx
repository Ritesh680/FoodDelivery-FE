import { UserOutlined } from "@ant-design/icons";
import { GetProp, Spin, Upload, UploadProps, message } from "antd";
import { useState } from "react";
import { getCookie } from "../../utils/function";
import Image from "../Image";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback?: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback?.(reader.result as string));
	reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
};

const ProfileImageRender = ({
	profileImage,
	shouldUpdateImage = false,
}: {
	profileImage?: string;
	shouldUpdateImage?: boolean;
}) => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | undefined>(profileImage);

	const handleChange: UploadProps["onChange"] = (info) => {
		if (!shouldUpdateImage) return;
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as FileType, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
			message.success("Profile Image updated");
		}
	};

	const uploadButton = (
		<button style={{ border: 0, background: "none" }} type="button">
			{/* {loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div> */}

			<UserOutlined className="text-7xl text-gray-400" />
		</button>
	);

	return (
		<>
			<Upload
				name="profileImage"
				listType="picture-circle"
				className="border-none rounded-full"
				showUploadList={false}
				openFileDialogOnClick={shouldUpdateImage}
				action={
					shouldUpdateImage
						? import.meta.env.VITE_BASE_URL + "/user/image"
						: undefined
				}
				withCredentials={true}
				headers={{ Authorization: `Bearer ${getCookie("token")}` }}
				beforeUpload={beforeUpload}
				onChange={handleChange}>
				{loading ? (
					<Spin />
				) : imageUrl ? (
					<Image
						src={imageUrl}
						alt="Profile image"
						className="w-full h-full  rounded-full object-cover"
					/>
				) : (
					uploadButton
				)}
			</Upload>
		</>
	);
};

export default ProfileImageRender;
