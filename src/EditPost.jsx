import { useState, useEffect } from 'react';
import styles from "./Blog.module.css"
import { Link, useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

function EditPost() {
    
    const navigate = useNavigate();



    const [formData, setFormData] = useState({title: '', post: '', published: false})
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(()=> {
        const getData = async() => {
            try {
            const response = await fetch(`https://still-flower-8414.fly.dev/posts/${id}`);
            if (!response.ok) {
                throw new Error(
                    'This is an HTTP error: The status is ${response.status}'
                )
            }
            const data = await response.json();
            setFormData({id: data.id, title: data.title, post: data.post, published: data.published});
            setError(null);
        } catch(err) {
            setError(err.message);
            setFormData(null);
        } finally {
            setLoading(false);
        }
        }
        getData();
        }, [id]);
                       
          
    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name] : value })
    }
    
    async function handleSubmit(e) {
        
        
        e.preventDefault();

        try {
        const response = await fetch(`https://still-flower-8414.fly.dev/posts/${id}`, {
            method: "PUT",
            mode: "cors",
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
    {loading? <p> Please wait... </p> :
    <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Name</label>
        <input id='title' type='text' onChange={handleInputChange} name='title' value={formData.title} required/>
        <label htmlFor='post'>Comment</label>
        <textarea id='post' type='text' onChange={handleInputChange} name='post' value={formData.post} required/>
        <label htmlFor='published'>Published: </label>
        <select id='published' defaultValue={formData.published} onChange={handleInputChange} name='published'>
            <option value={true} > True </option>
            <option value={false} > False </option>
        </select>
        <button type='submit'>Submit</button>
    </form>}
    </div>
    
    )

}

export default EditPost;