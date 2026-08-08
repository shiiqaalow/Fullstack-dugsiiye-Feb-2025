import { Welcome } from "./components/Welcome"
import { ProductCard } from "./components/ProductCard"
function App() {
  return (
    <>
      <Welcome userName='shiiqaalow' isPremium={true} />
      <ProductCard name='popcorn' price='free' description='Delicious air-popped popcorn' />
    </>
  )
}

export default App