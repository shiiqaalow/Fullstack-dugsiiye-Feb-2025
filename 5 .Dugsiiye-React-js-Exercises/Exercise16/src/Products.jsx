
import { useState,useContext } from "react";
import { CartContext } from "./CartContext";

const Products = ()=>{
    const {products,cartSummary,setCartSummary} = useContext(CartContext)

    const addToCart =(item)=>{
        if(cartSummary.find((i)=>(i.id ===item.id))){
            alert('this item is already in the cart man (did you just forget that!😁🤣)')
            return;
        }
        setCartSummary([...cartSummary,item])
    }
    return(
        <div>
            {products.length === 0 ? (
                <p>No products Found!</p>
            ):(
            <div>
                <h1  className='product-title'>Products 🛒 </h1>
                <div className="products">
                    {products.map((p)=>
                        <div key={p.id} className="product">
                            <img src={p.img} alt="" className="product-img"/>
                            <h3 className="product-name">{p.name}</h3>
                            <p className="product-price">{p.price}</p>
                            <button onClick={()=>addToCart(p)} className="product-btn">AddToCart</button>
                        </div>
                    )
                    }
                </div>
            </div>
            )
            }
        </div>
    )
}

export default Products;