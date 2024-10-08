import { useFieldArray, useForm } from "react-hook-form";
import FileUpload from "../../component/Input/FileUpload";
import useApi from "../../api/useApi";
import InputField from "../../component/Input/InputField";
import { Button, Spin } from "antd";
import { useEffect } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import QueryKeys from "../../constants/QueryKeys";
import { useNavigate } from "react-router";

interface LandingPageData {
	images: { _id: string }[];
	banner: { label: string }[];
}
const AddHomepageData = () => {
	const {
		deleteImage,
		getLandingPageData,
		createLandingPageData,
		updateLandingPageData,
	} = useApi();
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<LandingPageData>();

	const queryClient = new QueryClient();
	const {
		append: appendBanner,
		fields: banners,
		remove,
	} = useFieldArray({
		control,
		name: "banner",
		rules: { required: "Add At least one banner" },
	});

	function addBanner() {
		appendBanner({ label: "" });
	}
	function deleteBanner(index: number) {
		remove(index);
	}

	function formatData(data: LandingPageData) {
		return {
			...data,
			banner: data.banner.map((banner) => banner.label),
			images: data.images.map((image) => image._id),
		};
	}

	const { data: apiData, isLoading } = useQuery({
		queryKey: [QueryKeys.LandingPage],
		queryFn: getLandingPageData,
	});

	const CreateLandingPage = useMutation({
		mutationFn: (data: LandingPageData) =>
			createLandingPageData(formatData(data)),
		onSuccess: () => {
			navigate("/");
			queryClient.invalidateQueries({ queryKey: [QueryKeys.LandingPage] });
		},
	});
	const UpdateLandingPage = useMutation({
		mutationFn: (data: LandingPageData) =>
			updateLandingPageData(formatData(data)),
		onSuccess: () => {
			navigate("/");
			queryClient.invalidateQueries({ queryKey: [QueryKeys.LandingPage] });
		},
	});

	const onSubmit = (data: LandingPageData) => {
		if (apiData?.data && apiData.data.length) {
			UpdateLandingPage.mutate(data);
			return;
		}
		CreateLandingPage.mutate(data);
	};

	useEffect(() => {
		if (isLoading) return;

		if (watch(`banner`)?.length) return;

		if (apiData?.data) {
			apiData.data?.[0]?.banner?.forEach((banner) => {
				appendBanner({ label: banner });
			});
			setValue("images", apiData.data[0]?.images);
		} else {
			appendBanner({ label: "" });
		}
	}, [apiData, appendBanner, isLoading, setValue, watch]);

	if (isLoading) return <Spin fullscreen />;

	if (apiData?.data[0] && !watch("images")?.length) return <Spin fullscreen />;
	return (
		<div className="p-10">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-4">
						<h1 className="text-2xl font-bold">Upload Landing Image</h1>
						<FileUpload
							control={control}
							name="images"
							isMultiple
							rules={{ required: "Image is required" }}
							deleteUrl={(fileId: string) => deleteImage(fileId)}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-bold">Upload Banner</h1>
					{banners.map((banner, index) => (
						<div className="flex gap-4">
							<InputField<LandingPageData>
								key={banner.id}
								control={control}
								name={`banner.${index}.label`}
								placeholder="Banner Label"
							/>
							<Button
								type="primary"
								danger
								onClick={() => deleteBanner(index)}
								className="h-10">
								Delete
							</Button>
						</div>
					))}
					{errors.banner && (
						<p className="text-red-500 text-xs">
							{errors.banner?.root?.message ?? "error"}
						</p>
					)}
					<Button type="default" onClick={addBanner} className="w-fit">
						Add
					</Button>
				</div>

				<Button type="primary" htmlType="submit" className="w-full mt-10">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default AddHomepageData;
