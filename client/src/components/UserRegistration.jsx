import React, { useState } from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import axios from 'axios'
import Loading from './Loading' 

function UserRegistration({onSwitch}) {
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState(false)
  const fields = [
    {
        type: "text",
        name: "username",
        id: "username",
        label: "Username"
    },
    {
        type: "text",
        name: "email",
        id: "email",
        label: "Email"
    },
    {
        type: "password",
        name: "password",
        id: "password",
        label: "Password"
    },
    {
        type: "text",
        name: "contact", 
        id: "contact",
        label: "Contact"
    },
    {
      type: "text",
      name: "institute",
      id: "institute",
      label: "Institute Name"
    },
    {
        type: "text",
        name: "FullName",
        id: "FullName",
        label: "FullName"
    },
    {
        type: "date",
        name: "dob",
        id: "dob",
        label: "Date of Birth"
    },
  ]
  const initialValues = {
          username: "",
          email: "",
          password: "",
          contact: "",
          FullName: "",
          userStatus: "",
          institute: "",
          dob: ""
      }
      const validationSchema = Yup.object({
          username: Yup.string().required("Please Enter username"),
          password: Yup.string().required("Please Enter Account Password"),
          email: Yup.string().email("Invalid email format").required("Please Enter Institute Email"),
          contact: Yup.number().typeError("That doesn't look like a phone number").positive("A phone number can't start with a minus").integer("A phone number can't include a decimal point").min(10, "Please enter valid contact number").required("Please enter your contact number"),
          FullName: Yup.string().required("Please Enter Institute FullName"),
          userStatus: Yup.string().required("Please Enter Institute Details"),
          institute: Yup.string().required("Please Enter Institute Neme"),
          dob: Yup.date().required("Date Of Birth is required")
      })
      const onSubmit = async (values, {resetForm}) => {
        const formData = new FormData()
        for (let key in values) {
          formData.append(key, values[key])
        }
          console.log(values);
          try {
            setLoading(true)
            const register = await axios.post("http://localhost:3001/api/v2/user/register", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            setTimeout(() => {
              setDisplay(true)
              setLoading(false)
            },1000)
          } catch (error) {
            console.log("Error while registering user", error);
          }
          resetForm()
      }
  return (
    <>
      {!display && <div className="container">
        <div className="registerDiv">
                <div className="register">
                  <h1 className="login_text">User Registration</h1>
                  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                      ({setFieldValue}) => (
                        <Form className='form'>
                      <div className="register_inputs_div">
                        {
                          fields.map((field, index) => {
                            return(
                              <div className="input" key={index}>
                                <Field type={field.type} className="input_field" name={field.name} id={field.id} placeholder="" />
                                <ErrorMessage name={field.name} component="div" className='error' />
                                <label htmlFor={field.name} className='label'>{field.label}</label>
                              </div>
                            )
                          })
                        }
                        <div className="input">
                          <input type="file" className="input_field"  name="avatar" id="avatar" onChange={(e) => setFieldValue("avatar" ,e.currentTarget.files[0])} />
                        <ErrorMessage name="avatar" component="div" className='error' />
                        <label htmlFor="avatar" className='label'>Profile Picture</label>
                        </div>

                        <div className="input">
                          <select name="userStatus" id="userStatus" onChange={(e) => setFieldValue("userStatus", e.target.value)}>
                            <option value="">Choose User Status</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>
                       <div className="noAccount">
                                    <span>Already Registered</span> &nbsp; <span className='reg' onClick={onSwitch} >Login</span>
                                </div>
                      <div className="btndiv">
                        <button type='submit' className='btnSubmit'>Register</button>
                      </div>
                    </Form>
                      )
                    }
                  </Formik>
                </div>
                </div>
      </div>}
      {
        loading && <Loading />
      }
    </>
  )
}

export default UserRegistration
