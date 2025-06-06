import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";
import "./HomeView.css";
export default function HomeView() {
    const { isLogged, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <div className="home-container">
                <h1 className="site-title">Site ecommerce</h1>
                {isLogged ? (
                    <div className="logged-in-section">
                        <h2>Bienvenue sur le site !</h2>
                        <p>Vous êtes connecté en tant que <strong>{user.username}</strong></p>
                        <NavLink className="nav-link" to="/products">Catalogue des produits</NavLink>
                        <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
                    </div>
                ) : (
                    <div className="logged-out-section">
                        <NavLink className="login-button" to="/login">Se connecter</NavLink>
                    </div>
                )}
            </div>
        </>
    );
}
