import { useContext } from "react";
import { NavLink } from "react-router";
import { ProductContext } from "~/contexts/product/ProductContext";

export default function ProductListView() {
    const context = useContext(ProductContext);

    if (!context) {
        return <p>Le contexte produit n'est pas disponible.</p>;
    }

    const { products } = context;

    return (
        <>
            <h1>Liste des produits</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <NavLink to={`/products/${product.id}`}>{product.title}</NavLink>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun produit disponible</p>
            )}
        </>
    );
}