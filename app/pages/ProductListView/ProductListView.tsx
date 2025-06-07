import { useContext, useState } from "react";
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
    const productsPerPage = 3; // Nombre de produits par page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculer l'index de début et de fin des produits à afficher pour la page actuelle
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Gérer la navigation entre les pages
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <h1>Liste des produits</h1>
            {products.length > 0 ? (
                <div className="product-list">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="product-item">
                            <ProductCardInList product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucun produit disponible</p>
            )}

            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Précédent
                </button>
                <span>
                    Page {currentPage} sur {totalPages}
                </span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Suivant
                </button>
            </div>
        </>
    );
}
