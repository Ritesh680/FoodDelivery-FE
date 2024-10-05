import {
	FacebookIcon,
	InstagramIcon,
	LocationIcon,
	MailIcon,
	PhoneIcon,
	WhatsAppIcon,
} from "../../assets/icons";
import { ICategory } from "../../@types/interface";

const Footer = ({ categories }: { categories: ICategory[] }) => {
	const FooterContentLinks = [
		{
			title: "Quick Links",
			lists: [{ label: "All Categories", href: "/menu" }].concat(
				categories?.slice(0, 6)?.map((category) => ({
					label: category.name,
					href: `/menu/${category._id}`,
				})) || []
			),
		},

		{
			title: "Customer's Service",
			lists: [
				{ label: "FAQ's", href: "#" },
				{ label: "Shipping & Delivery", href: "#" },
				{ label: "Order Tracking", href: "#" },
				{ label: "Refund and Return policy", href: "#" },
				{ label: "Guarantee", href: "#" },
				{ label: "Contact Us", href: "#" },
			],
		},
	];
	return (
		<footer className="bg-black text-white mb-[66px] sm:mb-0">
			<div className="container mx-auto px-4 pt-10">
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-5">
					<div className="flex flex-col gap-2 sm:gap-4">
						<h3 className="text-xs sm:text-xl font-semibold text-left">
							Reach Us
						</h3>

						<ul className="flex flex-col gap-[2px] sm:gap-2.5">
							<li className="text-left">
								<a
									href="tel:9800000000"
									className="text-[8px] sm:text-sm flex gap-2 items-center leading-[21px]">
									<PhoneIcon /> 9800000000, 071-567894
								</a>
							</li>
							<li className="text-left">
								<a
									href="maps:Putalibazar, kathmandu, Nepal"
									className="flex gap-2 items-center text-[8px] sm:text-sm leading-[21px]">
									<LocationIcon /> Putalibazar, kathmandu, Nepal
								</a>
							</li>
							<li className="text-left">
								<a
									href="mailto:chickenNepal@gmail.com"
									className="flex gap-2 items-center text-[8px] sm:text-sm leading-[21px]">
									<MailIcon /> chickenNepal@gmail.com
								</a>
							</li>

							<li className="text-left">
								<div className="flex items-center gap-4">
									<a
										href="https://www.facebook.com"
										target="_blank"
										rel="noreferrer">
										<FacebookIcon className="text-[20px] sm:text-[26px] hover:scale-105" />
									</a>
									<a
										href="https://web.whatsapp.com"
										target="_blank"
										rel="noreferrer">
										<WhatsAppIcon className="text-[20px] sm:text-[26px] hover:scale-105" />
									</a>
									<a
										href="https://www.instagram.com"
										target="_blank"
										rel="noreferrer">
										<InstagramIcon className="text-[20px] sm:text-[26px] hover:scale-105" />
									</a>
								</div>
							</li>
						</ul>

						<div className="mt-2 mb-5 md:mb-0 md:mt-5 flex flex-col sm:gap-2.5">
							<h4 className="text-xs sm:text-xl font-semibold text-left">
								Operating Hours
							</h4>
							<p className="text-left text-[8px] sm:text-sm">
								Everyday: 8am - 9pm
							</p>
						</div>
					</div>
					{FooterContentLinks.map((content, index) => (
						<div
							key={content.title + index}
							className="flex flex-col gap-2 sm:gap-4">
							<h3 className="text-xs sm:text-xl font-semibold text-left">
								{content.title}
							</h3>
							<ul className="flex flex-col gap-[2px] sm:gap-2.5">
								{content.lists.map((list) => (
									<li key={list.href} className="text-left">
										<a
											href={list.href}
											className="flex text-[8px] sm:text-sm leading-[21px]">
											{list.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<hr />
				<div className="flex justify-center text-xs py-4">
					&copy; 2021 Chicken Delivery Nepal. All Rights Reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
