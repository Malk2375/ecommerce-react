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
                    <NavLink className="nav-link"  to="/">Accueil</NavLink>
                    <NavLink className="nav-link" to="/products">Catalogue des produits</NavLink>
                </div>
                {adminIsLogged ? (
                    <div className="logged-in-section">
                        <NavLink className="nav-link" to="/admin/dashboard">Dashboard</NavLink>
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





                {/* <li className="main-menu-items">
                    <NavLink to="/products">Produits</NavLink>
                </li> */}
                {/* Exemples désactivés */}
                {/* <li className="main-menu-items">
                    <NavLink to="/films">Films</NavLink>
                </li> */}
                {/* Connexion/Déconnexion */}
                {/* {
                    !isLogged 
                    ? (<li className="main-menu-items">
                        <NavLink to="/connexion">Connexion</NavLink>
                    </li>) 
                    : (<li className="main-menu-items">
                        <NavLink to="/deconnexion">Déconnexion</NavLink>
                    </li>)
                } */}
            </menu>
        </nav>
    );
}
