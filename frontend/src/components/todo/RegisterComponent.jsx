import { useState } from 'react'
import { apiClient } from './api/ApiClient';
import {useNavigate} from 'react-router-dom'

export default function RegisterComponent() {

    const [username, setUsername] = useState("default")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState(null)
    const navigate = useNavigate()


    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    const handleSubmit = () => {
 
        const requestBody = {
            "username": username,
            "password": password
        };
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };

            apiClient.post('/auth/register', requestBody, config)
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Registration was successful. You will be redirected to login page.")
                    setTimeout(() => {
                        navigate('/auth/login');
                    }, 4000);
                } else {
                    setMessage("Make sure your password is at least 6 characters and username at least 3 characters. If problems persist choose a different username."); 
                }
            })
            .catch(() => {
                setMessage("Make sure your password is at least 6 characters and username at least 3 characters. If problems persist choose a different username."); 
            })
    }

    return (
        <div className="Login mx-auto container-fluid">
            <div className="row justify-content-center">
                <div className="col-4">
                    <h1>Sign up</h1>
                    {message && <div className="alert alert-warning">{message}</div>}
                    <div className="LoginForm">
                        <div className='form-group'>
                            <label htmlFor="username">Username</label>
                            <input className='form-control' type="text" name="username" value={username} onChange={handleUsernameChange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password</label>
                            <input className='form-control' type="password" name="password" value={password} onChange={handlePasswordChange}/>
                            <button className='btn btn-primary mt-2' type="button" name="login" onClick={handleSubmit}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}