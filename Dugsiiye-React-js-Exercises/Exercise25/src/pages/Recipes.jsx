import {Link} from "react-router"

 export const recipes = [
        {
            id:1,
            title:'🍓breakfast smoothie bowl',
            dis:'Healthy and colorful breakfast bowl',
            category:{
                name:'breakfast',
                categoryInfo:'Start your day '  
            },
            ingredients:[
                '⭕ 1banana',
                '⭕ 1 cup mixed berries (fresh or frozen)',
                '⭕ ½ cup yogurt',
                '⭕ 1 tablespoon honey',
                '⭕ Toppings: granola, sliced banana, berries, chia seeds'
            ],
            instructions:[
                '1: Blend banana, berries, yogurt, and honey until smooth.',
                '2: Pour into a bowl.',
                '3: Add toppings like granola, fresh fruit, and chia seeds.',
                '4: Serve chilled for best taste.'
            ]
        },
        {
            id:2,
            title:'🥗greek salad',
            dis:'Fresh Mediterranean salad with feta cheese',
             category:{
                 name:'lunch',
                 categoryInfo:'Midday favorites '
            },
            ingredients:[
                '⭕ 2 tomatoes, chopped',
                '⭕ 1 cucumber, sliced',
                '⭕ ½ red onion, sliced',
                '⭕ ½ cup black olives',
                '⭕ ½ cup feta cheese cubes',
                '⭕ Olive oil',
                '⭕ Oregano',
                '⭕ Salt',
            ],
            instructions:[
                '1: Chop tomatoes, cucumber, and onion.',
                '2: Add olives and feta cheese.',
                '3: Drizzle olive oil and sprinkle oregano.',
                '4: Mix gently (do not mash the feta).',
                '4: Serve fresh.'
            ]
        },
             {
            id:3,
            title:'🍝spaghetti carbonara',
            dis:'Traditional italian pasta with creamy egg sauce',
            category:{
                name:'dinner',
                categoryInfo:'Evening meals '
            },
            ingredients:[
                '⭕ Spaghetti',
                '⭕ 2 Eggs',
                '⭕ ½ cup grated Parmesan cheese',
                '⭕ 1 teaspoon black pepper',
                '⭕ Salt to taste',
                '⭕ 1 tablespoon olive oil'
            ],
            instructions:[
                '1: Boil the spaghetti in salted water until al dente.',
                '2: Mix eggs, Parmesan, and black pepper in a bowl.',
                '3: Drain spaghetti (save a little pasta water).',
                '4: Mix hot spaghetti with the egg–cheese mixture quickly.',
                '4: Add a splash of pasta water if it’s too thick.',
                '5: Serve with extra Parmesan.'
            ]
        },
        {
            id:4,
            title:'🍫classic chocolate cake',
            dis:'Rich and moisture chocolate cake perfect for any occasion',
             category:{
                 name:'desserts',
                 categoryInfo:'Sweet meals '
             },
            ingredients:[
                '⭕ 2 cups of flour',
                '⭕ 1 cup of sugar',
                '⭕ 1/2 cup of cocoa',
                '⭕ 3 eggs',
                '⭕ 1 cup of milk',
                '⭕ 1/2 cup melted butter or oil',
            ],
            instructions:[
                '1: Mix the dry ingredients (flour, sugar, cocoa, baking powder). ',
                '2: Add eggs, milk, and melted butter; until smooth.',
                '3: Pour into a baking pan and bake at 350°F (180°C) for 25–30 minutes.'
            ]
        },
    ]

const Recipes = () => {
  
    
    return(
        <div>
            <h1 className="text-3xl font-bold mt-5 text-gray-900 mb-7">All Recipes</h1>
            <div className="flex gap-4 flex-wrap">
                {
                    recipes.map(recipe=>
                        <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="flex flex-col gap-3 items-start cursor-pointer bg-white p-4 rounded-lg w-70">
                            <h1 className="text-2xl font-bold text-gray-900 capitalize">{recipe.title}</h1>
                            <p className="text-lg text-gray-700">{recipe.dis}</p>
                            <span className="bg-red-300 text-red-900 font-bold px-2 rounded-lg">{recipe.category.name}</span>
                        </Link>
                    )
                }
            </div>
          
        </div>
    )
}
export default Recipes
