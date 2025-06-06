import { useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";

export default function HomeView() {
    const { isLogged, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <>
            <div>
                <h1>Site ecommerce</h1>
                {isLogged ? (
                    <div>
                        <h2>Bienvenue sur le site !</h2>
                        <p>Vous êtes connecté en tant que {user.username}</p>
                        <NavLink className="login" to="/login">Se connecter</NavLink>
                        <NavLink to="/products">Catalogue des produits</NavLink>
                        <button onClick={handleLogout}>Se déconnecter</button>
                    </div>
                    ) : (
                        <NavLink className="login" to="/login">Se connecter</NavLink>
                    )}
                </div>
        </>
    );
}
