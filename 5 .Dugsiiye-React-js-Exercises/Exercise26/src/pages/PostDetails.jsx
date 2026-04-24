import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { PostsContext } from "../PostContext";

const PostDetails = () => {
  const { posts } = useContext(PostsContext);
  const { postId } = useParams();
  const navigate = useNavigate();

  const startIndex = posts.findIndex(p => p.id == postId);
  console.log(startIndex)

  const [currentPost, setCurrentPost] = useState(startIndex);

  useEffect(() => {
    setCurrentPost(startIndex);
  }, [postId]);

  const nextPost = () => {
    if (currentPost < posts.length - 1) {
      const newIndex = currentPost + 1;
      setCurrentPost(newIndex);
      navigate(`/posts/${posts[newIndex].id}`);
    }
  };

  const prevPost = () => {
    if (currentPost > 0) {
      const newIndex = currentPost - 1;
      setCurrentPost(newIndex);
      navigate(`/posts/${posts[newIndex].id}`);
    }
  };
  const post = posts[currentPost];

  return (
    <div className="flex flex-col justify-center items-center my-10 gap-4">
      <h1 className="text-4xl font-bold">Post Details</h1>

      <div className="bg-white p-4 text-center rounded-lg w-70">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-lg text-gray-700">{post.content}</p>
        {
          currentPost > 0 && (
          <p> You navigated from ID: {currentPost}</p>
          )
        }
        </div>

      <div className="flex items-center gap-5">
        {
          currentPost > 0 && (
            <button 
              onClick={prevPost} 
              disabled={currentPost === 0}
              className="bg-blue-400 rounded-lg px-5 py-2"
            >
              Previous
            </button>
          )
        }
        {
          currentPost < posts.length - 1 && (
            <button 
              onClick={nextPost} 
              disabled={currentPost === posts.length - 1}
              className="bg-blue-400 rounded-lg px-5 py-2"
            >
              Next
            </button>
          )
        }
      

     
      </div>
    </div>
  );
};

export default PostDetails;
