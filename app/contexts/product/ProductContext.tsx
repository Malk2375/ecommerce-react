import { createContext, useEffect, useState, type ReactNode } from "react";

export interface Product {
    rating: { rate: number; count: number; };
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
    const [loading, setLoading] = useState<boolean>(true);  // Étape 1 : ajout de l'état loading

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            console.log("Données récupérées : ", data);
            setProducts(data);
            setLoading(false);  // Étape 2 : mettre loading à false une fois les données récupérées
            const responseUsers = await fetch("https://fakestoreapi.com/users");
            const dataUsers = await responseUsers.json();
            console.log("Données USERS : ", dataUsers); // Affichage de la réponse du fetch
            setProducts(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits:", error);
            setLoading(false);  // Mettre loading à false même en cas d'erreur
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products }}>
            {loading ? (
                <div>Chargement...</div>
            ) : (
                children
            )}
        </ProductContext.Provider>
    );
}
