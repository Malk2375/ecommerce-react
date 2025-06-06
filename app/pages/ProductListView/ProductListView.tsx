import { useContext } from "react";
import { ProductContext } from "~/contexts/product/ProductContext";
import ProductCardInList from "~/components/ProductListComponent/ProductListComponent";
import { NavLink } from "react-router";
import "./ProductListView.css";
export default function ProductListView() {
    const context = useContext(ProductContext);
    if (!context) {
        return <p>Le contexte liste produit n'est pas disponible.</p>;
    }

    const { products } = context;

    return (
        <>
        {/* <div className="product-list-header">
            <NavLink to="/" className="product-card-link">
                <button className="btn btn-primary">Retour à l'accueil</button>
            </NavLink>
        </div> */}
        <h1>Liste des produits</h1>
            {products.length > 0 ? (
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product.id} className="product-item">
                            <ProductCardInList product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucun produit disponible</p>
            )}
        </>
    );
}
