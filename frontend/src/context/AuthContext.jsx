import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("token");
    });

    //load user from localStorage if token exists
    useEffect(() => {
        if (token && typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("user");
            if (storedUser && storedUser !== 'undefined') {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setToken(null);
                }
            }
        }
    }, [token]);

    const login = (userData, tokenData) => {

        setUser(userData);
        setToken(tokenData);

        if (typeof window !== 'undefined') {
            // Store user in localStorage, token in cookie (handled by backend)
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", tokenData);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem("user")
            localStorage.removeItem("token");
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};
