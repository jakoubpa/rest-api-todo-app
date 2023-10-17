import {Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext'



export default function HeaderComponent() {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()
    }


    return (
        <header className="mb-5">
           <div className="text-white">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid  justify-content-between">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav px-3">
                                <li className="nav-item">
                                    {isAuthenticated && <Link className="nav-link" to="/welcome/default">Home</Link>}
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto px-3">
                                <li className="nav-item">
                                    {!isAuthenticated && <Link className="nav-link" to="auth/login">Login</Link>}
                                </li>
                                <li className="nav-item">
                                    {!isAuthenticated && <Link className="nav-link" to="auth/register">Register</Link>}
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
