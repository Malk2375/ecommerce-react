import { useContext, useState } from "react";
import { CartContext } from "~/contexts/cart/CartContext";
import { useNavigate } from "react-router";

export default function CartView() {
    const context = useContext(CartContext);
    const [vatRate, setVatRate] = useState(20);
    const navigate = useNavigate();

    if (!context) {
        return <p>Le contexte du panier n'est pas disponible.</p>;
    }

    const { cart, removeFromCart, updateQuantity, getTotal, getTotalWithVAT } = context;

    const handleChangeVAT = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVatRate(Number(event.target.value));
    };

    return (
        <div>
            <h1>Mon Panier</h1>

            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((product) => (
                            <li key={product.id}>
                                <img src={product.image} alt={product.title} width={50} />
                                <p>{product.title}</p>
                                <p>Prix : {product.price}€</p>
                                <input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                                    min={1}
                                />
                                <button onClick={() => removeFromCart(product.id)}>Supprimer</button>
                                <p>Total : {product.price * product.quantity}€</p>
                            </li>
                        ))}
                    </ul>

                    <div>
                        <h3>Total : {getTotal()}€</h3>
                        <h3>
                            Total avec TVA ({vatRate}%): {getTotalWithVAT(vatRate)}€
                        </h3>

                        <label htmlFor="vatRate">Sélectionner la TVA:</label>
                        <select id="vatRate" value={vatRate} onChange={handleChangeVAT}>
                            <option value={5}>5%</option>
                            <option value={20}>20%</option>
                        </select>

                        <button onClick={() => navigate("/")}>Continuer les achats</button>
                    </div>
                </div>
            )}
        </div>
    );
}
