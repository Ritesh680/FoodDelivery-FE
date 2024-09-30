import { useMutation, useQuery, useQueryClient } from "react-query";
import { useFieldArray, useForm } from "react-hook-form";
import InputField from "../../component/Input/InputField";
import FileUpload from "../../component/Input/FileUpload";
import { Button, Form, Spin, message } from "antd";
import useApi from "../../api/useApi";
import { ICategory, ICreateCategory } from "../../@types/interface";
import { useNavigate, useParams } from "react-router";
import QueryKeys from "../../constants/QueryKeys";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import MiniFileUpload from "../../component/Input/MiniFileUpload";

const CreateOrEditCategory = () => {
	const {
		createCategory,
		editCategory,
		getCategoryById,
		deleteCategoryImage,
		deleteImage,
	} = useApi();
	const { id } = useParams();
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const { control, handleSubmit, reset } = useForm<ICreateCategory>({
		defaultValues: {
			name: "",
			image: "",
			subCategories: [{ name: "", image: "" }],
		},
	});

	const { append, remove, fields } = useFieldArray({
		control,
		name: "subCategories",
	});

	const filteredData: (data: ICreateCategory) => ICreateCategory = (
		data: ICreateCategory
	) => {
		return {
			name: data.name,
			image: data.images?.fileId ?? "",
			subCategories: data.subCategories?.map((sub) => ({
				name: sub.name,
				image: sub.images?.fileId ?? "",
			})),
		};
	};

	const { mutate: createNewProduct, isLoading: isProductCreating } =
		useMutation({
			mutationFn: (data: ICreateCategory) => createCategory(data),
			onSuccess: () => {
				message.success("Category created successfully");
				navigate("/admin/categories");
				queryClient.invalidateQueries({
					queryKey: [QueryKeys.Categories],
				});
				queryClient.invalidateQueries({
					queryKey: [QueryKeys.SingleCategory],
				});
			},
		});

	const { mutate: editCurrentCategory, isLoading: isProductEditing } =
		useMutation({
			mutationFn: (data: ICreateCategory) => editCategory(id ?? "", data),
			onSuccess: () => {
				message.success("Category updated");
				navigate("/admin/categories");
				queryClient.invalidateQueries({
					queryKey: [QueryKeys.Categories],
				});
				queryClient.invalidateQueries({
					queryKey: [QueryKeys.SingleCategory],
				});
			},
		});

	const { data, isLoading } = useQuery({
		queryKey: [QueryKeys.SingleCategory, id],
		queryFn: () => getCategoryById(id!),
		enabled: !!id,
		onSuccess: (data) => {
			resetData(data);
		},
	});

	const onSubmit = (data: ICreateCategory) => {
		if (id) {
			editCurrentCategory(filteredData(data));
			return;
		}
		createNewProduct(filteredData(data));
	};

	function resetData(data: ApiResponse<ICategory>) {
		reset({
			name: data.data.name,
			images: data.data.image,
			subCategories: data.data.subcategories?.length
				? data.data.subcategories?.map((sub) => ({
						name: sub.name,
						images: sub.image,
				  }))
				: [{ name: "", image: "" }],
		});
	}

	useEffect(() => {
		if (data) {
			resetData(data);
		}
	}, [data]);

	return (
		<>
			{isLoading ? (
				<div className="min-h-screen">
					<Spin fullscreen />
				</div>
			) : (
				<div className="flex flex-col mb-20 p-10">
					<form className="" onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col sm:gap-10">
							<InputField
								control={control}
								name="name"
								label="Category Name"
								rules={{ required: "Name is required" }}
								placeholder="Enter name of category"
							/>
							<FileUpload
								isMultiple={false}
								control={control}
								name="images"
								rules={{ required: "This is required" }}
								deleteUrl={(fileId: string) =>
									id ? deleteCategoryImage(id, fileId) : deleteImage(fileId)
								}
							/>

							<div>
								<h4>Add SubCategories</h4>
								{fields.map((field, index) => (
									<div
										key={field.id}
										className="grid grid-flow-col gap-5 items-end">
										<InputField
											control={control}
											name={`subCategories.${index}.name`}
											rules={{ required: "Name is required" }}
											placeholder="Enter name of subcategory"
											extraStyles="w-1/3"
										/>
										<div className="w-1/3">
											<MiniFileUpload
												control={control}
												name={`subCategories.${index}.images`}
												deleteUrl={(fileId: string) =>
													id
														? deleteCategoryImage(id, fileId)
														: deleteImage(fileId)
												}
											/>
										</div>
										<Form.Item>
											<Button
												htmlType="button"
												onClick={() => remove(index)}
												className="bg-red-500 text-white flex items-center justify-center h-10">
												<DeleteOutlined className="text-base" />
											</Button>
										</Form.Item>
									</div>
								))}

								<Form.Item>
									<Button
										onClick={() =>
											append({
												name: "",
												image: "",
											})
										}
										className="bg-green-500 text-white w-fit">
										Add More
									</Button>
								</Form.Item>
							</div>
						</div>

						<Button
							htmlType="submit"
							loading={isProductCreating || isProductEditing}
							className="w-full py-5 my-5 bg-blue-500 text-white hover:opacity-90">
							Submit
						</Button>
					</form>
				</div>
			)}
		</>
	);
};

export default CreateOrEditCategory;
