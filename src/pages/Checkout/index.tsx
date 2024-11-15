import MobileContent from "../../component/Layout/MobileContent";
import { useForm } from "react-hook-form";
import InputField from "../../component/Input/InputField";
import { Divider, Spin } from "antd";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useApi from "../../api/useApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import QueryKeys from "../../constants/QueryKeys";
import { useSearchParams } from "react-router-dom";
import { REGEX_EMAIL, REGEX_PHONE_NUMBER } from "../../constants";

interface IShippingDetails {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	city: string;
	street: string;
}

const CheckoutPage = () => {
	const [loading, setLoading] = useState(true);
	const { confirmOrder, getProductById } = useApi();
	const { control, handleSubmit } = useForm<IShippingDetails>();
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();

	const queryClient = useQueryClient();

	const isBuyNow = useMemo(() => searchParams.get("buyNow"), [searchParams]);
	const productId = useMemo(
		() => searchParams.get("productId"),
		[searchParams]
	);
	const quantity = useMemo(() => searchParams.get("quantity"), [searchParams]);

	const cart = useSelector((state: RootState) => state.cart.cart);
	const cartItems = useMemo(
		() =>
			cart.map((item) => ({
				id: item.productId,
				quantity: item.quantity,
				price: item.price,
				discountedPrice: item.discountedPrice,
			})),
		[cart]
	);

	const formatData = (data: IShippingDetails) => {
		return {
			...data,
			products: isBuyNow
				? [{ product: productId!, quantity: quantity ? +quantity : 1 }]
				: cartItems.map((item) => ({
						product: item.id,
						quantity: item.quantity,
				  })),
		};
	};

	const { data: productData } = useQuery({
		queryKey: [QueryKeys.SingleProduct, productId],
		queryFn: () => getProductById(productId!),
		enabled: !!productId,
	});

	const Checkout = useMutation({
		mutationFn: (data: IShippingDetails) => confirmOrder(formatData(data)),
		onSuccess: (res) => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.SingleProduct] });
			navigate(
				{ pathname: "/orders/success" },
				{
					state: {
						message: "Order placed successfully",
						data: {
							orderId: res.data._id,
							price: subtotal + deliveryCharge - discount,
						},
					},
				}
			);
		},
	});

	const onSubmit = (_data: IShippingDetails) => {
		Checkout.mutate(_data);
	};

	const subtotal = useMemo(() => {
		if (isBuyNow && productData && quantity) {
			const { price } = productData.data;
			return (price ?? 0) * Number(quantity);
		}
		const total = cartItems.reduce((acc, item) => {
			return acc + item.price * item.quantity;
		}, 0);
		return total ?? null;
	}, [cartItems, isBuyNow, productData, quantity]);

	const deliveryCharge = useMemo(() => {
		if (isBuyNow && quantity) {
			return Number(quantity) >= 5 ? 0 : 100;
		}
		const totalQuantity = cartItems.reduce((acc, item) => {
			return acc + item.quantity;
		}, 0);
		return totalQuantity >= 5 ? 0 : 100;
	}, [cartItems, isBuyNow, quantity]);

	const discount = useMemo(() => {
		if (isBuyNow && productData && quantity) {
			const { price, discountedPrice } = productData.data;
			return ((price ?? 0) - (discountedPrice ?? 0)) * Number(quantity);
		}
		return cartItems.reduce(
			(acc, curr) =>
				acc + (curr.price! - (curr.discountedPrice ?? 0)) * curr.quantity,
			0
		);
	}, [cartItems, isBuyNow, productData, quantity]);

	useEffect(() => {
		if (isBuyNow) {
			return setLoading(false);
		}
		if (!subtotal) {
			navigate("/cart");
		} else {
			setLoading(false);
		}
	}, [subtotal, deliveryCharge, navigate, isBuyNow]);
	return (
		<>
			{loading ? (
				<Spin fullscreen size="large" />
			) : (
				<MobileContent title="Checkout">
					<div className="p-5 w-full">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex justify-between flex-col lg:flex-row flex-wrap lg:gap-5">
							<div className="grid sm:grid-cols-2 gap-5 w-full lg:w-1/2">
								<span className="text-xxs font-semibold w-full sm:col-span-2">
									1. Shipping/Billing Details
								</span>

								<InputField
									control={control}
									name="firstName"
									label="First Name"
									placeholder="First name"
									rules={{ required: "FirstName is required" }}
								/>
								<InputField
									control={control}
									name="lastName"
									label="Last Name"
									placeholder="Last name"
									rules={{ required: "LastName is required" }}
								/>
								<InputField
									control={control}
									name="phone"
									label="Phone"
									placeholder="Phone number"
									rules={{
										required: "Phone is required",
										pattern: {
											value: REGEX_PHONE_NUMBER,
											message: "Invalid Phone Number",
										},
									}}
								/>
								<InputField
									control={control}
									name="email"
									label="Email"
									placeholder="Email"
									rules={{
										pattern: {
											value: REGEX_EMAIL,
											message: "Invalid Email Format",
										},
									}}
								/>
								<InputField
									control={control}
									name="city"
									label="City"
									placeholder="City"
									rules={{ required: "City is required" }}
								/>
								<InputField
									control={control}
									name="street"
									label="Street"
									placeholder="Street"
									rules={{ required: "Street is required" }}
								/>

								{/* <Form.Item
									label="Payment method"
									className="text-xxs lg:text-lg"
									required>
									<Controller
										control={control}
										name="payment"
										rules={{ required: "Payment method is required" }}
										render={({ field }) => (
											<Radio.Group {...field}>
												<Radio value="cod">Cash on delivery</Radio>
												<Radio value="online">Online</Radio>
											</Radio.Group>
										)}
									/>
									<Form.ErrorList
										errors={[formState.errors["payment"]?.message]}
										className="text-[8px] text-red-500"
									/>
								</Form.Item> */}
							</div>
							<div className="flex flex-col py-5 gap-1 lg:w-1/3">
								<span className="text-[8px] text-[#C50202] leading-[10px] mx-auto lg:hidden">
									Delivery within 24 hours of order*
								</span>
								<span className="hidden lg:block text-[32px] leading-[43px] text-red-600 font-normal">
									Order Summary
								</span>
								<div className="flex flex-col gap-2.5">
									<div className="flex w-full justify-between items-center">
										<h3 className="text-[10px] font-semibold leading-3 lg:text-lg lg:font-normal">
											Item Subtotal:
										</h3>
										<div className="flex justify-between items-center">
											<p className="text-[10px] font-semibold lg:text-lg lg:font-normal">
												Rs {subtotal}
											</p>
										</div>
									</div>
									<div className="flex w-full justify-between items-center">
										<h3 className="text-[10px] font-semibold leading-3 lg:text-lg">
											Discount
										</h3>
										<div className="flex justify-between items-center">
											<p className="text-[10px] font-semibold lg:text-lg">
												Rs {discount}
											</p>
										</div>
									</div>
									<div className="flex w-full justify-between items-center">
										<h3 className="text-[10px] font-semibold leading-3 lg:text-lg lg:font-normal">
											DeliveryCharge
										</h3>
										<div className="flex justify-between items-center">
											<p className="text-[10px] font-semibold lg:text-lg lg:font-normal">
												Rs {deliveryCharge}
											</p>
										</div>
									</div>

									<Divider className="lg:hidden" />
									<div className="flex w-full justify-between items-center lg:mt-2">
										<h3 className="text-[10px] font-bold leading-3 lg:text-lg">
											Item Total:
										</h3>
										<div className="flex justify-between items-center">
											<p className="text-[10px] font-bold lg:text-lg">
												Rs {subtotal - discount + deliveryCharge}
											</p>
										</div>
									</div>

									<Divider />

									<p className="text-red-500">
										<strong>Note: </strong> Item will be delivered within 6
										hours
									</p>
								</div>
							</div>
							<button
								className="bg-[#C50202] text-white py-1 lg:py-2 rounded w-full text-[10px] font-bold lg:w-1/2 text-sm"
								type="submit">
								Go To Payment
							</button>
						</form>
					</div>
				</MobileContent>
			)}
		</>
	);
};

export default CheckoutPage;
