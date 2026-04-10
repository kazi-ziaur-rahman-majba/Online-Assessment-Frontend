import {
	FaThLarge,
	FaListUl,
	FaCubes,
	FaShoppingCart,
	FaUserShield,
	FaStore,
	FaUser,
	FaComments,
	FaHome,
	FaAddressBook,
	FaExchangeAlt,
	FaLayerGroup,
	FaShareAlt,
	FaBlog,
	FaSearch,
	FaCube,
} from "react-icons/fa";
import { TbTablePlus } from "react-icons/tb";

export const menu = [
	{
		sectionName: "Main",
		items: [
			{
				id: 1,
				name: "Dashboard",
				title: "Dashboard",
				icon: FaThLarge,
				path: "/",
				subItems: [],
			},
		],
	},
	{
		sectionName: "Inventory",
		items: [
			// {
			// 	id: 2,
			// 	name: "Category",
			// 	icon: FaListUl,
			// 	path: "/main-category",
			// 	subItems: [
			// 		{ id: 1, name: "Main Category", path: "/main-category" },
			// 		{ id: 2, name: "First Category", path: "/first-category" },
			// 		{ id: 3, name: "Second Category", path: "/second-category" },
			// 		{ id: 4, name: "Third Category", path: "/third-category" },
			// 	],
			// },
			{
				id: 3,
				name: "Product",
				title: "Product",
				icon: FaCube,
				path: "/products",
				subItems: [],
			},
			{
				id: 4,
				name: "Create Product",
				title: "Create Product",
				icon: TbTablePlus,
				path: "/create-product",
				subItems: [],
			},
		],
	},
	// {
	// 	sectionName: "Order",
	// 	items: [
	// 		{
	// 			id: 5,
	// 			name: "Orders",
	// 			icon: FaShoppingCart,
	// 			path: "/orders",
	// 			subItems: [],
	// 		},
	// 	],
	// },
	{
		sectionName: "People",
		items: [
			{
				id: 6,
				name: "Admins",
				title: "Admins",
				icon: FaUserShield,
				path: "/admins",
				subItems: [],
			},
			// {
			// 	id: 7,
			// 	name: "Vendors",
			// 	icon: FaStore,
			// 	path: "/vendors",
			// 	subItems: [],
			// },
			{
				id: 8,
				name: "Users",
				title: "Users",
				icon: FaUser,
				path: "/users",
				subItems: [],
			},
		],
	},
	// {
	// 	sectionName: "Chat",
	// 	items: [
	// 		{
	// 			id: 1,
	// 			name: "Chat",
	// 			icon: FaComments,
	// 			path: "/chat",
	// 			subItems: [],
	// 		},
	// 	],
	// },
	{
		sectionName: "Settings",
		items: [
			{
				id: 9,
				name: "Home",
				title: "Home",
				icon: FaHome,
				path: "/hero-slider",
				subItems: [
					// { id: 1, name: "Hero Slider", path: "/hero-slider" },
					// { id: 2, name: "Promotions", path: "/promotions" },
					{ id: 3, name: "Page CMS", path: "/home-page-cms" },
				],
			},
			// {
			// 	id: 10,
			// 	name: "Contact",
			// 	icon: FaAddressBook,
			// 	path: "/contact-message",
			// 	subItems: [
			// 		{ id: 1, name: "Contact Message", path: "/contact-message" },
			// 		{ id: 2, name: "Contact Page CMS", path: "/contact-page-cms" },
			// 	],
			// },
			// {
			// 	id: 11,
			// 	name: "Policy",
			// 	icon: FaExchangeAlt,
			// 	path: "/exchange-policy",
			// 	subItems: [
			// 		{ id: 1, name: "Exchange & Return", path: "/exchange-policy" },
			// 		{ id: 2, name: "Privacy", path: "/privacy-policy" },
			// 		{ id: 3, name: "Terms & Conditions", path: "/terms-conditions" },
			// 	],
			// },
			// {
			// 	id: 12,
			// 	name: "Header Footer CMS",
			// 	icon: FaLayerGroup,
			// 	path: "/header-footer-cms",
			// 	subItems: [],
			// },
			// {
			// 	id: 13,
			// 	name: "Shop Page CMS",
			// 	icon: FaStore,
			// 	path: "/shop-page-cms",
			// 	subItems: [],
			// },
			// {
			// 	id: 14,
			// 	name: "Social Links",
			// 	icon: FaShareAlt,
			// 	path: "/social-link",
			// 	subItems: [],
			// },
			// {
			// 	id: 15,
			// 	name: "Blogs",
			// 	icon: FaBlog,
			// 	path: "/blogs",
			// 	subItems: [],
			// },
		],
	},
	// {
	// 	sectionName: "SEO",
	// 	items: [
	// 		{
	// 			id: 1,
	// 			name: "Page Meta",
	// 			icon: FaSearch,
	// 			path: "/page-meta",
	// 			subItems: [],
	// 		},
	// 	],
	// },
];
