import { createContext, useEffect, useState, type ReactNode } from "react";
import type { UserI } from "~/models/auth.interface";

export const AuthContext = createContext<any>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [adminIsLogged, setAdminIsLogged] = useState(false);
    const [user, setUser] = useState<UserI>({} as UserI);
    const [error, setError] = useState<string | null>(null);
    const [readSessionInfos, setReadSessionInfos] = useState(true);

    const adminCredentials = {
        username: "admin", password: "admin123"
    };
    const adminInfo: UserI  = {
        id: 90, username: "admin", password: "admin123", email: "m.abdelmalek@gmail.com", phone: "0758663561",
        address: {
            street: "62 rue des Martyrs",
            city: "Lyon",
            zipcode: "69600",
            geolocation: {
            lat: "50.3456",
            long: "50.3456",
            }
        },
        name: {
            firstname: "Malek",
            lastname: "Dorbani",
        },
        __v: 90 
    };

    const handleLogin = async (username: string, password: string) => {
        const credentials = { username, password };

        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                // Si la réponse est ok et contient un token
                if (data.token) {
                    await fetchUserInfo(username, data.token);
                } else {
                    setError("Erreur : pas de token retourné.");
                    setIsLogged(false);
                }
            } else {
                setError("Identifiants incorrects ou erreur serveur.");
                setIsLogged(false);
            }
        } catch (error) {
            setError("Une erreur est survenue. Veuillez réessayer.");
            setIsLogged(false);
        }
    };
    const fetchUserInfo = async (username: string, token: string) => {
        try {
            const response = await fetch("https://fakestoreapi.com/users");
            const users = await response.json();

            // Chercher l'utilisateur avec le bon username
            const userInfo = users.find((user: any) => user.username === username);

            if (userInfo) {
                // Sauvegarder les infos utilisateur et le token dans sessionStorage
                saveUserInfos(token, userInfo);
                setUser(userInfo);
                setIsLogged(true);
                setError(null);
            } else {
                setError("Utilisateur non trouvé.");
                setIsLogged(false);
            }
        } catch (error) {
            setError("Impossible de récupérer les informations utilisateur.");
            setIsLogged(false);
        }
    };

    const saveUserInfos = (token: string, userInfo: any) => {
        sessionStorage.setItem("user", JSON.stringify({ token, ...userInfo }));
    };

    const getUserSession = () => {
        const userSession = sessionStorage.getItem("user");
        return userSession ? JSON.parse(userSession) : undefined;
    };

    const deleteUserSession = () => {
        sessionStorage.removeItem("user");
    };

    useEffect(() => {
        if (readSessionInfos) {
            setReadSessionInfos(false);
            const savedUser = getUserSession();
            if (savedUser) {
                console.log("User session found:", savedUser);
                setUser(savedUser);
                setIsLogged(true);
            }
        }
    }, [readSessionInfos]);

    useEffect(() => {
        if (readSessionInfos) {
            setReadSessionInfos(false);
            const savedAdmin = sessionStorage.getItem("admin");
            if (savedAdmin) {
                setUser(JSON.parse(savedAdmin));  // Chargement des infos de l'admin
                setIsLogged(true);
                setAdminIsLogged(true);
            }
        }
    }, [readSessionInfos]);

    const handleAdminLogin = (username: string, password: string) => { 
        if (username === adminCredentials.username && password === adminCredentials.password) {
            sessionStorage.setItem("admin", JSON.stringify(adminInfo));
            setUser(adminInfo);
            setAdminIsLogged(true);
            setIsLogged(true);
            setError(null);
        } else {
            setError("Identifiants administrateur incorrects.");
            setIsLogged(false);
            setAdminIsLogged(false); // Assure-toi de réinitialiser l'état adminIsLogged en cas d'erreur
        }
    };

    const adminLogout = () => {
        sessionStorage.removeItem("admin");  // Retirer les infos de session de l'admin
        setIsLogged(false);
        setAdminIsLogged(false);
        setUser({} as UserI);  // Réinitialiser l'utilisateur
    };

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                user,
                error,
                adminIsLogged,
                handleLogin,
                handleAdminLogin,
                logout: () => {
                    deleteUserSession();
                    setIsLogged(false);
                    setUser({} as UserI);
                },
                adminLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
