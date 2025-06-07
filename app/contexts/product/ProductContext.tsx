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
    updateProduct: (id: number, updatedProduct: Product) => Promise<void>;
    getProductById: (id: number) => Product | undefined;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            console.log("Données récupérées : ", data);
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits:", error);
            setLoading(false);
        }
    };

    const updateProduct = async (id: number, updatedProduct: Product) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            const data = await response.json();
            if (response.ok) {
                const updatedProductData = await response.json();

            // Récupérer le produit complet avec `rating`
            const productWithRating = await fetch(`https://fakestoreapi.com/products/${id}`);
            const productData = await productWithRating.json();

            // Mettre à jour les produits dans l'état avec les nouvelles données
            setProducts((prevProducts) =>
                prevProducts.map((prod) => (prod.id === id ? productData : prod))
            );

            console.log("Produit mis à jour et récupéré : ", productData);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du produit:", error);
        }
    };

    const getProductById = (id: number): Product | undefined => {
        return products.find(product => product.id === id);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, updateProduct, getProductById }}>
            {loading ? <div>Chargement...</div> : children}
        </ProductContext.Provider>
    );
};
