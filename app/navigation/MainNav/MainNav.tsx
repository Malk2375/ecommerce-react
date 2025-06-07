import { NavLink,useNavigate } from "react-router";
import "./MainNav.css";
import { useContext } from "react";
import { AuthContext } from "~/contexts/auth/AuthContext";

export default function MainNav() {
    const { adminIsLogged, isLogged, logout, user, adminLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    const handleAdminLogout = () => {
        adminLogout();
        navigate("/");
    };
    return (
        <nav>
            <menu className="main-menu">
                <div className="main-menu-items">
                    {adminIsLogged ? (
                        <div className="logged-in-section">
                            <NavLink className="nav-link" to="/admin/dashboard">Dashboard</NavLink>
                        </div>
                    ) :  (
                        <NavLink className="nav-link"  to="/">Accueil</NavLink>
                    )
                    }
                    <NavLink className="nav-link" to="/products">Catalogue des produits</NavLink>
                    <NavLink className="nav-link" to="/cart">Panier</NavLink>
                </div>
                {adminIsLogged ? (
                    <div className="logged-in-section">
                        <button className="logout-button" onClick={handleAdminLogout}>Se déconnecter</button>
                    </div>
                ) : isLogged && !adminIsLogged ? (
                    <div className="logged-in-section">
                        <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
                    </div>
                ) : (
                    <div className="logged-out-section">
                        <NavLink className="login-button" to="/login">Se connecter</NavLink>
                        <NavLink className="login-button" to="/admin">Admin</NavLink>
                    </div>
                )}
            </menu>
        </nav>
    );
}
