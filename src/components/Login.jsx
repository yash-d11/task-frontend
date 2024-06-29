import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
          const response = await axios.post('http://localhost:5000/login', { username, password });
          console.log('Login Response:', response); 
          const token = response.data.token;
          localStorage.setItem('authToken', token);
          onLogin(); 
          alert('Login successful');
      } catch (error) { 
          console.error('Login Error:', error); 
          alert('Invalid credentials');
      }
  };
  

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-4">Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 my-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 my-2"
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
                Login
            </button>
        </div>
    );
};

export default Login;
