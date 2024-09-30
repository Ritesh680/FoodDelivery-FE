import type { UploadFile, UploadProps } from "antd";
import { Button, Form, message, Upload } from "antd";
import { useMemo } from "react";
import {
	FieldValues,
	useController,
	UseControllerProps,
} from "react-hook-form";
import { ImageGetResponse } from "../../@types/interface";
import { UploadOutlined } from "@ant-design/icons";

interface IFileUploadProps<T extends FieldValues>
	extends UseControllerProps<T> {
	label?: string;
	deleteUrl: (fileId: string) => void;
	isMultiple?: boolean;
}

const MiniFileUpload = <T extends FieldValues>({
	name,
	control,
	rules,
	defaultValue,
	label,
	deleteUrl,
	isMultiple,
}: IFileUploadProps<T>) => {
	const { field } = useController({ name, control, rules, defaultValue });

	const fileList: UploadFile[] = useMemo(() => {
		let values: ImageGetResponse[] = [];
		if (isMultiple) {
			values = field.value;
		} else {
			if (field.value && field.value !== "") values.push(field.value);
		}

		return values?.map((file: ImageGetResponse) => ({
			uid: file._id,
			name: file.name,
			status: "done",
			url: file.url,
			response: { data: file },
		}));
	}, [isMultiple, field.value]);

	const props: UploadProps = {
		multiple: false,
		action: import.meta.env.VITE_BASE_URL + "/file/upload",
		withCredentials: true,
		accept: ".jpeg,.png",
		beforeUpload(file) {
			if (file.type !== "image/jpeg" && file.type !== "image/png") {
				message.error("Only jpeg and png files are allowed");
				return Upload.LIST_IGNORE;
			}
		},

		onChange(info) {
			const { status } = info.file;

			if (status === "done") {
				if (!isMultiple) {
					field.onChange(info.file.response.data);
					return;
				} else {
					field.onChange([...(field.value ?? []), info.file.response.data]);
				}

				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		listType: "text",
		onRemove(file) {
			if (file.status === "error") {
				return;
			}

			if (isMultiple) {
				field.onChange(
					field.value?.filter((f: string) => f !== file.response.data.filename)
				);
			} else {
				field.onChange("");
			}

			deleteUrl(file.response.data.fileId);
		},
		onDrop() {
			// console.info("Dropped files", e.dataTransfer.files);
		},

		defaultFileList: fileList?.length ? fileList : undefined,
	};

	return (
		<Form.Item label={label} required={!!rules?.required}>
			<Upload {...props} className="flex items-center gap-4 w-full">
				<Button
					type="primary"
					icon={<UploadOutlined />}
					className="h-10 w-full">
					Upload
				</Button>
			</Upload>
		</Form.Item>
	);
};

export default MiniFileUpload;
