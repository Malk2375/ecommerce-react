import { createContext, useState, useEffect, type ReactNode } from "react";

export interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    getTotal: () => number;
    getTotalWithVAT: (vatRate: number) => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartProduct[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        // Sauvegarder le panier dans le localStorage
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.removeItem("cart");
        }
    }, [cart]);

    const addToCart = (product: CartProduct) => {
        setCart((prevCart) => {
            const productExists = prevCart.find((p) => p.id === product.id);
            if (productExists) {
                return prevCart.map((p) =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCart((prevCart) =>
                prevCart.map((product) =>
                    product.id === id ? { ...product, quantity } : product
                )
            );
        }
    };

    const getTotal = () => {
        return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    };

    const getTotalWithVAT = (vatRate: number) => {
        const total = getTotal();
        return total + total * (vatRate / 100);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getTotalWithVAT }}
        >
            {children}
        </CartContext.Provider>
    );
};
