import type { Route } from "./+types/home";
import CartView from "~/pages/CartView/CartView";
import { CartProvider } from "~/contexts/cart/CartContext";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Votre panier" },
        { name: "description", content: "Bienvenu au catalogue des produit" },
    ];
}

export default function Cart() {
    return (
        <CartView />
    )
    ;
}
