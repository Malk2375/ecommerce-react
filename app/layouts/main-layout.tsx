import { Outlet } from "react-router";
import { ProductProvider } from "~/contexts/product/ProductContext";  // Import du ProductProvider
import { CartProvider } from "~/contexts/cart/CartContext";  // Import du CartProvider

function MainLayout() {
    return (
        <ProductProvider>
            <CartProvider>
                <Outlet />
            </CartProvider>
        </ProductProvider>
    );
}

export default MainLayout;
