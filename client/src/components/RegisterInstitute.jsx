import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loading from "./Loading";

function RegisterInstitute({ onSwitch }) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [headingValue, setHeadingValue] = useState("Register Your Institute");
  const fields = [
    {
      type: "text",
      name: "name",
      id: "name",
      label: "Institute Name",
    },
    {
      type: "email",
      name: "email",
      id: "email",
      label: "Institute email",
    },
    {
      type: "password",
      name: "password",
      id: "password",
      label: "Institute password",
    },
    {
      type: "text",
      name: "contact",
      id: "contact",
      label: "Institute contact",
    },
    {
      type: "text",
      name: "address",
      id: "address",
      label: "Institute address",
    },
    {
      type: "text",
      name: "about",
      id: "about",
      label: "About Institute",
    },
    {
      type: "text",
      name: "masterUser",
      id: "masterUser",
      label: "Master User",
    },
    {
      type: "text",
      name: "userRole",
      id: "userRole",
      label: "User Role",
    }
  ];
  const initialValues = {
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    about: "",
    profile: "",
    masterUser: "",
    userRole: "",
  };
  const matchingString =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const checkPasswordStrength = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    };
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Account ID"),
    password: Yup.string()
      .matches(
        matchingString,
        "Password must containg uppercase, lowercase, numbers and special characters",
      )
      .required("Please Enter Account Password"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Please Enter Institute Email"),
    contact: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10, "Please enter valid contact number")
      .required("Please enter your contact number"),
    address: Yup.string().required("Please Enter Institute Address"),
    about: Yup.string().required("Please Enter Institute Details"),
    profile: Yup.mixed().required("Please Upload Institute Profile"),
    masterUser: Yup.string().required("Please Enter Master User Name"),
    userRole: Yup.string(),
  });
  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    console.table(values);
    try {
      setLoading(true);
      const register = await axios.post(
        "http://localhost:3001/api/v1/institute/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setTimeout(() => {
        setLoading(false);
        setDisplay(true);
        alert("Registered Successfully");
      }, 1000);
      register.then((response) => {
        console.log(response.data);
      });
      
    } catch (error) {
      console.log("Error while registering institute", error);
    }
    setLoading(false);
    resetForm();
  };
  const onKeyPress = (e) => {
    if (!/[A-Za-z0-9 ]/.test(e.key)) {
      e.preventDefault();
      alert("Special characters are not allowed");
    }
  };
  const onPaste = (e) => {
    e.preventDefault();
    alert("Pasting is disabled!\nPlease type your input manually");
  };
  const handleHeadingChange = (e) => {
    const text = e.target.innerText.trim();
    setHeadingValue(text);
    localStorage.setItem("heading", text);
  };
  const headingRef = React.useRef(null);

  const saveHeading = () => {
    const text = headingRef.current.innerText.trim();
    setHeadingValue(text);
    localStorage.setItem("heading", text);
  };

  useEffect(() => {
    const newValue = localStorage.getItem("heading");
    if (newValue) {
      setHeadingValue(newValue);
    }
  }, []);

  return (
    <>
      {!display && (
        <div className="container">
          <div className="registerDiv">
            <div className="register">
              {/* <button onClick={saveHeading}>Save</button> */}
              <h1
                className="login_text"
                contentEditable
                suppressContentEditableWarning
                onBlur={handleHeadingChange}
                ref={headingRef}
              >
                {headingValue}
              </h1>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values, setFieldValue }) => {
                  const rules = checkPasswordStrength(values.password);
                  return (
                    <Form className="">
                      <div className="register_inputs_div">
                        {fields.map((field, index) => {
                          return (
                            <div className="input" key={index}>
                              <Field
                                type={field.type}
                                onPaste={onPaste}
                                onKeyPress={
                                  field.type === "text" ? onKeyPress : undefined
                                }
                                className="input_field"
                                name={field.name}
                                id={field.id}
                                placeholder=""
                              />
                              {field.name === "password" && values.password && (
                                <div className="password-rules">
                                  <p
                                    style={{
                                      color: rules.length ? "green" : "red",
                                    }}
                                  >
                                    ✔ Minimum 8 characters
                                  </p>
                                  <p
                                    style={{
                                      color: rules.uppercase ? "green" : "red",
                                    }}
                                  >
                                    ✔ Uppercase letter
                                  </p>
                                  <p
                                    style={{
                                      color: rules.lowercase ? "green" : "red",
                                    }}
                                  >
                                    ✔ Lowercase letter
                                  </p>
                                  <p
                                    style={{
                                      color: rules.number ? "green" : "red",
                                    }}
                                  >
                                    ✔ Number
                                  </p>
                                  <p
                                    style={{
                                      color: rules.specialChar
                                        ? "green"
                                        : "red",
                                    }}
                                  >
                                    ✔ Special character
                                  </p>
                                </div>
                              )}

                              <ErrorMessage
                                name={field.name}
                                component="div"
                                className="error"
                              />
                              <label htmlFor={field.name} className="label">
                                {field.label}
                              </label>
                            </div>
                          );
                        })}
                        <div className="input">
                          <input
                            type="file"
                            className="input_field"
                            name="profile"
                            id="profile"
                            onChange={(e) =>
                              setFieldValue("profile", e.currentTarget.files[0])
                            }
                          />
                          <ErrorMessage
                            name="profile"
                            component="div"
                            className="error"
                          />
                          <label htmlFor="profile" className="label">
                            Institute Logo
                          </label>
                        </div>
                      </div>
                      <div className="noAccount">
                        <span>Already Registered</span> &nbsp;{" "}
                        <span className="reg" onClick={onSwitch}>
                          Login
                        </span>
                      </div>
                      <div className="btndiv">
                        <button type="submit" className="btnSubmit">
                          Register Institute
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
    </>
  );
}

export default RegisterInstitute;
