
import './TodoApp.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import LoginComponent from './LoginComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import TodoComponent from './TodoComponent'
import RegisterComponent from './RegisterComponent'

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children
    return <Navigate to="/" />
    }

export default function TodoApp(){
    return (
        <div className='TodoApp container-fluid g-0'>
            <AuthProvider>
                <BrowserRouter>  
                    <HeaderComponent />
                    <div className=' justify-content-center text-center px-5'>
                        <div className='row'>
                            <div className="col">
                                <Routes>
                                    <Route path='/' element={<LoginComponent />} />
                                    <Route path='/auth/login' element={<LoginComponent />} />
                                    <Route path='/auth/register' element={<RegisterComponent />} />

                                    <Route path='/welcome/:username' element={
                                        <AuthenticatedRoute>
                                            <WelcomeComponent />
                                        </AuthenticatedRoute>
                                    } />

                                    <Route path='/todos' element={
                                        <AuthenticatedRoute>
                                            <ListTodosComponent />
                                        </AuthenticatedRoute>
                                    } />

                                    <Route path='/todo/:id' element={
                                        <AuthenticatedRoute>
                                            <TodoComponent />
                                        </AuthenticatedRoute>
                                    } />

                                    <Route path='/logout' element={
                                        <AuthenticatedRoute>
                                            <LogoutComponent />
                                        </AuthenticatedRoute>
                                } />
                                    <Route path='*' element={<ErrorComponent />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}









