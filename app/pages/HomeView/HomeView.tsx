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
                    <div className="logged-in-section">
                        <h2>Bienvenue sur le site !</h2>
                        {isLogged ? (
                            <>
                                <p>Bonjour, {user?.username} !</p>
                            </>
                        ) : null}
                        <NavLink className="nav-link" to="/products">Catalogue des produits</NavLink>
                    </div>
                
            </div>
        </>
    );
}
