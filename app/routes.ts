import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("products", "routes/product-list.tsx"),
    // route("admin-login", "routes/admin-login.tsx"),
    // ...prefix("product", [
    //     index("routes/product.tsx"),
    //     route(":productId", "pages/ProductView/ProductView.tsx")
    // ]),
    // route("cart", "routes/cart.tsx"),
    // route("profile", "pages/ProfileView/ProfileView.tsx"),
    // route("*", "routes/error.tsx")
] satisfies RouteConfig;
