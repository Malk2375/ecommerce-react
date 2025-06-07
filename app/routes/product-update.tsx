import type { Route } from "./+types/home";
import ProductUpdateView from "../pages/ProductUpdateView/ProductUpdateView";
import { ProductProvider } from "~/contexts/product/ProductContext";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Mise à jour d'un produit" },
        { name: "description", content: "Modifier votre produit" },
    ];
}

export default function updateProduct() {
    return (
        <ProductUpdateView />
    );
}
