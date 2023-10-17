import {Link, useParams} from 'react-router-dom'
import { useEffect, useState } from "react"
import { retrieveAllTodosForUserApi } from "./api/TodoApiService"

export default function WelcomeComponent() {

    const {username} = useParams()
    const [message, setMessage] = useState(null)
    useEffect( () => welcomeMessage(), [username])

    function welcomeMessage() {
        retrieveAllTodosForUserApi(username)
        .then(response => {
            setMessage('You have ' + response.data.filter(todo => !todo.done).length + ' unfinished tasks!')
           })
        .catch(error => console.log(error))
    }
    
    return (
        <div className="Welcome">
            <h1>Welcome {username}!</h1>
            <div>
                <h2>{message}</h2>
                <Link to="/todos">Your todos</Link>
            </div>
        </div>
    )
}