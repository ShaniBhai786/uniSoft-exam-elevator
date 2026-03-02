import React, { useState } from 'react'
import {Formik, Form, ErrorMessage, Field} from "formik"
import * as Yup from "yup"
import ProductCard from './ProductCard';

function Products() {
    const [product, setProduct] = useState([])
    const products_fields = [
        {
            type: "text",
            name: "title",
            id: "title",
            label: "Product Title",
        },
        {
            type: "number",
            name: "price",
            id: "price",
            label: "Product Price",
        },
        {
            type: "text",
            name: "description",
            id: "description",
            label: "Product Description",
        },
    ];

    const initialValues = {
        title: "",
        price: "",
        description: "",
        image: null
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Product name is required!"),
        price: Yup.number().required("Product price is required!").positive("Price must be positive"),
        description: Yup.string().required("Product description is required!"),
        image: Yup.mixed().required("Product image is required!")
    })
    const onSubmit = (values) => {
        console.log("Form submitted");
        setProduct(pre => [...pre, values])
    }
  return (
    <>
    <div className="container">
        <div className="add_products_div">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({setFieldValue}) => (
                    <Form className='form'>
                    <div className="inputs_div">
                        {
                            products_fields.map((item, index) => {
                                return(
                                    <div className="input_field" key={index}>
                                    <Field type={item.type} className="input" name={item.name} id={item.id} placeholder="" />
                                    <ErrorMessage name={item.name} className='error' component="div"/>
                                    <label htmlFor={item.name} className='label'>{item.label}</label>
                                </div>
                                )
                            })
                        }
                        <input type="file" name="image" id="image" className="input" onChange={(e) => setFieldValue("image", e.currentTarget.files[0])} />
                        <button type="submit">Create</button>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
        <ProductCard product={product} />
    </div> 
    </>
  )
}

export default Products
