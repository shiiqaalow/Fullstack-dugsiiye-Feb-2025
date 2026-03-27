import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Posts from "./pages/CreatePosts";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedPages from "./ProtectedPages";
import Logout from "./pages/Logout";
import PostDetails from "./pages/PostDetails";


const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<NotFound/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'create',
                element:(
                    <ProtectedPages element={<Posts/>}/>
                )
            },
            {
                path:'posts/:postId',
                element:<PostDetails/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'logout',
                element:<Logout/>
            },
           
       
        ]
    }
])

export default router;