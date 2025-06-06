import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    // route("admin-login", "routes/admin-login.tsx"),
    ...prefix("products", [
        index("routes/product-list.tsx"),
        route(":productId", "pages/ProductDetailView/ProductDetailView.tsx")
    ]),
    // route("cart", "routes/cart.tsx"),
    // route("profile", "pages/ProfileView/ProfileView.tsx"),
    // route("*", "routes/error.tsx")
] satisfies RouteConfig;
