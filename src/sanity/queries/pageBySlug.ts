export const pageBySlugQuery = `
*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  content
}
`;

