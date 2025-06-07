import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";
// import "./LoginAdminView.css";

export default function LoginAdminView() {
    const { handleAdminLogin, error, isLogged, adminIsLogged } = useContext(AuthContext);  // Utilise le contexte Auth pour appeler handleLogin
    const [username, setUsername] = useState("");  // On utilise "username" maintenant
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (adminIsLogged) {
            navigate("/admin/dashboard");
        }
    }, [adminIsLogged, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Admin form submitted");
        handleAdminLogin(username, password); // Cette fonction devrait mettre à jour adminIsLogged
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Dashborad Administrateur</h1>
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
                {error && <p className="login-error">{error}</p>}
                <button type="submit" className="login-submit-button">
                    Se connecter
                </button>
            </form>
        </div>
    );
}
