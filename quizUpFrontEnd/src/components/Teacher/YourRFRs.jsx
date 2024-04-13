import { Formik } from 'formik'
import React from 'react'

export default function YourRFRs() {

  const IV = {
    "quiz": [
      {
        "que": "",
        "options": [""],
        "corr": "0",
      }
    ],
    "code": "",
    "dura": 0,
    "users": [""],
    "teacher": "",
    "publicc": true,
    "des": "",
    "name": ""
  }

  return (
    <>
      <div className='container mt-5 d-flex gap-3'>
        <p className='fs-1 fw-bolder'>Your courses</p>
        <div className='d-flex align-items-center '>
          <button className='btn btn-success'>+</button>
        </div>
        <div className='d-flex align-items-center '>
          <button className='btn btn-warning'>Existing RFRs</button>
        </div>
      </div>
      <div>
        <Formik initialValues={IV}>
          <Form>
            <div className=''>

            </div>
          </Form>
        </Formik>
      </div>
    </>

  )
}
