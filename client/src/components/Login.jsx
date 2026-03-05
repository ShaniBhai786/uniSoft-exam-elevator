import React, { useState } from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import axios from "axios"
import Institute from './Institute'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'

function Login({onSwitch}) {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [check, setCheck] = useState(false)
    const [display, setDisplay] = useState(false)
    const [loading, setLoading] = useState(false)
    const loginField = [
        {
            type: "text",
            name: "email",
            id: "email",
            placeholder: "",
            label: "Account Email"
        },
        {
            type: "password",
            name: "password",
            id: "password",
            placeholder: "",
            label: "Password"
        }
    ]
    const initialValues = {
        email: "",
        password: ""
    }
    const validationSchema = Yup.object({
        email: Yup.string().email("Inavalid email format use @ ").required("Please Enter Account ID"),
        password: Yup.string().required("Please Enter Account Password")
    })
    const onSubmit = (values, {resetForm}) => {
        const login = axios.post("http://localhost:3001/api/v1/auth/login", values, {withCredentials: true})
        setLoading(true)
        login.then((response) => {
            setData(response.data)
            console.log(response.data);
            setTimeout(() => {
                setDisplay(true)
                localStorage.setItem("instituteData", JSON.stringify(response.data.data.institute));
                navigate("/institute");
                setLoading(false)
            },2000)
        }).catch((error) => {
            console.error(error);
            alert("Login Failed");
            setLoading(false)
        });
        resetForm()
    }
  return (
    <>
      {!display && <div className="container">
        <div className="loginDiv">
            <div className="login">
            <h1 className="login_text">Institute Login</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form className='form'>
                        <div className="inputs_div">
                            {
                                loginField.map((field, index) => {
                                    return(
                                        <div className="input" key={index}>
                                            <Field type={field.type} className="input_field" name={field.name} id={field.id} placeholder="" />
                                            <ErrorMessage name={field.name} component="div" className='error' />
                                            <label htmlFor={field.name} className='label'>{field.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="noAccount">
                            <span>Not registered yet! </span>&nbsp;<span className='reg' onClick={onSwitch}> register now</span>
                        </div>
                        <div className="remember">
                            <label htmlFor="check">remember me</label>
                            <input type="checkbox" name="check" id="check" onChange={(e) => setCheck(e.currentTarget.result)} />
                        </div>
                        <div className="btndiv">
                            <button type='submit' className="btnSubmit">Login</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
      </div>}
      {
        loading && <Loading />
      }
      {display && <div className="institute">
        <Institute data={data.data.institute} />
      </div>}
    </>
  )
}

export default Login
