import { useState, useEffect } from 'react';
import styles from "./Blog.module.css"
import { Link } from "react-router-dom";


function Blog() {
    const [blog, setBlog] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    
  

    useEffect(() => {
        // function getCookie(name) {
        //     const cookies = document.cookie.split(';');
        //     for (let i = 0; i < cookies.length; i++) {
        //       const cookie = cookies[i].trim();
        //       if (cookie.startsWith(name + '=')) {
        //         return cookie.substring(name.length + 1);
        //       }
        //     }
        //     return '';
        //   }
          
        //   const jwt = getCookie('jwt');
        
        const getData = async () => {
            try {
            const response = await fetch(`https://broken-smoke-228.fly.dev/posts`
            , {
                method: 'GET',
                credentials: 'include', // Include cookies in the request
              });
            // , {
            //     method: 'GET',
            //     headers: {
            //       'Authorization': `Bearer ${jwt}`,
            //     },
            //   })
              
            console.log('first')
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

    return (
        <div className={styles.blogs}>
            <Link to='/login'><button type='button'>Login</button></Link>
            {loading===true? 
            <div>
                <p>Please wait</p>
            </div>
            :
            blog.map((post)=>
                post.published === true? (
                <div key={post.id} className={styles.post}>
                    <h1>{post.title}</h1>
                    <p>Posted on {post.datestring}</p>
                    <p>{post.post}</p>
                    <Link to={post.id}>Read comments here...</Link>
                </div>)
                : null
                
            )}
        </div>
    )
}

export default Blog