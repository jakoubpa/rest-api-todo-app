import { apiClient } from "./ApiClient"

export const jwtAuthentication 
= (username, password) => apiClient.post(`/auth/login`, {username, password})




