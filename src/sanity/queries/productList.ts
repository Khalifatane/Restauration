export const productListQuery = `
*[_type == "product"] | order(_createdAt desc)[$offset...$limit]{
  _id,
  name,
  "slug": coalesce(slug.current, slug),
  "brand": coalesce(category->name, categories[0]->name),
  "priceAmount": coalesce(price.amount, price, 0),
  "priceCurrency": coalesce(price.currency, "XOF"),
  "thumbnailUrl": coalesce(images[0].asset->url, image[0].asset->url),
  "thumbnailAlt": coalesce(images[0].alt, image[0].alt, name),
  "category": coalesce(category, categories[0])->{
    _id,
    name,
    "slug": slug.current,
  },
  "createdAt": _createdAt
}
`;
