import type { Route } from "./+types/home";
import ProductDetailView from "~/pages/ProductDetailView/ProductDetailView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Route d'un seul produit" },
        { name: "description", content: "Bienvenu a la page d'un seul produit" },
    ];
}

export default function detail() {
    return (
        <ProductDetailView />
    )
    ;
}
