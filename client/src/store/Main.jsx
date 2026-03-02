import React, { useEffect, useState } from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"

function Main() {
    const [newProduct, setNewProduct] = useState([])
    const [cart, setCart] = useState(() => {
        const storedItems = localStorage.getItem("items_in_cart");
        return storedItems ? JSON.parse(storedItems) : []
    })
    const fields = [
        {
            type: "text",
            name: "title",
            id: "title",
            label: "Product name"
        },
        {
            type: "text",
            name: "description",
            id: "description",
            label: "Product description"
        },
        {
            type: "number",
            name: "price",
            id: "price",
            label: "Product price"
        },
    ]

    const initialValues = {
        title: "",
        description: "",
        price: "",
        image: ""
    }
    const validationSchema = Yup.object({
        title: Yup.string().required("product name is required"),
        description: Yup.string().required("description is required"),
        price: Yup.number().required("product price is required"),
        image: Yup.mixed().required("jsjd")
    })

    const handleSubmit = (values, {resetForm}) => {
        setNewProduct(pre => [...pre, values])
        resetForm()
    }

    useEffect(() => {
        localStorage.setItem("items_in_cart", JSON.stringify(cart))
    }, [cart])
    const addToCart = (newItem) => {
        setCart(prev => [...prev, newItem])
    }
    const clearCart = () => {
        setCart([])
        
        const confirmF = window.confirm("Are you sure you want to delete items permanently")
        if (confirmF) {
            setTimeout(() => {
            localStorage.removeItem("items_in_cart")
            alert("Items are permanently removed")
        },3000)
    }
    else{
        setCart(() => {
            const storedItems = localStorage.getItem("items_in_cart");
        return storedItems ? JSON.parse(storedItems) : [] 
        })
    }
    }
    const onChange = (e, setFieldValue) => {
                    const file = e.currentTarget.files[0];
                    if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFieldValue("image", reader.result);
                    };
                    reader.readAsDataURL(file);
                    }
    }
  return (
    <>
    <div className="contin">
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {
            ({setFieldValue}) => (
                <Form>
            <div className="inputs_div">
                {
                    fields.map((field, index) => {
                        return(
                                <div className="inputs" key={index}>
                                <Field type={field.type} className="input_fie" name={field.name} id={field.id} placholder="" />
                                <ErrorMessage name={field.name} component="div" />
                                <label htmlFor={field.name}>{field.label}</label>
                                </div>
                        )
                    })
                }
                {/* <input type="file" name="image" id="image" onChange={(e) => setFieldValue("image", e.currentTarget.files[0]) } /> */}
                <input type="file" name="image" id="image" onChange={(e) => onChange(e, setFieldValue)}
                />
                <button type='submit'>Create New Product</button>
            </div>
        </Form>
            )
        }
    </Formik>
    </div> 

    <div className="products">
        <h1>Your Products</h1>
        <div className="productList">
                {
                    newProduct.map((item, index) => {
                        return(
                            <div className="newItem" key={index}>
                                <img src={item.image} width="100px" alt="" />
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <strong>Rs. {item.price}/-</strong>
                                <button onClick={() => addToCart(item)}>Add To Cart</button>
                            </div>
                        )
                    })
                }
        </div>
    </div>
    <div className="cart">
        <h1>Shopping Cart</h1>
        <div className="cart_items">
            <button onClick={clearCart}>Clear Cart</button>
                {
                    cart.map((cartItem, index) => {
                        return(
                            <div className="item" key={index}>
                                <img src={cartItem.image} alt="cart item image" width="30px" />
                                <h2>{cartItem.title}</h2>
                                <p>{cartItem.description}</p>
                                <strong>Rs. {cartItem.price}/-</strong>
                            </div>
                        )
                    })
                }
        </div>
    </div>
    </>
  )
}

export default Main
