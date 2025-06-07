import {useNavigate, useParams} from "react-router";
import { useEffect } from "react";

export default function ProductDelete() {
    const navigate = useNavigate();
    const { productId } = useParams(); // On récupère l'id du produit à supprimer

    useEffect(() => {
        const deleteProduct = async () => {
            if (productId) {
                try {
                    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        console.log(`Produit ${productId} supprimé avec succès.`);
                        navigate('/products');
                    } else {
                        console.error('Échec de la suppression du produit');
                    }
                } catch (error) {
                    console.error('Erreur de suppression :', error);
                }
            }
        };

        deleteProduct();
    }, [productId, navigate]);

    return (
        <div>
            <p>Suppression en cours...</p>
        </div>
    );
}
