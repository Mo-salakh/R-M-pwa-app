import { createContext, useCallback, useContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState( () => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });
    const [isSigned, setIsSigned] = useState(() => {
        return Boolean(localStorage.getItem("signed"));
    });
    const [gender, setGender] = useState("");

    const updateLocalStorage = useCallback(() => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("signed", isSigned);
    }, [user, isSigned]);

    useEffect(() => {
        updateLocalStorage();
    }, [updateLocalStorage]);

    const signin = (userData) => {
        setUser(userData);
        setIsSigned(true);
    };

    const signup = (email, password) => {
        if (user?.email === email && user?.password === password) {
            setIsSigned(true);
            return true;
        }
        return false;
    };

    const signout = (callback) => {
        setIsSigned(false);
        callback?.();
    };


    const value = {
        user,
        setUser, 
        signin, 
        signout, 
        signup, 
        isSigned,
        setIsSigned,
        gender, 
        setGender
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};