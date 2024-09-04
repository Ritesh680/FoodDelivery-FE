import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadProps, message } from "antd";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
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

const ProfileImageRender = ({ profileImage }: { profileImage?: string }) => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | undefined>(profileImage);

	const handleChange: UploadProps["onChange"] = (info) => {
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
		}
	};

	const uploadButton = (
		<button style={{ border: 0, background: "none" }} type="button">
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);
	return (
		<Upload
			name="profileImage"
			listType="picture-circle"
			className="border-none"
			showUploadList={false}
			action={import.meta.env.VITE_BASE_URL + "/user/image"}
			withCredentials={true}
			beforeUpload={beforeUpload}
			onChange={handleChange}>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt="avatar"
					style={{ width: "100%" }}
					className="rounded-full"
				/>
			) : (
				uploadButton
			)}
		</Upload>
	);
};

export default ProfileImageRender;
