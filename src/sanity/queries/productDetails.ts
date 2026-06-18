export const productDetailsQuery = `
*[_type == "product" && (slug.current == $slug || slug == $slug)][0]{
  _id,
  name,
  "slug": coalesce(slug.current, slug),
  description,
  "price": {
    "amount": coalesce(price.amount, price, 0),
    "currency": coalesce(price.currency, "XOF")
  },
  "images": coalesce(images, image, [])[]{
    "url": asset->url,
    "alt": alt
  },
  "category": coalesce(category, categories[0])->{
    _id,
    name,
    "slug": slug.current,
  },
  variants[]->{
    _id,
    name,
    sku,
    price,
    attributes
  }
}
`;
