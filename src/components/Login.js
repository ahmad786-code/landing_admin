import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './login.css'
const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify(user));
         
            setUser(user);
            navigate('/emails');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='login_container'>
            <div className="title_login">Login</div>
            <input
                className='input'
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='input'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='btn' onClick={handleLogin}>Login</button>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Login