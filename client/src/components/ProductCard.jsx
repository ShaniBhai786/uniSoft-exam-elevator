import React, { useEffect, useState } from 'react'

function ProductCard({product}) {
    const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart_items")
    return storedCart ? JSON.parse(storedCart) : []
  })

  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)


    useEffect(() => {
        localStorage.setItem("cart_items", JSON.stringify(cart))
    }, [cart])
    
    const addToCart = (newItem) => {
        setCart(pre => [...pre, newItem])
        setTotalPrice(pre => pre + (newItem.price))
    }

    const decrease = (id) => {
        if (quantity > 1 ) {
            setQuantity(prev => prev - 1)
        }
    }
    const increase = (id) => {
        setQuantity(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item))
    }
    const clear = () => {
        localStorage.removeItem("cart_items")
        setCart([])
    }
  return (
    <>
    <div className="container">
     {
        product.map((element, index) => {
            return(
                <div className="card" key={index}>
        <div className="item">
            <div className="product_image_div">
                <img src={URL.createObjectURL(element.image)} alt="" width="121px" className="productImage" />
            </div>
            
            <div className="product_details">
                <h3 className="product_name">{element.title}</h3>
                <p className="product_description">{element.description}</p>
                <strong className="product_price">{element.price}</strong>

            </div>

            <div className="products_Button">
                <button className="add_to_cart" onClick={() => addToCart(element)}>Add to Cart</button>
            </div>
        </div>   
     </div>
            )
        })
     }   
    </div> 

    <div className="cart">
        <h1>Shopping Cart</h1>
        {
            cart.map((cart, index) => {
                return(
                    <div className="cartItem" key={index}>
                        <img src={cart.image} width="50px" alt="product_image" />
                        <h3>{cart.title}</h3>
                        <p>{cart.description}</p>
                        <strong>{(cart.price) * quantity}</strong>

                        <div className="qty">
                            <button onClick={() => decrease(cart.id)}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => increase(cart.id)}>+</button>
                        </div>

                    </div>
                )
            })
        }
        <button onClick={clear}>Clear Cart</button>
        <div className="totalPrice">{totalPrice}</div>
    </div>
    </>
  )
}

export default ProductCard
