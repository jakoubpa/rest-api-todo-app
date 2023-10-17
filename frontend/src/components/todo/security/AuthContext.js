import { createContext, useState, useContext } from "react";
import { jwtAuthentication } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}) {


    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    async function login(username, password) {
            
        try {
            const response = await jwtAuthentication(username, password)
            if(response.status == 200) {
                setAuthenticated(true)
                setUsername(username)
                const newToken = 'Bearer ' + response.data.token; // Get the token from the response
                setToken(newToken); // Set the token in the state
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = newToken
                        return config
                    }
                )
                return true
            } else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)

    }

    return(
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    ) 
}