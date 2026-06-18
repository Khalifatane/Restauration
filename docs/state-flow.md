SANITY -> UI -> CART -> CHECKOUT -> PAYTECH -> WHATSAPP

1. SANITY -> UI
   Input: Product ID/Slug
   Output: Typed Product object
   Contract: Product { id, name, price, images, variants }

2. UI -> CART (add to cart)
   Implementation: src/ui/components/pdp/variant-section-dynamic.tsx
   GraphQL operation: src/graphql/CheckoutAddLine.graphql
   Checkout creation/lookup + cookie: src/lib/checkout.ts
   Input used by code: productVariantId (selected variant) and quantity is hardcoded to 1 in the mutation
   Output shape in this project: checkout.lines (Saleor CheckoutLine objects) returned by checkoutLinesAdd

3. CART -> CHECKOUT
   Implementation: src/app/[channel]/(main)/cart/page.tsx
   GraphQL operation: src/graphql/CheckoutFind.graphql
   Checkout lookup + cookie: src/lib/checkout.ts
   Input used by code: checkoutId from cookie, then CheckoutFind query
   Output shape in this project: checkout with lines and totalPrice (Saleor Checkout object), not a CheckoutPayload

4. CHECKOUT -> PAYTECH
   Input: Order { amount, currency, customer }
   Output: PaymentIntent { token, redirectUrl }

5. PAYTECH -> WHATSAPP
   Input: Order { id, items, total }
   Output: MessageSent { status, timestamp }

Note: The exact types CartItem and CheckoutPayload do not exist in this project. The flow uses Saleor GraphQL types (Checkout, CheckoutLine) generated into src/gql/graphql.ts.
