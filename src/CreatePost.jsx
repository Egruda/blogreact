import { useState, useEffect } from 'react';
import styles from "./Blog.module.css"
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

function CreatePost() {
    
    const navigate = useNavigate();



    const [formData, setFormData] = useState({title: '', post: '', published: false})
    
    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name] : value })
    }
    
    async function handleSubmit(e) {
        
        
        e.preventDefault();

        try {
        const response = await fetch('https://still-flower-8414.fly.dev/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify(formData)
        })

       

        if(response.ok) {
            
            navigate('/author');
            
        } else {
            console.error('API call failed')
        }
    } catch (error) {
            console.error('Error:', error)
    }
    }

    return (
    <div>
    <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Name</label>
        <input id='title' type='text' onChange={handleInputChange} name='title' value={formData.title} required/>
        <label htmlFor='post'>Comment</label>
        <textarea id='post' type='text' onChange={handleInputChange} name='post' value={formData.post} required/>
        <label htmlFor='published'>Published: </label>
        <select id='published' defaultValue={false} onChange={handleInputChange} name='published'>
            <option value={true}> True </option>
            <option value={false}> False </option>
        </select>
        <button type='submit'>Submit</button>
        
    </form>
    </div>
    )

}

export default CreatePost;