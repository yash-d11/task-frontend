import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UpdateTask from './components/Update';
import CreateTask from './components/Create';
import image from './components/image.png'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('authToken');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Router>
                <header className="bg-blue-600 text-white py-4 px-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            className="h-12 mr-2"
                            src={image}
                            alt="Task Manager"
                        />
                        <h1 className="text-2xl font-bold">Task Manager App</h1>
                    </div>
                    <div className='w-32 flex justify-between'>{!isLoggedIn && (
                        <Link to="/register" className="text-white hover:underline">
                            Register
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <Link to="/" className="text-white hover:underline">
                            Login
                        </Link>
                    )}
                    </div>
                </header>
                <main className="p-4">
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
                        <Route path="/home" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} />
                        <Route path="/register" element={<Register />}
                         />
                         <Route path="/create" element={<CreateTask />} />
                         <Route path="/update/:id" element={<UpdateTask />}/>
                    </Routes>
                </main>
            </Router>
        </div>
    );
};

export default App;

