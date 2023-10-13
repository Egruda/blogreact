import { useState, useEffect } from 'react';
import styles from "./Blog.module.css"
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';


function Login({setToken}) {

    const [formData, setFormData] = useState({username: '', password: ''})

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`https://broken-smoke-228.fly.dev/posts/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setToken(true);
                navigate('/author');

            } else {
                console.error('API call failed')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]: value});
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' id='username' onChange={handleInputChange} value={formData.username} required/>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' id='password' onChange={handleInputChange} value={formData.password} required/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;