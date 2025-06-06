import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";
import "./LoginView.css";

export default function LoginView() {
    const { handleLogin, error, isLogged } = useContext(AuthContext);  // Utilise le contexte Auth pour appeler handleLogin
    const [username, setUsername] = useState("");  // On utilise "username" maintenant
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            navigate("/");  // Redirige vers la page d'accueil si l'utilisateur est connecté
        }
    }, [isLogged, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");
        handleLogin(username, password);  // Passe "username" à la place de "email"
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Connexion</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}  // Mise à jour de "username"
                    className="login-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                />
                {error && <p className="login-error">{error}</p>}  {/* Affiche les erreurs si elles existent */}
                <button type="submit" className="login-submit-button">
                    Se connecter
                </button>
            </form>
        </div>
    );
}
