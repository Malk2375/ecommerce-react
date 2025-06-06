import { Outlet } from "react-router";
import { ProductProvider } from "~/contexts/product/ProductContext";



function ProductLayout() {
  return (
    <ProductProvider>
      <Outlet />
    </ProductProvider>  
  );
}

export default ProductLayout;