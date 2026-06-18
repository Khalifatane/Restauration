# UI Component Map

| Component | Current Imports | Should Import From |
| --- | --- | --- |
| ProductGrid | `./product-card` | `services/products` |
| ProductCard | `next/link`, `next/image`, `lucide-react`, `@/ui/components/ui/button`, `@/ui/components/ui/badge`, `@/lib/utils` | `services/products` |
| CartDrawer | `next/image`, `next/link`, `lucide-react`, `@/ui/components/ui/button`, `@/ui/components/ui/sheet`, `@/ui/components/cart/cart-context`, `@/services/cart`, `@/lib/utils` | `services/cart` |
| AddToCartButton | `react`, `lucide-react`, `@/ui/components/ui/button`, `@/lib/utils`, `@/services/cart`, `@/ui/components/cart` | `services/cart` |
| CheckoutForm | Not found in `src/ui` | `services/checkout` |
| PaymentMethods | Not found in `src/ui` | `services/paytech` |
