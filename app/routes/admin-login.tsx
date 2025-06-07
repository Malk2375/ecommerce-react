import LoginAdminView from "~/pages/LoginAdminView/LoginAdminView";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Connexion administrateur" },
        { name: "description", content: "Simulation de connexion utilisateur" },
    ];
}

export default function LoginAdmin() {
    return <LoginAdminView />;
}