import { NavLink } from "react-router";
import type { Product } from "~/contexts/product/ProductContext";
import "./ProductListComponent.css";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
    <div className="product-card">
        <NavLink to={`/products/${product.id}`} className="product-card-link">
        <img src={product.image} alt={product.title} className="product-card-image" />
        <div className="product-card-details">
            <h3 className="product-card-title">{product.title}</h3>
            <p className="product-card-price">${product.price.toFixed(2)}</p>
        </div>
        </NavLink>
    </div>
    );
};

export default ProductCard;
