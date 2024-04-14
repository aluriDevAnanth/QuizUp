import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';
import AuthCon from '../../context/AuthPro';
import Button from 'react-bootstrap/Button';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as Yup from "yup";

export default function YourRFRs() {
  const { auth } = useContext(AuthCon)
  const [sec, setSec] = useState(1);
  const [RFR, setRFR] = useState();
  const [curr, setCurr] = useState();
  const [curr1, setCurr1] = useState();
  const [open, setOpen] = useState();
  const [iv, setIV] = useState();

  const onOpenModal = () => { setOpen(true); }
  const onCloseModal = () => { setOpen(false); }

  useEffect(() => {
    if (RFR && curr1) {
      const foundRFR = RFR.find(q => q._id === curr1);
      if (foundRFR) {
        const qq = foundRFR.users.join(',')
        console.log(qq);
        setIV(qq);
      }
    }
  }, [curr1, RFR]);

  async function fetchAllMyRFRs() {
    try {
      const response = await fetch(`http://localhost:3000/teacher/rfr/getAllMyRFRs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth}`
        },
      });
      const res = await response.json();
      setRFR(res.data.rfr)
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  async function addStudents({ users }) {
    try {
      console.log("asd", users, curr1);
      const response = await fetch(`http://localhost:3000/teacher/rfr/addStudents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth}`
        },
        body: JSON.stringify({ users, curr1 })
      });
      const res = await response.json();
      setIV(null)
      console.log('add', res);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    fetchAllMyRFRs();
  }, [])

  const IV = {
    "quiz": [
      {
        "que": "",
        "options": [""],
        "corr": "",
      }
    ],
    "code": "",
    "dura": 0,
    "users": [""],
    "teacher": "",
    "publicc": false,
    "des": "",
    "name": ""
  };

  async function addRFR(data) {
    try {
      const response = await fetch(`http://localhost:3000/teacher/rfr/addRFR`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth}`
        },
        body: JSON.stringify({ data })
      });

      const res = await response.json();
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  const addUsersSchema = Yup.object().shape({ users: Yup.string().required('Required'), });

  const addRFRSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    des: Yup.string().required('Required'),
    dura: Yup.number().required('Required').positive('Duration must be positive'),
    quiz: Yup.array().of(
      Yup.object().shape({
        que: Yup.string().required('Required'),
        corr: Yup.string().required('Required'),
        options: Yup.array().of(Yup.string().required('Required'))
      })
    ),
  });

  return (
    <>
      <div className='container mt-5 d-flex gap-3'>
        <p className='fs-1 fw-bolder'>Your RFRs</p>
        <div className='d-flex align-items-center '>
          <button onClick={() => { setSec(2); setCurr(null); }} className='btn btn-success'>+</button>
        </div>
        <div className='d-flex align-items-center '>
          <button onClick={() => { setSec(1); setCurr(undefined); }} className='btn btn-warning'>Existing RFRs</button>
        </div>
      </div>
      {sec === 1 && RFR && <div className='mt-4 container'>
        <Accordion defaultActiveKey="0" alwaysOpen  >
          {RFR.map((q, index) => {
            return <Accordion.Item key={index} eventKey="0" >
              <Accordion.Header>{q.name} </Accordion.Header>
              <Accordion.Body>
                {q.des}
                <div style={{ position: 'relative' }}>
                  <pre className='bg-dark text-white rounded-3' style={{ maxWidth: "100vw", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                    {JSON.stringify(q, null, 2)}
                  </pre>
                  <button className='btn btn-secondary me-3 mt-3' onClick={() => { setSec(2); setCurr(q) }} style={{ position: 'absolute', top: '5px', right: '10px' }} > Edit </button>
                  <Button data={q._id} className='btn btn-secondary me-3 mt-3' style={{ position: 'absolute', top: '5px', right: '70px' }} onClick={(e) => { onOpenModal(e); setCurr1(q._id) }}> Edit Students </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          })}
        </Accordion>
      </div >}
      {
        sec === 2 && <div className='mt-4 container d-flex justify-content-center vw-100'  >
          <Formik initialValues={curr ? curr : IV} validationSchema={addRFRSchema} onSubmit={(values, actions) => {
            addRFR(values);
          }} render={({ values }) => (
            <Form style={{ width: '100%' }}>
              <div className='d-flex gap-3'>
                <div className='mb-3 flex-fill'>
                  <FloatingLabel controlId="floatingInput" label="Name" className="mb-3" >
                    <Field className="form-control" type="text" name="name" placeholder="Email" />
                    <ErrorMessage component="p" className='text-danger' name={`name`} />

                  </FloatingLabel>
                </div>
                <div className='mb-3 flex-fill'>
                  <FloatingLabel controlId="floatingInput" label="des" className="mb-3" >
                    <Field className="form-control" type="text" name="des" placeholder="Email" />
                    <ErrorMessage component="p" className='text-danger' name={`des`} />
                  </FloatingLabel>
                </div>
                <div className='mb-3'>
                  <label className='form-check-label'> <Field className="form-check-input" type="checkbox" name="publicc" />  Public </label>
                </div>
              </div>
              <div className='mb-3 col-6'>
                <FloatingLabel controlId="floatingInput" label="Duration in seconds" className="mb-3" >
                  <Field className="form-control" type="number" name="dura" placeholder="Email" />
                  <ErrorMessage component="p" className='text-danger' name={`dura`} />
                </FloatingLabel>
              </div>
              <div className='mb-3'>
                <FieldArray name="quiz"
                  render={arrayHelpers => (
                    <div>
                      {values.quiz.map((quizItem, index) => (
                        <Accordion key={index} alwaysOpen>
                          <Accordion.Item  >
                            <Accordion.Header>
                              Question {index}
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className='d-flex gap-2'>
                                <button className='btn btn-success' type="button" onClick={() => arrayHelpers.insert(index + 1, { que: '', options: [''], corr: '', })} > + </button>
                                {index > 0 && <button className='btn btn-warning' type="button" onClick={() => arrayHelpers.swap(index, index - 1)} > ↑ </button>}
                                {index < values.quiz.length - 1 && <button className='btn btn-warning' type="button" onClick={() => arrayHelpers.swap(index, index + 1)} > ↓ </button>}
                                <button className='btn btn-danger' type="button" onClick={() => arrayHelpers.remove(index)}>  - </button>
                              </div>
                              <div className='mt-3 d-flex flex-column gap-3'>
                                <div>
                                  <FloatingLabel controlId="floatingInput" label={`Question ${index}`} className=" " >
                                    <Field className="form-control" name={`quiz[${index}].que`} />  </FloatingLabel>
                                  <ErrorMessage component="p" className='text-danger' name={`quiz[${index}].que`} />
                                </div>
                                <div>
                                  <FloatingLabel controlId="floatingInput" label={`Corr`} className=" " >
                                    <Field className="form-control" name={`quiz[${index}].corr`} />  </FloatingLabel>
                                  <ErrorMessage component="p" className='text-danger' name={`quiz[${index}].corr`} />
                                </div>
                                <FieldArray name={`quiz[${index}].options`}>
                                  {(arrayHelpersOptions) => (
                                    <div className=''>
                                      {quizItem.options.map((op, opidx) => (
                                        <div className='mb-3' key={opidx}>
                                          <div className='d-flex w-100'>
                                            <FloatingLabel controlId="floatingInput" label={`Option ${opidx}`} className="  flex-fill" >
                                              <Field className="form-control" name={`quiz[${index}].options[${opidx}]`} />
                                            </FloatingLabel>
                                            <div className='ms-3 mb-3  '>
                                              <button className='btn btn-success me-2' type="button" onClick={() => arrayHelpersOptions.insert(opidx + 1, "")} > + </button>
                                              {opidx ? <button className='btn btn-warning me-2' type="button" onClick={() => arrayHelpersOptions.swap(opidx, opidx - 1)} > ↑ </button> : <></>}
                                              {opidx < quizItem.options.length - 1 ? <button className='btn btn-warning me-2' type="button" onClick={() => arrayHelpersOptions.swap(opidx, opidx + 1)} > ↓ </button> : <></>}
                                              {index > 0 && <button className='btn btn-danger' type="button" onClick={() => arrayHelpersOptions.remove(opidx)} > - </button>}
                                            </div>
                                          </div>
                                          <ErrorMessage className='text-danger' component="p" name={`quiz[${index}].options[${opidx}]`} />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </FieldArray>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      ))}
                    </div>
                  )}
                />
              </div>
              <div>
                <button className="btn btn-primary" type='submit'>Submit</button>
              </div>
            </Form>
          )}>
          </Formik>
        </div>
      }
      {iv && <Modal open={open} onClose={onCloseModal} center>
        <div style={{ color: "black" }} className='mt-4 d-flex flex-column gap-3' >
          <p className='fs-4 fw-bold'>Add Students</p>
          <p className=' '>Add Students through email with comma seperated without any spaces</p>
          <Formik initialValues={{ users: iv }} validationSchema={addUsersSchema} onSubmit={values => { addStudents(values); onCloseModal() }} >
            {({ errors, touched }) => (
              <Form className='d-flex flex-column gap-3'>
                <div className='d-flex  flex-column  gap-3'>
                  <Field as="textarea" className="form-control" name="users" />
                  <ErrorMessage component="p" className='text-danger ' name="users" />
                </div>
                <div>
                  <button className='btn btn-primary' type="submit">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal >}
    </>

  )
}


