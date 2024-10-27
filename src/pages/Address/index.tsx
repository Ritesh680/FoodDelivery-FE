import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal } from "antd";
import InputField from "../../component/Input/InputField";
import { useForm } from "react-hook-form";
import Checkbox from "../../component/Checkbox";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useApi, { IAddress } from "../../api/useApi";
import QueryKeys from "../../constants/QueryKeys";

interface IModal1 {
	type: "create";
	show: boolean;
}
interface IModal2 {
	type: "edit";
	show: boolean;
	editId: string;
}

interface IDeleteModal {
	show: boolean;
	value: string;
}

type IModale = IModal1 | IModal2;

interface ICreateAddress {
	street: string;
	address: string;
	city: string;
	state: string;
	isDefault: boolean;
}

const Address = () => {
	const { control, handleSubmit, reset } = useForm<ICreateAddress>();
	const [showModal, setShowModal] = useState<IModale>();
	const [showDeleteModal, setShowDeleteModal] = useState<IDeleteModal>();
	const queryClient = useQueryClient();

	const {
		createAddress,
		getAllAddress,
		setDefaultAddress,
		updateAddress,
		deleteAddress,
	} = useApi();

	const { data } = useQuery({
		queryKey: [QueryKeys.Address],
		queryFn: getAllAddress,
	});

	const { mutate: mutateDefaultAddress } = useMutation({
		mutationFn: (id: string) => setDefaultAddress(id),
		onSuccess: (_data, variables) => {
			queryClient.setQueryData<ApiResponse<IAddress[]>>(
				[QueryKeys.Address],
				(oldData) => {
					const copyArr = { ...oldData };
					copyArr.data = copyArr.data?.map((data) => {
						if (data?._id === variables) {
							return { ...data, defaultAddress: true };
						}
						return { ...data, defaultAddress: false };
					});
					return { ...copyArr, success: true };
				}
			);
		},
	});

	const { mutate, isLoading: isMutating } = useMutation({
		mutationFn: (data: ICreateAddress) => {
			if (showModal?.type === "edit")
				return updateAddress(showModal.editId, data);
			return createAddress(data);
		},
		onSuccess: (data, variables) => {
			queryClient.setQueryData<ApiResponse<IAddress[]>>(
				[QueryKeys.Address],
				(oldData) => {
					const copyArr = { ...oldData };
					if (showModal?.type === "create") {
						copyArr.data?.push(_data);
					} else {
						copyArr.data = copyArr.data?.map((d) => {
							const { address, city, isDefault, state, street } = variables;
							if (d._id === showModal?.editId) {
								return {
									...d,
									address,
									city,
									state,
									street,
									defaultAddress: isDefault,
								};
							}
							return d;
						});
					}

					return copyArr;
				}
			);
			setShowModal(undefined);
		},
	});

	const { mutate: deleteThisAddress, isLoading: isDeleting } = useMutation({
		mutationFn: () => deleteAddress(showDeleteModal?.value ?? ""),
		onSuccess: () => {
			queryClient.setQueryData<ApiResponse<IAddress[]>>(
				[QueryKeys.Address],
				(oldData) => {
					const copyArr = { ...oldData };
					copyArr.data = copyArr.data?.filter((data) => {
						return data._id !== showDeleteModal?.value;
					});
					return { ...copyArr, success: true };
				}
			);

			setShowDeleteModal(undefined);
		},
	});

	const getFullAddress = (address: IAddress) => {
		if (!address) return "";
		return `${address.address}, ${address.street}, ${address.city}, ${address.state}, Nepal`;
	};

	function showEditModal(id: string) {
		const editDefaultData = data?.data.find((data) => data._id === id);
		if (!editDefaultData) return;
		reset({
			address: editDefaultData.address,
			city: editDefaultData.city,
			isDefault: editDefaultData.defaultAddress,
			state: editDefaultData.state,
			street: editDefaultData.street,
		});
		setShowModal({ show: true, type: "edit", editId: id });
	}

	function onSubmit(data: ICreateAddress) {
		mutate(data);
	}
	return (
		<div className="px-20 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
			<Modal
				open={showModal?.show}
				okButtonProps={{ loading: isMutating }}
				onOk={handleSubmit(onSubmit)}
				onCancel={() => setShowModal(undefined)}>
				<div className="flex flex-col gap-6">
					<h2 className="font-semibold text-lg">Add new address</h2>
					<form className="flex flex-col">
						<InputField
							control={control}
							name="address"
							placeholder="Address"
							rules={{ required: true }}
							shouldUnregister
						/>
						<InputField
							control={control}
							name="city"
							placeholder="City"
							rules={{ required: true }}
							shouldUnregister
						/>
						<InputField
							control={control}
							name="state"
							placeholder="State"
							rules={{ required: true }}
							shouldUnregister
						/>
						<InputField
							control={control}
							name="street"
							placeholder="Street"
							rules={{ required: true }}
							shouldUnregister
						/>

						<Checkbox
							control={control}
							name="isDefault"
							label="Set Default Address"
							shouldUnregister
						/>
					</form>
				</div>
			</Modal>

			<Modal
				open={showDeleteModal?.show}
				title="Delete this address"
				onOk={() => deleteThisAddress()}
				confirmLoading={isDeleting}>
				<div className="flex flex-col">
					<span>This action cannot be undone</span>
				</div>
			</Modal>

			{data?.data?.map((d) => (
				<Card key={d._id} className="px-4 py-2 min-h-40">
					<div className="flex flex-col gap-4">
						<div className="flex justify-between items-center">
							<span className="font-bold text-lg">{d.street}</span>
							<Button
								type="link"
								className="p-0"
								onClick={() => {
									showEditModal(d._id);
								}}>
								Edit
							</Button>
						</div>
						<p>{getFullAddress(d)}</p>

						<Button
							type="default"
							className="bg-blue-400 text-white"
							onClick={() => mutateDefaultAddress(d._id)}
							disabled={d.defaultAddress}>
							{d.defaultAddress ? "Default" : "Set as default"}
						</Button>
						<Button
							type="primary"
							value={d._id}
							onClick={() => setShowDeleteModal({ value: d._id, show: true })}>
							Delete
						</Button>
					</div>
				</Card>
			))}
			<label htmlFor="addNewAddressButton">
				<Card className="px-4 py-2 h-[100%] flex flex-col items-center justify-center cursor-pointer min-h-40">
					<button
						className="flex flex-col items-center"
						id="addNewAddressButton"
						onClick={() => setShowModal({ type: "create", show: true })}>
						<PlusOutlined />
						<span>Add New Address</span>
					</button>
				</Card>
			</label>
		</div>
	);
};

export default Address;
