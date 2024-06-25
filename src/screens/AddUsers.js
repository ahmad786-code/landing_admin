import React, { useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const AddUsers = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleAddUsers = async () => {
        setError('');
        setSuccess('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('User added successfully!');
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className='login_container'>
            <div className="title_login">Add Users</div>
            <input
                className='input'
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='input'
                type="text"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='btn' onClick={handleAddUsers}>Add</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    )
}

export default AddUsers