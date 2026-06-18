export default {
	name: "product",
	title: "Product",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
			},
		},
		{
			name: "price",
			title: "Price",
			type: "object",
			fields: [
				{ name: "amount", title: "Amount", type: "number" },
				{ name: "currency", title: "Currency", type: "string" },
			],
		},
		{
			name: "variants",
			title: "Variants",
			type: "array",
			of: [{ type: "reference", to: [{ type: "productVariant" }] }],
		},
		{
			name: "images",
			title: "Images",
			type: "array",
			of: [{ type: "image" }],
		},
		{
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: [{ type: "category" }] }],
		},
	],
};

