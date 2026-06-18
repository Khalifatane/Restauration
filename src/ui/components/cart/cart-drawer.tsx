"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, RotateCcw, Truck } from "lucide-react";
import { Button } from "@/ui/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetCloseButton } from "@/ui/components/ui/sheet";
import { useCart } from "./cart-context";
import { useCartService } from "@/lib/cart/cart-service";
import { formatMoney } from "@/lib/utils";

export function CartDrawer() {
	const { isOpen, closeCart } = useCart();
	const { state, totals, updateQuantity, removeItem } = useCartService();

	const subtotal = totals.subtotal;
	const currency = totals.currency ?? "XOF";

	const freeShippingThreshold = 100;

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
			<SheetContent side="right" className="flex flex-col p-0">
				<SheetHeader className="justify-between border-b border-border px-6 py-4">
					<div className="flex items-center gap-3">
						<ShoppingBag className="h-5 w-5" />
						<SheetTitle>Votre panier</SheetTitle>
					</div>
					<SheetCloseButton className="static" />
				</SheetHeader>

				<div className="flex-1 overflow-y-auto">
					{state.items.length === 0 ? (
						<div className="flex h-full flex-col items-center justify-center px-6 text-center">
							<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
								<ShoppingBag className="h-8 w-8 text-muted-foreground" />
							</div>
							<h3 className="mb-2 text-lg font-medium">Votre panier est vide</h3>
							<p className="mb-6 text-sm text-muted-foreground">
								Il semble que vous n&apos;ayez encore rien ajouté à votre panier.
							</p>
							<Link
								href="/products"
								onClick={closeCart}
								className="hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors"
							>
								Commencer les achats
							</Link>
						</div>
					) : (
						<ul className="divide-y divide-border">
							{state.items.map((item) => (
								<li key={`${item.productId}-${item.variantId ?? "base"}`} className="px-6 py-4">
									<div className="flex gap-4">
										<Link
											href={item.slug ? `/products/${item.slug}` : "/products"}
											onClick={closeCart}
											className="group relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary"
										>
											{item.image ? (
												<Image
													src={item.image}
													alt={item.name}
													fill
													className="object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											) : (
												<div className="h-full w-full bg-muted" aria-hidden="true" />
											)}
										</Link>

										<div className="min-w-0 flex-1">
											<div className="flex items-start justify-between gap-2">
												<div>
													<Link
														href={item.slug ? `/products/${item.slug}` : "/products"}
														onClick={closeCart}
														className="line-clamp-1 text-sm font-medium hover:underline"
													>
														{item.name}
													</Link>
												</div>
												<Button
													variant="ghost"
													size="icon"
													className="-mr-2 -mt-1 h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
													onClick={() => {
														if (window.confirm("Supprimer cet article du panier ?")) {
															removeItem(item.productId, item.variantId);
														}
													}}
												>
													<Trash2 className="h-4 w-4" />
													<span className="sr-only">Supprimer {item.name}</span>
												</Button>
											</div>

											<div className="mt-3 flex items-center justify-between">
												<div className="flex items-center rounded-lg border border-border">
													<button
														type="button"
														onClick={() =>
															updateQuantity(item.productId, item.variantId, Math.max(1, item.quantity - 1))
														}
														disabled={item.quantity <= 1}
														className="p-2 transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
													>
														<Minus className="h-3 w-3" />
														<span className="sr-only">Diminuer la quantité</span>
													</button>
													<span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
													<button
														type="button"
														onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
														className="p-2 transition-colors hover:bg-secondary"
													>
														<Plus className="h-3 w-3" />
														<span className="sr-only">Augmenter la quantité</span>
													</button>
												</div>

												<div className="text-right">
													<span className="text-sm font-medium">
														{formatMoney(item.price * item.quantity, item.currency ?? currency)}
													</span>
												</div>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>

				{state.items.length > 0 && (
					<div className="border-t border-border bg-background">
						<div className="space-y-2 px-6 py-4">
							<div className="flex items-center justify-between text-sm">
								<span className="text-muted-foreground">Sous-total</span>
								<span>{formatMoney(subtotal, currency)}</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-muted-foreground">Livraison</span>
								<span>{subtotal >= freeShippingThreshold ? "Gratuit" : "Calculé à la commande"}</span>
							</div>
							<div className="flex items-center justify-between border-t border-border pt-2 text-base font-semibold">
								<span>Total</span>
								<span>{formatMoney(subtotal, currency)}</span>
							</div>
						</div>

						<div className="space-y-3 px-6 pb-6">
							<Link
								href="/checkout"
								onClick={closeCart}
								className="hover:bg-primary/90 group inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary text-base font-medium text-primary-foreground transition-colors"
							>
								<span>Paiement</span>
								<ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
							</Link>
							<Link
								href="/products"
								onClick={closeCart}
								className="inline-flex h-12 w-full items-center justify-center rounded-md border border-border bg-transparent text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
							>
								Continuer vos achats
							</Link>
						</div>

						<div className="flex items-center justify-center gap-6 border-t border-border px-6 pb-4 pt-4 text-xs text-muted-foreground">
							<span className="flex items-center gap-1.5">
								<Truck className="h-4 w-4" />
								Livraison gratuite à partir de {formatMoney(freeShippingThreshold, currency)}
							</span>
							<span className="flex items-center gap-1.5">
								<RotateCcw className="h-4 w-4" />
								Retours sous 30 jours
							</span>
						</div>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
