import { useState, useEffect } from 'react';
import styles from "./Blog.module.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Author({setToken}) {
    const [blog, setBlog] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    


  

    useEffect(() => {
        const getData = async () => {
            try {
            const response = await fetch('http://localhost:8000/posts')
            
            if (!response.ok) {
                throw new Error(
                    'This is an HTTP error: The status is ${response.status}'
                );
            }
            let data = await response.json();
            
            setBlog(data);
            console.log(data);
            setError(null);
        } catch(err) {
            setError(err.message);
            setBlog(null);
        } finally {
            setLoading(false);
        }
    }
    getData()
    }, [])

    async function logout() {
        try {
            console.log('logout')
            await fetch('http://localhost:8000/posts/logout');
            setToken(false);
            navigate('/');
        } catch(error) {
            console.error(error.message);
        }
    }

    return (
        <div className={styles.blogs}>
            {loading===true? 
            <div>
                <p>Please wait</p>
            </div>
            :
        
            <>
            <Link to='/author/create'><button type='button'>Create Post</button></Link>
            <button type='button' onClick={logout}>Log out</button>
            {blog.map(post => 
                <div key={post.id} className={styles.post}>
                    <Link to={`/author/edit/${post.id}`}><button type='button'>Edit</button></Link>
                    <Link to={`/author/delete/${post.id}`}><button type='button'>Delete</button></Link>
                    <h1>{post.title}</h1>
                    <p>Posted on {post.datestring}</p>
                    <p>{post.post}</p>
                    <Link to={`/${post.id}`}>Read comments here...</Link>
                </div>
            )}
            </>   
            }
        </div>
    )
}

export default Author;