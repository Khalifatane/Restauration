import { NavLink } from "./nav-link";

export const NavLinks = async () => {
	return (
		<>
			<NavLink href="/">Accueil</NavLink>
			<NavLink href="/products">Produits</NavLink>
			<NavLink href="/search">Recherche</NavLink>
			<NavLink href="/cart">Panier</NavLink>
		</>
	);
};
