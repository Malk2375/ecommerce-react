import type { Route } from "./+types/home";
import ProductListView from "~/pages/ProductListView/ProductListView";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Liste des produits" },
    { name: "description", content: "Bienvenu au catalogue des produit" },
  ];
}

export default function Home() {
  return (
    <ProductListView />
  )
    ;
}
