import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";

export default function LoginAdminView() {
    const { handleAdminLogin, error, isLogged, adminIsLogged } = useContext(AuthContext);
    const [username, setUsername] = useState("");
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
        handleAdminLogin(username, password);
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Dashborad Administrateur</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
