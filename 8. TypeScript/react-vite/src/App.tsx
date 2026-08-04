import { Welcome } from "../../Exercises/Exercise7/Welcome"
import { ProductCard } from "../../Exercises/Exercise7/ProductCard"
function App() {
  return (
    <>
      <Welcome userName='shiiqaalow' isPremium={true} />
      <ProductCard name='popcorn' price='free' description='Delicious air-popped popcorn' />
    </>
  )
}

export default App
