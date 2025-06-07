import type { Route } from "./+types/home";
import ProductDetailView from "~/pages/ProductDetailView/ProductDetailView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Produit" },
        { name: "description", content: "Produit" },
    ];
}

export default function detail() {
    return (
        <ProductDetailView />
    )
    ;
}
