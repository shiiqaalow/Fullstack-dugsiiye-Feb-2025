import { useContext, useState} from "react"
import {Link, useLocation, useNavigate} from "react-router"
import {ArrowDownUp, FlaskConical} from "lucide-react"
import {PostsContext} from "../PostContext"


const useQuery = ()=> {
    const location = useLocation()
    return new URLSearchParams(location.search)
}

const Home = () => {

    const { posts } = useContext(PostsContext)


    const query = useQuery()
    const searchTerm = query.get('q') || []
    const navigate = useNavigate()
    const [search,setSearch] = useState(searchTerm)

    const handleSearch = ()=>{
        if(searchTerm){
            navigate(`?q=${search}`)
        }else{
            navigate('')
        }
    }



    const filteredPosts = posts.filter( (post)=>post.title.toLowerCase().includes(searchTerm ) )
    return(
        <div className=" space-y-10 mx-auto bg-white/60 p-6 rounded-lg  mt-7 ">
            <h1 className="text-2xl font-bold mb-3">Blog Posts</h1>
            <div className="flex flex-col justify-self-start w-lg">
                <input
                    className="pl-3 rounded-lg py-2" 
                    type="text" 
                    placeholder="Search posts by title"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <button onClick={handleSearch} className="bg-blue-400 rounded-lg py-2 cursor-pointer">Search</button>
            </div>
            <div className="flex flex-col gap-2 flex-wrap">
                {
                    filteredPosts.length > 0 ? (
                        filteredPosts.map((post,index)=>
                            <Link to={`/posts/${post.id}`} key={index}>
                                <a className="text-2xl text-blue-700 hover:underline font-bold text-gray-900 capitalize">{post.title}</a>
                                {/* <p className="text-lg text-gray-700">{post.content}</p> */}
                            </Link>
                        )
                    )
                    :(
                        <p className="text-center font-bold text-xl "> 😓Nothing found❌</p> 
                    )
                }
                        </div>
            </div>
    )
}
export default Home