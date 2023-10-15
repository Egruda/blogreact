import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DeletePost() {
    
    const navigate = useNavigate();

    const [post, setPost] = useState({title: '', post: ''});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(()=> {
        const getData = async () => {
            try {
                const response = await fetch(`https://still-flower-8414.fly.dev/posts/${id}`);
                
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    )
                }
                const data = await response.json();
                setPost({title: data.title, post: data.post})
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setPost(null);
            } finally {
                setLoading(false);
            }
        }
        getData()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`https://still-flower-8414.fly.dev/posts/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
            })
            if(response.ok) {
            setLoading(true);
            navigate('/author');
            } else {
                console.error('API call failed')
            }
        } catch(error) {
            console.error('Error:', error);
        }
            
        }
    

    return (
        
        
        <div>
            {loading === true ? <h2>loading... Please wait</h2> :
            <>
            <h2>Are you sure you want to delete this blog post?</h2>
            <h3>{post.title}</h3>
            <p>{post.post}</p>
            <form onSubmit={handleSubmit}>
                <input type='hidden' value={id} name='id'/>
                <button type='submit'>Delete</button>
            </form>
            </>
            }
        </div>
    )

}

export default DeletePost;