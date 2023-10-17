import { apiClient } from "./ApiClient"


export const retrieveAllTodosForUserApi = (username) =>    apiClient.get(`/users/${username}/todos`)

export const deleteTodoApi = (username, todoId) =>    apiClient.delete(`/users/${username}/todos/${todoId}`)

export const retrieveTodoApi = (username, todoId) =>    apiClient.get(`/users/${username}/todos/${todoId}`)

export const updateTodoApi = (username, todoId, todo) =>    apiClient.put(`/users/${username}/todos/${todoId}`, todo)

export const createTodoApi = (username,  todo) =>    apiClient.post(`/users/${username}/todos`, todo)

export const updateTodoStatusApi = (username, todoId, status) => apiClient.put(`/users/${username}/todos/${todoId}`, status)
