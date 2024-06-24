import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './signup.css'

const SignUp = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify(user));
           
            setUser(user);
            navigate('/emails'); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='signup_container'>
            <h1 className='signUp_title'>Sign UP</h1>
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
            <button className='btn' onClick={handleSignUp}>Sign UP</button>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default SignUp