import {Link} from "react-router"

const Home = () => {
    return(
        <div className="flex flex-col justify-center mt-7 cursor-pointer">
            <div className="flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Recipe Book</h1>
                <p className="text-xl text-gray-700">Discover delicious and start cooking today!</p>
            </div>
            <div className="flex justify-center items-center gap-5 mt-7">
                <Link to='/recipes' className="bg-rose-700 hover:bg-rose-500 rounded-lg w-70 px-4 py-4 text-center">
                    <h1 className="text-white text-2xl font-bold">Browse Recipes</h1>
                    <p className="text-white text-xl">Explore our collection of delicious recipes </p>
                </Link>
                <div className="bg-rose-700 hover:bg-rose-500 rounded-lg w-70 px-4 py-7 text-center">
                    <h1 className="text-white text-2xl font-bold">Recipes Categories</h1>
                    <p className="text-white text-xl">Find recipes by category </p>
                </div>
            </div>
        </div>
    )
}
export default Home