import { useEffect, useState } from "react"
import { retrieveAllTodosForUserApi, deleteTodoApi, updateTodoApi, retrieveTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import {useNavigate} from 'react-router-dom'

export default function ListTodosComponent() {

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    useEffect( () => refreshTodos(), [])
    const authContext = useAuth()
    const username = authContext.username

    function refreshTodos() {
    retrieveAllTodosForUserApi(username)
        .then(response => {
            setTodos(response.data)
           })
        .catch(error => console.log(error))
    }

    function deleteTodo(todoId) {
        deleteTodoApi(username, todoId)
            .then(
                () => {
                    setMessage(`Todo with id ${todoId} deleted! `)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }

    function updateTodo(todoId) {
       navigate(`/todo/${todoId}`)
    }

    function updateTodoStatus(todoId, done) {
        retrieveTodoApi(username, todoId)
        .then(response => { 
            const todo = {
            todoId: todoId,
            username: username,
            description: response.data.description,
            targetDate: response.data.targetDate,
            done: done
            }
            updateTodoApi(username, todoId, todo)
            .then(() => refreshTodos())
            .catch(error => console.log(error))
        })
        }
     
    function addNewTodo(todoId) {
       navigate(`/todo/-1`)
    }

    return (
        <div className="container-fluid">
            <h1>Things you want to do:</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table table-responsive'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Description</th>
                            <th>Is done?</th>
                            <th>Target Date</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map( todo => (                        
                                <tr key="todo.todoId">
                                    <td className={todo.done ? 'text-muted' : 'text-dark'}>{todo.description}</td>
                                    <td>
                                        <button className={`${todo.done ? 'btn-danger' : 'btn-success'} btn`} onClick={() => updateTodoStatus(todo.todoId, !todo.done)}>
                                        {todo.done ? "Mark as undone" : "Mark as done"}
                                        </button>
                                    </td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-danger mx-2" onClick={() => deleteTodo(todo.todoId)}>Delete</button>
                                    <button className="btn btn-info" onClick={() => updateTodo(todo.todoId)} disabled={todo.done}>Update</button></td>
                                </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div className="btn btn-success m-2" onClick={addNewTodo}>Add New Todo</div>
            </div>
        </div>
    )
}