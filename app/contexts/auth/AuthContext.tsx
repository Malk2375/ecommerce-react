import { createContext, useEffect, useState, type ReactNode } from "react";
import type { UserI } from "~/models/auth.interface";

export const AuthContext = createContext<any>(null!);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<UserI>({} as UserI);
    const [readSessionInfos, setReadSessionInfos] = useState(true);
    const [users, setUsers] = useState<UserI[]>([]);

    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        const userFound = users.find(user => user.email === email && user.password === password);
        if(userFound){
            setUser(userFound);
            saveUserInfos(userFound);
            handleConnexion(true);
            setError(null);
        } else {
            setError("Utilisateur ou mot de passe incorrect");
            handleConnexion(false);
        }
    }
    const fetchUsers = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/users");
            const data = await response.json();
            console.log("Données récupérées : ", data); // Affichage de la réponse du fetch
            setUsers(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            setError("Erreur lors de la récupération des utilisateurs");
        }
    }
    const getUserSession = () => {
        const userSession = sessionStorage.getItem("user")
        return userSession ? JSON.parse(userSession) : undefined;
    }

    const handleConnexion = (state: boolean) => {
        setIsLogged(state);
    }
    

    const saveUserInfos = (user: UserI) => {
        if(user) sessionStorage.setItem("user", JSON.stringify(user));
    }

    const deleteUserSession = () => {
        sessionStorage.removeItem("user");
    }

    useEffect(() => {
        if(readSessionInfos){
            setReadSessionInfos(false);
            const savedUser = getUserSession();
            if(savedUser){
                setUser(savedUser);
                handleConnexion(true);
                console.log("Vous etes connecté", savedUser);
            }
            fetchUsers();
        }
    }, [readSessionInfos]);


    return (
        <AuthContext.Provider
            value={{
                isLogged,
                user,
                error,
                handleLogin,
                logout: () => {
                    deleteUserSession();
                    setIsLogged(false);
                    setUser({} as UserI);
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}