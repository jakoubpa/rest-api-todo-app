import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

export default function LoginComponent() {

    const [username, setUsername] = useState("default")
    const [password, setPassword] = useState("")

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()
    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

     async function handleSubmit() {
        if(await authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }


    return (
        <div className="Login w-25 mx-auto">
            <h1>Time to Login!</h1>
            {showErrorMessage && <div className='errorMessage'>Authenticated has failed!</div>}
            <div className="LoginForm">
                <div className='form-group'>
                    <label htmlFor="username">User Name</label>
                    <input className='form-control' type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input className='form-control' type="password" name="password" value={password} onChange={handlePasswordChange}/>
                    <button className='btn btn-primary mt-2' type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}