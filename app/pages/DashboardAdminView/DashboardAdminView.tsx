import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";


export default function DashboardAdminView() {
    const { adminIsLogged, logout, user, adminLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
            if (!adminIsLogged) {
                navigate("/");
            }
        }, [adminIsLogged, navigate]);

    return (
        <>
            <div className="home-container">
                <h1 className="site-title">Bienvenu sur l'interface administration de votre site ecommerce</h1>
                    <div className="logged-in-section">
                        <h2>Bienvenue sur le site !</h2>
                        {adminIsLogged ? (
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
