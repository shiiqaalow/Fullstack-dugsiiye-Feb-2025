
import { useState,useContext } from "react";
import { CartContext } from "./CartContext";


const CartSummary = ()=>{
    const {cartSummary,setCartSummary} = useContext(CartContext)
    const handleDelete=(id)=>{
        setCartSummary(cartSummary.filter(item=>item.id !==id))
    }    
    return(
        <div style={{marginTop:'50px'}}>
            {
                cartSummary.length === 0 ? (
                    <p style={{textAlign:'center'}}>No Items In Your Cart😃😁🤣🤣</p>
                ):(
                    <div>
                        <p style={{textAlign:'center'}}> <strong>cartItem: </strong> ({cartSummary.length})</p>
                        <p style={{textAlign:'center'}}> <strong>Total Price: </strong> (R {cartSummary.reduce((total, item) => total + parseFloat(item.price.replace('R','')), 0)})</p>
                          {
                        cartSummary.map((item)=>
                            <li key={item.id} style={{ display:'flex', alignItems:'center', gap:'20px',marginLeft:'120px', marginBottom: "20px", listStyle: "none" }}>
                                <img src={item.img} style={{width:'65px',borderRadius:'12px'}}/>
                                <span>{item.name}</span>
                                <span>R {item.price}</span>
                                <button onClick={()=>handleDelete(item.id)} className="remove-btn">❌</button>
                            </li>
                        )
                    }
                    </div>
                  
                )
            }
        </div>
    )
}

export default CartSummary;