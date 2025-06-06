import type { Route } from "./+types/home";
import ProductListView from "~/pages/ProductListView/ProductListView";
import { ProductProvider } from "~/contexts/product/ProductContext";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Route des produit" },
    { name: "description", content: "Bienvenu au catalogue des produit" },
  ];
}

export default function Home() {
  return (
  <ProductProvider>
    <ProductListView />
  </ProductProvider>
  )
  ;
}
