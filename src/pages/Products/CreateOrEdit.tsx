import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import InputField from "../../component/Input/InputField";
import TextArea from "../../component/Input/TextArea";
import SelectField from "../../component/Input/Select";
import FileUpload from "../../component/Input/FileUpload";
import { Button, Spin } from "antd";
import useApi from "../../api/useApi";
import { ICreateProduct, IProduct } from "../../@types/interface";
import { useParams } from "react-router";
import { useMemo } from "react";

const CreateOrEditProduct = () => {
	const {
		createProduct,
		getProductById,
		editProduct,
		deleteProductImage,
		deleteImage,
		getCategories,
	} = useApi();
	const { id } = useParams();

	const { control, handleSubmit, reset } = useForm<ICreateProduct>({
		defaultValues: {
			name: "",
			price: null,
			description: "",
			category: "",
			image: [],
			discountedPrice: null,
			quantity: 0,
		},
	});

	const formattedData: (data: ICreateProduct) => ICreateProduct = (
		data: ICreateProduct
	) => {
		return {
			name: data.name,
			price: data.price ? parseFloat(data.price.toString()) : null,
			description: data.description,
			category: data.category,
			image: data.image,
			discountedPrice: data.discountedPrice
				? parseFloat(data.discountedPrice.toString())
				: null,
			quantity: data.quantity ? parseInt(data.quantity.toString()) : 0,
		};
	};

	const { mutate: createNewProduct, isLoading: isProductCreating } =
		useMutation({
			mutationFn: (data: ICreateProduct) => createProduct(formattedData(data)),
		});

	const { mutate: editCurrentProduct, isLoading: isProductEditing } =
		useMutation({
			mutationFn: (data: ICreateProduct) =>
				editProduct(id ?? "", formattedData(data)),
		});

	const { isLoading } = useQuery({
		queryKey: ["product", id],
		queryFn: () => getProductById(id!),
		enabled: !!id,
		onSuccess: (data) => {
			setDefault(data);
		},
	});

	const Categories = useQuery({
		queryKey: "Categories",
		queryFn: getCategories,
	});

	const loading = useMemo(
		() => Categories.isLoading || isLoading,
		[Categories.isLoading, isLoading]
	);

	const onSubmit = (data: ICreateProduct) => {
		if (id) {
			editCurrentProduct(data);
			return;
		}
		createNewProduct(data);
	};

	function setDefault(data: ApiResponse<IProduct>) {
		reset({
			name: data.data.name,
			price: data.data.price,
			description: data.data.description,
			category: data.data.category,
			image: data.data.image,
			discountedPrice: data.data.discountedPrice,
			quantity: data.data.quantity,
		});
	}

	return (
		<>
			{loading ? (
				<div className="min-h-screen">
					<Spin fullscreen />
				</div>
			) : (
				<form className="mb-20 p-10" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col-reverse sm:flex-row-reverse sm:gap-10">
						<div className="h-full">
							<FileUpload
								isMultiple={true}
								control={control}
								name="image"
								rules={{ required: "This is required" }}
								deleteUrl={(fileId: string) =>
									id ? deleteProductImage(id, fileId) : deleteImage(fileId)
								}
							/>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-x-10">
							<InputField
								control={control}
								name="name"
								label="Name"
								rules={{ required: "Name is required" }}
								placeholder="Enter name of product"
							/>
							<InputField
								control={control}
								name="price"
								label="Price"
								rules={{ required: "Price is required" }}
								type="number"
								placeholder="Enter price of product"
							/>
							<InputField
								control={control}
								name="quantity"
								label="Quantity"
								rules={{
									required: "Quantity is required",
									min: { value: 1, message: "Quantity must be greater than 0" },
								}}
								type="number"
								placeholder="Enter Quantity in stock"
							/>

							<SelectField<ICreateProduct>
								name="category"
								control={control}
								label="Select Category"
								options={
									Categories.data?.data.map((category) => ({
										label: category.name,
										value: category._id,
									})) ?? []
								}
								rules={{ required: "Category is required" }}
							/>
							<div className="sm:col-span-2">
								<TextArea
									control={control}
									label="Description"
									name="description"
									rules={{ required: "Description is required" }}
									placeholder="Enter description of product"
								/>
							</div>
						</div>
					</div>

					<Button
						type="primary"
						htmlType="submit"
						loading={isProductCreating || isProductEditing}
						className="w-full py-5 my-5">
						Submit
					</Button>
				</form>
			)}
		</>
	);
};

export default CreateOrEditProduct;