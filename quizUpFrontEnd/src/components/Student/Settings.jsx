import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import AuthCon from '../../context/AuthPro'

const passChangeSchema = Yup.object().shape({
  pass: Yup.string()
    .required("Password is required!")
    .min(6, 'Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  cpass: Yup.string()
    .required("Confirm Password is required!")
    .min(6, 'Confirm Password must be at least 6 characters long')
    .oneOf([Yup.ref('pass'), null], 'Passwords must match')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
});

export default function Settings() {
  const { user, auth } = useContext(AuthCon)
  console.log(user);
  async function subChangePass(values) {
    const response = await fetch('http://localhost:3000/user/passChange', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify({ ...values, id: user._id, role: user.role }),
    });
    const res = await response.json();
    console.log(res);
  }

  return (
    <div className='d-flex gap-3 justify-content-center vh-100'>
      <div className='d-flex mt-5'>
        <Formik
          initialValues={{ pass: '', cpass: '' }} validationSchema={passChangeSchema} onSubmit={(values, actions) => { console.log(values); subChangePass(values) }} >
          <Form className='d-flex flex-column gap-3' style={{ width: "20rem" }} >
            <div className='  '>
              <p className='fs-2 fw-bold mb-3'>Change Password</p>
              <FloatingLabel controlId="floatingInput" label="Enter Password">
                <Field className="form-control" type="password" name="pass" />
              </FloatingLabel>
              <div>
                <ErrorMessage className='text-danger' as="p" name="pass" />
              </div>
            </div>
            <div className='  '>
              <FloatingLabel controlId="floatingInput" label="Confirm Password">
                <Field className="form-control" type="text" name="cpass" />
              </FloatingLabel>
              <div>
                <ErrorMessage className='text-danger' as="p" name="cpass" />
              </div>
            </div>
            <div>
              <button type="submit" className='btn btn-primary'>Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
