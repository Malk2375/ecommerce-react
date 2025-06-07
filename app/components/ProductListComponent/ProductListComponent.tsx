import { NavLink } from "react-router";
import type { Product } from "~/contexts/product/ProductContext";
import  { AuthContext } from "~/contexts/auth/AuthContext";
import { useContext } from "react";
import "./ProductListComponent.css";

interface ProductCardProps {
    product: Product;
}

const ProductCardInList: React.FC<ProductCardProps> = ({ product }) => {
    const { adminIsLogged } = useContext(AuthContext);

    return (
    <div className="product-card">
        <NavLink to={`/products/${product.id}`} className="product-card-link">
        <img src={product.image} alt={product.title} className="product-card-image" />
        </NavLink>
        <div className="product-card-details">
            <h3 className="product-card-title">{product.title}</h3>
            <p className="product-card-price">{product.price.toFixed(2)} €</p>
            {adminIsLogged ? (
                <>
                    <NavLink to={`/products/update/${product.id}`} className="product-card-link">
                        <button className="product-card-button">Editer</button>
                    </NavLink>
                </>
            ) : null}
        </div>
    </div>
    );
};

export default ProductCardInList;
