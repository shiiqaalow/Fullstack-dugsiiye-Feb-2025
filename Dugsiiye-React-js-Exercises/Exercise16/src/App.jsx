
import { useState } from "react"
import {CartContext} from "./CartContext"
import   Products from "./Products"
import   CartSummary from "./CartSummary"

const App =()=>{


  const [products,setProducts] = useState([
    {id:1, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Widget1',price:'150'},
    {id:2, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Gadget1',price:'250'},
    {id:3, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Widget2',price:'130'},
    {id:4, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Gadget2',price:'110'},
    {id:5, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Widget3',price:'90'},
    {id:6, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Gadget3',price:'220'},
    {id:7, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Widget4',price:'170'},
    {id:8, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Gadget4',price:'340'},
    {id:9, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Widget5',price:'144'},
    {id:10, img:'https://tse4.mm.bing.net/th/id/OIP.DhcX1ek4cc26PuIHbOGHTQHaE8?pid=Api&P=0&h=180' , name:'Gadget5',price:'85'},
  ])

  

  const [cartSummary,setCartSummary] = useState([])
  
 return(
  <CartContext.Provider value={{products,setProducts,cartSummary,setCartSummary}}>
    <Products/>
    <CartSummary/>
  </CartContext.Provider>
 )
}
export default  App