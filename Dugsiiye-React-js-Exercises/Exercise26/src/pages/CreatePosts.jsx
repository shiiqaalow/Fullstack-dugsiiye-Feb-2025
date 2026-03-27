import {useContext, useState} from "react"
import { useNavigate} from "react-router"
import {PostsContext} from "../PostContext"

const CreatePosts = () => {

        const { posts } = useContext(PostsContext)

    const [ createPost,setCreatePost ] = useState({title:'',message:''})
    const navigate = useNavigate()
   
    const handleChange = (e)=> {
        const {name,value} = e.target
        setCreatePost((prev)=>({...prev,[name]:value}))
    }
 

    const addNewPost = ()=>{
    const newId = posts.length + 1;
     const newPost = {
        id:newId,
        title:createPost.title,
        dis:createPost.message,
        category:{name:` NewPost:${newId}`}
     }
     posts.push(newPost)
     navigate('/')
    }
    
    return(
        <div className=" space-y-10 mx-auto bg-white/60 p-6 rounded-lg  mt-7 cursor-pointer">
            <h1 className="text-2xl font-bold mb-3">Blog Posts</h1>
            <div className="flex items-center gap-3 w-lg">
                <label className="text-3xl font-bold capitalize">title:</label>
                <input 
                    className="pl-3 rounded-lg py-2 w-full" 
                    type="text"
                    name="title"
                    value={createPost.title}
                    onChange={handleChange}

                />
            </div>
            <div className="flex items-center gap-3 w-lg">
                <label className="text-3xl font-bold capitalize">Message:</label>
                <input 
                    className="pl-3 rounded-lg py-2 w-full" 
                    type="textarea"
                    name="message"
                    value={createPost.message}
                    onChange={handleChange}

                />
            </div>
            <button onClick={addNewPost} type="submit" className=" bg-blue-400 rounded-lg py-2 w-lg cursor-pointer">Submit</button>
        </div>
    )
}
export default CreatePosts
