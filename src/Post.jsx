import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styles from './Post.module.css'
import { useRef } from 'react';

function Post() {
    
    const { id } = useParams();

    const [post, setPost] = useState('');
    const [comments, setComments] = useState('');
    const [errorPost, setErrorPost] = useState(null);
    const [loadingPost, setLoadingPost] = useState(true);
    const [errorComments, setErrorComments] = useState(null);
    const [loadingComments, setLoadingComments] = useState(true);
    const [addComment, setAddComment] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        comment: ''
    })
    const [submit, setSubmit] = useState(0);
    const inputName = useRef(null);
    const inputComment = useRef(null);

    useEffect(()=> {
        fetch(`http://localhost:8000/posts/${id}`)
            .then(data => data.json())
            .then(data => {
                setPost(data); 
                setLoadingPost(false)
            })
            .catch(error=> {
                setErrorPost(error.message);
                setPost(null);
            })
            .finally(()=> setLoadingPost(false));
        fetch(`http://localhost:8000/posts/${id}/comments`)
            .then(data => data.json())
            .then(data => {
                setComments(data); 
                setLoadingComments(false);
                console.log(data);
            })
            .catch(error=> {
                setErrorComments(error.message);
                setComments(null);
            })
            .finally(()=> setLoadingComments(false));
        
    }, [id, submit])

    function addCommentButton() {
        setAddComment(true)
    }

    function removeCommentButton() {
        setAddComment(false)
    }

    const handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]: value})
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`https://broken-smoke-228.fly.dev/posts/${id}/comments`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setFormData({name: '', comment: ''})
                setSubmit(submit+1);
                setAddComment(false);
                

            } else {
                console.error('API call failed')
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }
        
    

    return(
        <div>    
            {loadingPost === true? <p>Please wait... </p>  
            :<div className={styles.post}>
                <h1>{post.title}</h1>
                <p>Posted on {post.datestring}</p>
                <p>{post.post}</p>
            </div>
            }
            <div className={styles.comments}>
            <h2 className={styles.titleComments}>Comments</h2>
            {addComment === true? 
            <>
            <button onClick={removeCommentButton} type='button'>Hide tab</button> 
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input ref={inputName} id='name' type='text' onChange={handleInputChange} name='name' value={formData.name} required/>
                <label htmlFor='comment'>Comment</label>
                <input ref={inputComment} id='comment' type='text' onChange={handleInputChange} name='comment' value={formData.comment} required/>
                <button type='submit'>Submit</button>
            </form>
            </>
            :
            <button onClick={addCommentButton} type='button'>Add Comment</button>}
            
                {loadingComments === true? <p> Please wait...</p>
                : 
                    comments.map(comment => 
                      <div key={comment._id} className={styles.comment}>
                        <h3>Posted by: {comment.decodeName} </h3>
                        <p>{comment.decodeComment}</p>
                        <p>on {comment.datestring}</p>
                      </div>
                    
                    )
                    }
                </div>
                
            </div>
            
    )
}

export default Post