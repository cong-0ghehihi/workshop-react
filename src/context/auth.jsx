import React, { createContext, useReducer } from "react";
import { authReducer } from "../reducers/auth";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: false
    });
  

    return (
        <AuthContext.Provider value={{ authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};