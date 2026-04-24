import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import RecipeDetails from "./pages/RecipeDetails";


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
                path:'recipes',
                element:<Recipes/>
            },
            {
                path:'recipes/:recipeId',
                element:<RecipeDetails/>
            },
            {
                path:'categories',
                element:<Categories/>
            },
            {
                path:'categories/:categoryId',
                element:<Categories/>
            }
       
        ]
    }
])

export default router;