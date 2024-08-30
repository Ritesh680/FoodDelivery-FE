import {
	FacebookIcon,
	InstagramIcon,
	LocationIcon,
	MailIcon,
	PhoneIcon,
	WhatsAppIcon,
} from "../../assets/icons";

const Footer = () => {
	const FooterContentLinks = [
		{
			title: "Quick Links",
			lists: [
				{ label: "All Categories", href: "/categories" },
				{ label: "Chicken", href: "/chicken" },
				{ label: "Mutton", href: "/mutton" },
				{ label: "Buff", href: "/buff" },
				{ label: "Pork", href: "/pork" },
				{ label: "Sea Foods", href: "/seafoods" },
				{ label: "Frozen Foods", href: "/frozenfoods" },
			],
		},
		{
			title: "Corporate",
			lists: [
				{ label: "About Us", href: "/aboutus" },
				{ label: "Restaurant Partners", href: "/restaurantpartners" },
				{ label: "Wholesale Inquiries", href: "/wholesaleinquiries" },
				{ label: "Affiliated Program", href: "/affialiated" },
				{ label: "Careers", href: "/careers" },
				{ label: "Accessibility Statement", href: "/accessibilitystatement" },
			],
		},
		{
			title: "Customer's Service",
			lists: [
				{ label: "FAQ's", href: "/faqs" },
				{ label: "Shipping & Delivery", href: "/shippingdelivery" },
				{ label: "Order Tracking", href: "/ordertracking" },
				{ label: "Refund and Return policy", href: "/refundandreturnpolicy" },
				{ label: "Guarantee", href: "/guarantee" },
				{ label: "Contact Us", href: "/contactus" },
			],
		},
	];
	return (
		<footer className="bg-black text-white hidden md:block">
			<div className="container mx-auto px-4 pt-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pb-5">
					<div>
						<h3 className="text-3xl md:text-lg font-semibold text-center md:text-left">
							Reach Us
						</h3>

						<ul className="mt-2">
							<li className="text-center md:text-left">
								<a
									href="tel:9800000000"
									className="flex gap-2 items-center justify-center md:justify-start text-xs">
									<PhoneIcon /> 9800000000, 071-567894
								</a>
							</li>
							<li className="text-center md:text-left">
								<a
									href="maps:Putalibazar, kathmandu, Nepal"
									className="flex gap-2 items-center justify-center md:justify-start mt-2 text-xs">
									<LocationIcon /> Putalibazar, kathmandu, Nepal
								</a>
							</li>
							<li className="text-center md:text-left">
								<a
									href="mailto:chickenNepal@gmail.com"
									className="flex gap-2 items-center justify-center md:justify-start mt-2 text-xs">
									<MailIcon /> chickenNepal@gmail.com
								</a>
							</li>

							<li className="text-center md:text-left">
								<div className="flex items-center gap-4 mt-2 justify-center md:justify-start">
									<a
										href="https://www.facebook.com"
										target="_blank"
										rel="noreferrer">
										<FacebookIcon className="text-2xl" />
									</a>
									<a
										href="https://www.instagram.com"
										target="_blank"
										rel="noreferrer">
										<InstagramIcon className="text-2xl" />
									</a>
									<a
										href="https://web.whatsapp.com"
										target="_blank"
										rel="noreferrer">
										<WhatsAppIcon className="text-2xl" />
									</a>
								</div>
							</li>
						</ul>

						<div className="mt-2 mb-5 md:mb-0 md:mt-5">
							<h4 className="text-2xl md:text-lg font-semibold text-center md:text-left">
								Operating Hours
							</h4>
							<p className="text-center md:text-left text-xs">
								Everyday: 8am - 9pm
							</p>
						</div>
					</div>
					{FooterContentLinks.map((content, index) => (
						<div key={content.title + index}>
							<h3 className="text-3xl md:text-lg font-semibold text-center md:text-left">
								{content.title}
							</h3>
							<ul className="mt-2">
								{content.lists.map((list) => (
									<li key={list.href} className="text-center md:text-left">
										<a href={list.href} className="text-xs">
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
