import { createContext, useEffect, useState, type ReactNode } from "react";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface ProductContextType {
    products: Product[];
}
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<Product[]>([]);    
    const fetchProducts = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            console.log("Données récupérées : ", data); // Affichage de la réponse du fetch
            setProducts(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
            <ProductContext.Provider
                value={{
                    products,
                }}
            >
                {children}
            </ProductContext.Provider>
        )
}