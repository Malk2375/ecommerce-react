import { Outlet } from "react-router";
import { CartProvider } from "~/contexts/cart/CartContext";
import { ProductProvider } from "~/contexts/product/ProductContext";

function ProductLayout() {
  return (
    <ProductProvider>
        <Outlet />
    </ProductProvider>
  );
}

export default ProductLayout;