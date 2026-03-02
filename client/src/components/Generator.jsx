import React, { useState } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import McqsFormat from './McqsFormat'
import LongQuest from './LongQuest'
import ShortQest from './ShortQest'
import DataContainer from './books/class9th/DataContainer'

function Generator() {
    const [format, setFormat] = useState()
    const [shortFormat, setShortFormat] = useState()
    const [longFormat, setLongFormat] = useState()
    const fields = [
        {
            type: "number",
            name: "mcqs",
            id: "mcqs",
            lable: "Required MCQs"
        },
        {
            type: "number",
            name: "marks",
            id: "marks",
            lable: "Marks"
        },
    ]
    const initialValues = {
        mcqs: "0",
        marks: "0"
    }
    const validationSchema = Yup.object({
        mcqs: Yup.number().min(0, "Minimum value is 0").required("Required"),
        marks: Yup.number().min(0, "Minimum value is 0").required("Required")
    })
    const onSubmit = (values, {resetForm}) => {
        console.log(values)
        resetForm()
    }
    const handleFormat = (e) => {
        setFormat(e.target.value === "pick")
    }
    const handleShortFormat = (e) => {
        setShortFormat(e.target.value === "pick")
    }
    const handleLongFormat = (e) => {
        setLongFormat(e.target.value === "pick")
    }
  return (
    <>
     <div className="generateTest">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className='testform'>
                <div className="menuRow">
                    <div className="test_inputs_div">
                        {
                        fields.map((value, index) => {
                            return(
                                <div className="input_Div" key={index}>
                                    <Field type={value.type} className="test_input_field" name={value.name} id={value.id} placeholder={value.placeholder} />
                                    <label className='testlabel' htmlFor={value.name}>{value.lable}</label>
                                    <ErrorMessage name={value.name} component="div" className='error' />
                                </div>
                            )
                        })
                    }
                    <select name="format" id="format" onChange={handleFormat} className='selector'>
                        <option value="random">Random Select</option>
                        <option value="pick">Pick Questions</option>
                    </select>
                    
                    </div>
                    <div className="buttons">
                        <button type='submit'>Generate</button>
                    </div>
                </div>
            </Form>
        </Formik>
        <div className="mcqsMenu">
                        {
                            format === true && <McqsFormat />
                        }
                    </div>
      </div>
      
      <div className="generateTest">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className='testform'>
                <div className="menuRow">
                    <div className="test_inputs_div">
                        {
                        fields.map((value, index) => {
                            return(
                                <div className="input_Div" key={index}>
                                    <Field type={value.type} className="test_input_field" name={value.name} id={value.id} placeholder={value.placeholder} />
                                    <label className='testlabel' htmlFor={value.name}>{value.lable}</label>
                                    <ErrorMessage name={value.name} component="div" className='error' />
                                </div>
                            )
                        })
                    }
                    <div className="">
                        <select name="format" id="format" onChange={handleShortFormat} className='selector'>
                        <option value="random">Random Select</option>
                        <option value="pick">Pick Questions</option>
                    </select>
                    </div>
                    
                    </div>
                    <div className="buttons">
                        <button type='submit'>Generate</button>
                    </div>
                </div>
            </Form>
        </Formik>
        <div className="mcqsMenu" >
                        {
                            shortFormat === true && <ShortQest />
                        }
                    </div>
      </div>

      <div className="generateTest">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className='testform'>
                <div className="menuRow">
                    <div className="test_inputs_div">
                        {
                        fields.map((value, index) => {
                            return(
                                <div className="input_Div" key={index}>
                                    <Field type={value.type} className="test_input_field" name={value.name} id={value.id} placeholder={value.placeholder} />
                                    <label className='testlabel' htmlFor={value.name}>{value.lable}</label>
                                    <ErrorMessage name={value.name} component="div" className='error' />
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="selectorDiv">
                        <select name="format" id="format" onChange={handleLongFormat} className='selector'>
                        <option value="random">Random Select</option>
                        <option value="pick">Pick Questions</option>
                    </select>
                    </div>
                    <div className="buttons">
                        <button type='submit'>Generate</button>
                    </div>
                </div>
            </Form>
        </Formik>
        <div className="mcqsMenu">
                        {
                            longFormat === true && <LongQuest />
                        }
                    </div>
      </div>
    </>
  )
}

export default Generator
