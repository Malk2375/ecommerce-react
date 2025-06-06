import { use, useContext } from "react";
import { useParams } from "react-router";
import { ProductContext } from "~/contexts/product/ProductContext";

export default function ProductDetailView() {
    const context = useContext(ProductContext);

    const { productId } = useParams<{ productId: string }>();
    console.log("ID du produit :", productId);
    console.log("Contexte produit :", context);
    if (!context) {
        return <p>Le contexte produit n'est pas disponible.</p>;
    }
    const { products } = context;
    if (!productId) {
        return <p>Identifiant du produit manquant.</p>;
    }
    const product = products.find(p => p.id === parseInt(productId, 10));
    if (!product) {
        return <p>Produit introuvable.</p>;
    }
    return (
        <div>
            <h1>Détails du produit</h1>
            {product.title}
        </div>
    );
}