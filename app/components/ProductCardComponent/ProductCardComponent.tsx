import React from 'react';
import  { AuthContext } from "~/contexts/auth/AuthContext";
import { useContext } from "react";
import './ProductCardComponent.css';
import { NavLink } from "react-router";
import type { Product } from "~/contexts/product/ProductContext";

interface ProductCardProps {
    product: Product;
}


const ProductCardComponent: React.FC<ProductCardProps> = ({ product }) => {
        const { adminIsLogged } = useContext(AuthContext);
    return (
        <div className="product-card-component">
            <img src={product.image} alt={product.title} className="product-image-component" />
            <div className="product-info">
                <h3>{product.title}</h3>
                <p><strong>Catégorie:</strong> {product.category}</p>
                <p>{product.description}</p>
                <div className="product-rating">
                    <span>Note: {product.rating.rate}</span> | <span>{product.rating.count} avis</span>
                </div>
                <p><strong>Prix:</strong> {product.price} €</p>
                {adminIsLogged ? (
                    <div className="product-crud-buttons">
                        <NavLink to={`/products/update/${product.id}`} className="">
                            <button className="product-card-button edit">Editer</button>
                        </NavLink>
                        <NavLink to={`/products/Delete/${product.id}`} className="">
                            <button className="product-card-button delete">Supprimer</button>
                        </NavLink>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ProductCardComponent;
