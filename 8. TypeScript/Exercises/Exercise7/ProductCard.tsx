type productCard = {
    name: string,
    price: number,
    description?: string
}

export const ProductCard = ({name,price,description}: productCard) => {
  return(
    <div>
        ProductCard
        <h3>{name?'ProductName:' : ''} {name.toUpperCase()}</h3>
        <h3>{price? 'Price:' : '' } $ {price.toFixed()}</h3>
        <h3>{description? 'Description:' : '' } {description}</h3>

    </div>
  )
}
