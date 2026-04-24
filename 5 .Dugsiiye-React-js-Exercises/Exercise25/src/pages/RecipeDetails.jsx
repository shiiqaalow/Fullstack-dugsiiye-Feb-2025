import {Link, useParams} from "react-router"
import { recipes } from "./Recipes"

const RecipeDetails = () => {

    const {recipeId} = useParams()
    const filteredRecipes = recipes.filter((recipe)=>recipe.id == recipeId)
    // console.log('filteredRecipes :',recipeId)
    return(
        <div className="bg-white shadow-lg rounded-lg h-100 mt-7 p-5">
            <div className="text-red-500 font-bold text-xl mb-5 ">
                <Link to='/recipes' >⬅ Back to Recipes</Link>
            </div>
            <div>
                <h1 className="font-bold text-3xl text-gray-900 mb-5">Sample Recipe</h1>
            </div>
            <div className="grid grid-cols-2 gap-5 content-center">
                <div className="">
                    <h1 className="text-xl text-gray-900 font-bold mb-5">Ingredients</h1>
                    <div>
                        {
                           filteredRecipes.filter((recipe)=>['desserts','lunch','dinner','breakfast'].includes(recipe.category.name))
                           .map((recipe)=>(
                            <ul key={recipe.id}>
                                {
                                    recipe.ingredients.map((ingredient,index)=>(
                                        <li key={index}>{ingredient}</li>
                                    ))
                                }
                            </ul>
                           ))
                        }
                    </div>
                </div>
                <div>
                    <h1 className="text-xl text-gray-900 font-bold mb-5">Instructions</h1>
                    <div>
                        {
                           filteredRecipes.filter((recipe)=>['desserts','lunch','dinner','breakfast'].includes(recipe.category.name)).map((recipe)=>(
                            <ul key={recipe.id}>
                                {
                                    recipe.instructions.map((instruction,index)=>(
                                        <li key={index} className="">{instruction}</li>
                                    ))
                                }
                            </ul>
                           ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RecipeDetails