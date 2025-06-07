import { useContext, useState } from "react";
import { CartContext } from "~/contexts/cart/CartContext";
import { useNavigate } from "react-router";
import "./CartView.css";
export default function CartView() {
    const context = useContext(CartContext);
    const [vatRate, setVatRate] = useState(20);
    const navigate = useNavigate();

    if (!context) {
        return <p className="cart-error">Le contexte du panier n'est pas disponible.</p>;
    }

    const { cart, removeFromCart, updateQuantity, getTotal, getTotalWithVAT } = context;

    const handleChangeVAT = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVatRate(Number(event.target.value));
    };

    return (
        <div className="cart-view">
            <h1 className="cart-title">Mon Panier</h1>

            {cart.length === 0 ? (
                <p className="cart-empty">Votre panier est vide.</p>
            ) : (
                <div className="cart-content">
                    <ul className="cart-items">
                        {cart.map((product) => (
                            <li key={product.id} className="cart-item">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="cart-item-image"
                                />
                                <p className="cart-item-title">{product.title}</p>
                                <p className="cart-item-price">Prix : {product.price}€</p>
                                <p className="cart-item-price">Quantité : </p>
                                <input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                                    min={1}
                                    className="cart-item-quantity"
                                />

                                <p className="cart-item-total">Total : {product.price * product.quantity}€</p>

                                <button
                                    onClick={() => removeFromCart(product.id)}
                                    className="cart-item-remove"
                                >
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="cart-summary">
                        <h3 className="cart-summary-total">Total : {getTotal()}€</h3>
                        <h3 className="cart-summary-vat">
                            Total avec TVA ({vatRate}%): {getTotalWithVAT(vatRate)}€
                        </h3>

                        <label htmlFor="vatRate" className="vat-label">
                            Sélectionner la TVA:
                        </label>
                        <select
                            id="vatRate"
                            value={vatRate}
                            onChange={handleChangeVAT}
                            className="vat-select"
                        >
                            <option value={5}>5%</option>
                            <option value={20}>20%</option>
                        </select>

                        <button onClick={() => navigate("/")} className="continue-shopping-button">
                            Continuer les achats
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
