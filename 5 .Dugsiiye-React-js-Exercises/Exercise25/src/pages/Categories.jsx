import {Link, useParams} from "react-router"
import { recipes } from "./Recipes"

    let newCat =  []

const Categories = ()=> {
    
    const { categoryId } = useParams()

    if(categoryId && !newCat.includes(categoryId)){
        newCat.push(categoryId)
    }

    const filteredRecipes = recipes.filter((recipe)=>newCat.includes(recipe.category.name))

    return(
        <div>
            <div className="bg-white shadow-lg rounded-lg h-100 mt-7 p-5">
                <h1 className="text-3xl font-bold text-gray-900 mb-7">Categories</h1>
                <div className="flex flex-col gap-5">
                    {
                        recipes.map((recipe)=>(
                            <Link key={recipe.id} to={`/categories/${recipe.category.name}`} className="hover:bg-red-100 cursor-pointer px-3 rounded-lg">
                                <h1 className="text-xl font-bold capitalize text-gray-900 hover:text-rose-600">
                                    {recipe.category.name}
                                </h1>
                                <p className="text-gray-700">
                                    {recipe.category.categoryInfo}
                                </p>
                            </Link>
                           
                        ))
                    }
                </div>
            </div>
            <div>
                
            </div>

            {
               filteredRecipes.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg mt-7 mb-7 p-5">
                    {
                        newCat.map((cat)=>(
                            <div key={cat} className="flex flex-col gap-5 mt-3">
                                <h1 className="capitalize text-3xl font-bold text-gray-900">{cat} Recipes</h1>
                                {
                                    filteredRecipes.filter(recipe=>recipe.category.name === cat).map((recipe)=>(
                                        <Link to={`/recipes/${recipe.id}`} key={recipe.id} >
                                            <div className=" border border-2px-black px-4 py-3 rounded-lg hover:border-rose-600 cursor-pointer">
                                                <h1 className="text-xl text-gray-900 font-bold capitalize">{recipe.title}</h1>
                                                <p className="text-lg text-gray-800 ">{recipe.dis}</p>
                                            </div>
                                        </Link> 
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
               )
            }


        </div>
       
    )
}
export default Categories