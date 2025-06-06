import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";

export default function LoginView(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin, error, isLogged} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLogged) {
            navigate("/");
        }
    }, [isLogged, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");
        handleLogin(email, password);
    };
    return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
            </input>
            <input 
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
            </input>
            <button type="submit">Se connecter</button>
            {/* {error && <p>{error}</p>} */}
        </form>
    </div>
    );
}