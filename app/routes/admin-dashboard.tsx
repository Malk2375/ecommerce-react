import DashboardAdminView from "~/pages/DashboardAdminView/DashboardAdminView";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard administrateur" },
        { name: "description", content: "Simulation de connexion utilisateur" },
    ];
}

export default function DashboardAdmin() {
    return <DashboardAdminView />;
}