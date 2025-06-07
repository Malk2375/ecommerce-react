import { useContext, useState, useEffect } from "react";
import { ProductContext } from "~/contexts/product/ProductContext";
import { useParams, useNavigate } from "react-router";  // useNavigate pour la redirection
import type { Product } from "~/contexts/product/ProductContext";
import "./ProductUpdateView.css";  // Import du fichier CSS pour le style
export default function ProductUpdateView() {
    const context = useContext(ProductContext);
    const { productId } = useParams(); // Récupère l'ID du produit depuis l'URL
    const navigate = useNavigate(); // Pour rediriger après la mise à jour

    // Si le contexte n'est pas disponible, on affiche un message d'erreur
    if (!context) {
        return <p className="product-update-error-message">Le contexte liste produit n'est pas disponible.</p>;
    }

    const { products, updateProduct, getProductById } = context;
    const [product, setProduct] = useState<Product | null>(null); // Un état local pour le produit

    useEffect(() => {
        if (productId) {
            const foundProduct = getProductById(Number(productId)); // Utilise la fonction getProductById
            setProduct(foundProduct || null);
        }
    }, [products, productId, getProductById]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (product) {
            await updateProduct(product.id, product);
            navigate(`/products/${product.id}`);
        }
    };

    // Si le produit n'existe pas, on affiche un message
    if (!product) {
        return <p className="product-update-error-message">Produit non trouvé.</p>;
    }

    return (
        <div className="product-update-container">
            <h1 className="product-update-title">Edition du produit : {product.title}</h1>
            <form onSubmit={handleUpdate} className="product-update-form">
                <div className="product-update-form-group">
                    <label className="product-update-form-label">Titre :</label>
                    <input 
                        className="product-update-form-input"
                        type="text" 
                        value={product.title} 
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    />
                </div>
                <div className="product-update-form-group">
                    <label className="product-update-form-label">Description :</label>
                    <textarea 
                        className="product-update-form-textarea"
                        value={product.description} 
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />
                </div>
                <div className="product-update-form-group">
                    <label className="product-update-form-label">Prix :</label>
                    <input 
                        className="product-update-form-input"
                        type="number" 
                        value={product.price} 
                        onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                    />
                </div>
                <button type="submit" className="product-update-form-button">Mettre à jour</button>
            </form>
        </div>
    );
}
