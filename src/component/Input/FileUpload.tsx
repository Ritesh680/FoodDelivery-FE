import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Form, message, Upload } from "antd";
import { useMemo } from "react";
import {
	FieldValues,
	useController,
	UseControllerProps,
} from "react-hook-form";

const { Dragger } = Upload;

interface IFileUploadProps<T extends FieldValues>
	extends UseControllerProps<T> {
	label?: string;
	deleteUrl: (fileId: string) => void;
	isMultiple?: boolean;
}

const FileUpload = <T extends FieldValues>({
	name,
	control,
	rules,
	defaultValue,
	label,
	deleteUrl,
	isMultiple,
}: IFileUploadProps<T>) => {
	const {
		field,
		formState: { errors },
	} = useController({ name, control, rules, defaultValue });

	const fileList: UploadFile[] = useMemo(() => {
		let values: string[] = [];
		if (isMultiple) {
			values = field.value;
		} else {
			if (field.value && field.value !== "") values.push(field.value);
		}

		return values?.map((file: string) => ({
			uid: file,
			name: file.split("-")[1],
			status: "done",
			url: import.meta.env.VITE_BASE_URL + "/file/" + file,
			response: { data: { filename: file } },
		}));
	}, [isMultiple, field.value]);

	const props: UploadProps = {
		name: "file",
		multiple: isMultiple,
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
					field.onChange(info.file.response.data.filename);
					return;
				} else {
					field.onChange([...field.value, info.file.response.data.filename]);
				}

				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		maxCount: isMultiple ? 5 : 1,
		listType: "picture",
		onRemove(file) {
			if (file.status === "error") {
				return;
			}

			if (isMultiple) {
				field.onChange(
					field.value.filter((f: string) => f !== file.response.data.filename)
				);
			} else {
				field.onChange("");
			}
			deleteUrl(file.response.data.filename);
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},

		defaultFileList: fileList.length ? fileList : undefined,
	};

	return (
		<Form.Item
			label={label ?? "Upload Images"}
			layout="vertical"
			required={!!rules?.required}>
			<Dragger
				{...props}
				style={{ border: `${errors[name] ? "1px solid red" : ""}` }}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">
					Click or drag file to this area to upload
				</p>
				<p className="ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibited from
					uploading company data or other banned files.
				</p>
			</Dragger>
		</Form.Item>
	);
};

export default FileUpload;
