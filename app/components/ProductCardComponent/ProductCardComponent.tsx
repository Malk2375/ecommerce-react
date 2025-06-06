import React from 'react';
import './ProductCardComponent.css';

interface ProductCardI {
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

const ProductCardComponent: React.FC<ProductCardI> = ({ title, description, image, price, category, rating }) => {
    return (
        <div className="product-card-component">
            <img src={image} alt={title} className="product-image-component" />
            <div className="product-info">
                <h3>{title}</h3>
                <p><strong>Catégorie:</strong> {category}</p>
                <p>{description}</p>
                <div className="product-rating">
                    <span>Note: {rating.rate}</span> | <span>{rating.count} avis</span>
                </div>
                <p><strong>Prix:</strong> {price} €</p>
            </div>
        </div>
    );
};

export default ProductCardComponent;
