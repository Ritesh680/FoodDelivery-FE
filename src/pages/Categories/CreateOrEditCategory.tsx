import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import InputField from "../../component/Input/InputField";
import FileUpload from "../../component/Input/FileUpload";
import { Button, Spin, message } from "antd";
import useApi from "../../api/useApi";
import { ICategory, ICreateCategory } from "../../@types/interface";
import { useNavigate, useParams } from "react-router";
import QueryKeys from "../../constants/QueryKeys";

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
		},
	});

	const filteredData: (data: ICreateCategory) => ICreateCategory = (
		data: ICreateCategory
	) => {
		return {
			name: data.name,
			image: data.images?.fileId ?? "",
		};
	};

	const { mutate: createNewProduct, isLoading: isProductCreating } =
		useMutation({
			mutationFn: (data: ICreateCategory) => createCategory(data),
			onSuccess: () => {
				message.success("Category created successfully");
				navigate("/admin/categories");
				queryClient.invalidateQueries({
					queryKey: [QueryKeys.Categories, QueryKeys.SingleCategory],
				});
			},
		});

	const { mutate: editCurrentCategory, isLoading: isProductEditing } =
		useMutation({
			mutationFn: (data: ICreateCategory) => editCategory(id ?? "", data),
			onSuccess: () => {
				message.success("Category edited");
				navigate("/admin/categories");
				queryClient.invalidateQueries({
					queryKey: [QueryKeys.Categories, QueryKeys.SingleCategory],
				});
			},
		});

	const { isLoading } = useQuery({
		queryKey: [QueryKeys.SingleCategory, id],
		queryFn: () => getCategoryById(id!),
		enabled: !!id,
		onSuccess: (data) => {
			setDefault(data);
		},
	});

	const onSubmit = (data: ICreateCategory) => {
		if (id) {
			editCurrentCategory(filteredData(data));
			return;
		}
		createNewProduct(filteredData(data));
	};

	function setDefault(data: ApiResponse<ICategory>) {
		reset({
			name: data.data.name,
			images: data.data.image?.[0],
		});
	}

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
								label="Name"
								rules={{ required: "Name is required" }}
								placeholder="Enter name of product"
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
