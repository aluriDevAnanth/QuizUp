import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Button, Accordion } from 'react-bootstrap';
import * as Yup from 'yup';
import AuthCon from '../../../context/AuthPro';

const initialValues = {
  name: '',
  des: '',
  publicc: false,
  start: '',
  exp: '',
  subSec: [{
    name: '',
    start: '',
    exp: '',
    quizzes: [{
      name: '',
      prevDisabled: false,
      qss: [{
        dura: 0,
        totalMarks: 0,
        que: [
          {
            que: "",
            options: [''], corr: ''
          }
        ],
      }],
      score: 0,
      HighScore: 0,
      avgScore: 0,
      startDate: '',
      compDate: '',
      dura: 0,
      totalMarks: 0,
    }]
  }]
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Course name is required'),
  des: Yup.string().required('Course description is required'),
  start: Yup.date().required('Course start time is required'),
  exp: Yup.date()
    .required('Course end time is required')
    .when(['start'], (start, schema) => {
      return schema.test({
        test: value => {
          const startDate = new Date(start);
          const expDate = new Date(value);
          return expDate > startDate;
        },
        message: 'Course end time must be after the start time',
      });
    }),
  subSec: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Subsection name is required'),
      start: Yup.date().required('Subsection start time is required'),
      exp: Yup.date()
        .required('Subsection end time is required')
        .when(['start'], (start, schema) => {
          return schema.test({
            test: value => {
              const startDate = new Date(start);
              const expDate = new Date(value);
              return expDate > startDate;
            },
            message: 'Subsection end time must be after the start time',
          });
        }),
      quizzes: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Quiz name is required'),
          startDate: Yup.date().required('Quiz start time is required'),
          compDate: Yup.date()
            .required('Quiz end time is required')
            .when(['startDate'], (startDate, schema) => {
              return schema.test({
                test: value => {
                  const quizStartDate = new Date(startDate);
                  const compDate = new Date(value);
                  return compDate > quizStartDate;
                },
                message: 'Quiz end time must be after the start time',
              });
            }),
          dura: Yup.number().required('Quiz duration is required'),
          totalMarks: Yup.number().required('Quiz total marks are required'),
          qss: Yup.array().of(
            Yup.object().shape({
              dura: Yup.number().required('Qss duration is required'),
              totalMarks: Yup.number().required('Qss total marks are required'),
              que: Yup.array().of(
                Yup.object().shape({
                  que: Yup.string().required('Question is required'),
                  options: Yup.array().of(Yup.string()).required('This Option is required'),
                  corr: Yup.string().required('Correct answer is required')
                })
              )
            })
          )
        })
      )
    })
  )
});

/* const data = {
  "name": "Dummy Course2006-01-03T22:22:38",
  "des": "Purpose according positive type throughout let traditional their. War energy teacher soon world recognize.",
  "subSec": [
    {
      "name": "who",
      "quizzes": [
        {
          "qss": [
            {
              "que": [
                {
                  "que": "About expect question source.",
                  "options": ["everybody", "term", "rest", "let", "vgh"],
                  "markedForReview": false,
                  "corr": "everybody"
                }
              ],
              "dura": 25,
              "totalMarks": 42
            },
            {
              "que": [
                {
                  "que": "Season article art cause message.",
                  "options": ["party", "charge", "reveal", "thus"],
                  "markedForReview": false,
                  "corr": "party"
                }
              ],
              "dura": 52,
              "totalMarks": 40
            },
            {
              "que": [
                {
                  "que": "Ready less walk debate support president oil.",
                  "options": ["science", "customer", "floor", "full"],
                  "markedForReview": false,
                  "corr": "science"
                }
              ],
              "dura": 34,
              "totalMarks": 33
            }
          ],
          "name": "have",
          "score": "12",
          "HighScore": "15",
          "avgScore": "12",
          "startDate": "2005-04-24T18:10:29",
          "compDate": "1997-10-13T20:25:24",
          "dura": "1970-02-22T19:57:31",
          "totalMarks": "30",
          "markedForReview": [false, true],
          "corr": ["B", "C"]
        },
        {
          "qss": [
            {
              "que": [
                {
                  "que": "Man skill goal design letter join government take.",
                  "options": ["upon", "organization", "show", "understand"],
                  "markedForReview": true,
                  "corr": "upon"
                }
              ],
              "dura": 10,
              "totalMarks": 29
            },
            {
              "que": [
                {
                  "que": "Show under affect air student nothing walk.",
                  "options": ["set", "very", "positive", "he"],
                  "markedForReview": false,
                  "corr": "set"
                }
              ],
              "dura": 41,
              "totalMarks": 29
            },
            {
              "que": [
                {
                  "que": "Left could clear population stock.",
                  "options": ["church", "put", "single", "memory"],
                  "markedForReview": false,
                  "corr": "church"
                }
              ],
              "dura": 48,
              "totalMarks": 47
            }
          ],
          "name": "environmental",
          "score": "20",
          "HighScore": "19",
          "avgScore": "14",
          "startDate": "2002-12-07T21:03:38",
          "compDate": "1990-04-14T01:56:20",
          "dura": "1993-05-25T07:43:53",
          "totalMarks": "30",
          "markedForReview": [true, true],
          "corr": ["B", "B"]
        }
      ],
      "start": "1970-03-22T00:32:19",
      "exp": "1977-03-10T16:39:37"
    }
  ],
  "start": "1970-03-22T00:32:19",
  "exp": "1978-01-07T03:16:20"
} */


export default function AddCourse({ curr, setCurr, setView }) {
  const { auth } = useContext(AuthCon)

  async function addCourse(data) {
    try {
      const response = await fetch(`http://localhost:3000/teacher/course/addCourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth}`
        },
        body: JSON.stringify({ data })
      });

      const res = await response.json();
      console.log('add', res);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  async function editCourse(data) {
    console.log('edit');
    try {
      const response = await fetch(`http://localhost:3000/teacher/course/editCourse`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth}`
        },
        body: JSON.stringify({ data })
      });

      const res = await response.json();
      console.log('edit', res);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  /* useEffect(() => {
    console.log('render');
  }, []); */

  const handleSubmit = async (values) => {
    console.log(11, values);
    try {
      if (curr) {
        await editCourse(values); // Assuming editCourse is asynchronous
      } else {
        await addCourse(values); // Assuming addCourse is asynchronous
      }
      setCurr(null);
      setView(11);
    } catch (error) {
      console.error('Error while executing editCourse/addCourse:', error);
      // Handle the error accordingly (e.g., show an error message)
    }
  };

  return (
    <div className='container-fluid'>
      <div>
        <Formik validationSchema={validationSchema} initialValues={curr ? curr : initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className=' mb-3'>
              <div className='d-flex gap-3'>
                <div className="form-floating mb-3 flex-fill">
                  <Field className="form-control" name='name' id='name' type="text" />
                  <label htmlFor="name">Course name</label>
                  <ErrorMessage className="text-danger" component="p" name="name" />
                </div>
                <div className="form-floating mb-3 flex-fill">
                  <Field className="form-control" as="textarea" name='des' id='des' type="textarea" />
                  <label htmlFor="des">Course Des</label>
                  <ErrorMessage className="text-danger" component="p" name="des" />
                </div>
              </div>
              <div className='d-flex gap-3'>
                <div className="form-floating mb-3">
                  <Field className="form-control" name='start' id='start' type="datetime-local" />
                  <label htmlFor="start">Course Start Time</label>
                  <ErrorMessage className="text-danger" component="p" name="start" />
                </div>
                <div className="form-floating mb-3">
                  <Field className="form-control" name='exp' id='exp' type="datetime-local" />
                  <label htmlFor="exp">Course End Time</label>
                  <ErrorMessage className="text-danger" component="p" name="exp" />
                </div>
                <div className="form-check mb-3">
                  <Field className="form-check-input" name='publicc' id='publicc' type="checkbox" />
                  <label htmlFor="publicc">Is Course Public?</label>
                  <ErrorMessage className="text-danger" component="p" name="publicc" />
                </div>
              </div>

            </div>
            <div className='mb-3'>
              <FieldArray name="subSec">
                {(props) => {
                  const { form, insert, remove, swap } = props;
                  const { values } = form;
                  const { subSec } = values;
                  return (
                    <Accordion data-bs-theme="dark" defaultActiveKey={[0]} alwaysOpen>
                      {subSec.map((ss, i) => (
                        <Accordion.Item key={i} eventKey={i}>
                          <Accordion.Header>Subsection {i + 1}</Accordion.Header>
                          <Accordion.Body>
                            <div className='d-flex gap-3'>
                              <div className='form-floating mb-3 flex-fill'>
                                <Field className="form-control" name={`subSec[${i}].name`} id={`subSec[${i}].name`} type="text" />
                                <label htmlFor={`subSec[${i}].name`}>Subsection name</label>
                                <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].name`} />
                              </div>
                              <div className='form-floating mb-3'>
                                <Field className="form-control" name={`subSec[${i}].start`} id={`subSec[${i}].start`} type="datetime-local" />
                                <label htmlFor={`subSec[${i}].start`}>Subsection Start</label>
                                <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].start`} />
                              </div>
                              <div className='form-floating mb-3'>
                                <Field className="form-control" name={`subSec[${i}].exp`} id={`subSec[${i}].exp`} type="datetime-local" />
                                <label htmlFor={`subSec[${i}].exp`}>Subsection Exp</label>
                                <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].exp`} />
                              </div>
                              <div className='d-flex align-items-center gap-2'>
                                <Button variant="primary" onClick={() => insert(i + 1, {
                                  name: '', start: '', exp: '', quizzes: [{
                                    name: '', score: 0, HighScore: 0, avgScore: 0, startDate: '', compDate: '', dura: 0, totalMarks: 0, qss: [{
                                      dura: 0, totalMarks: 0, que: [{ que: "", options: [''], corr: '' }]
                                    }]
                                  }]
                                })}>+</Button>
                                {i > 0 && <Button variant="warning" onClick={() => swap(i, i - 1)}>↑</Button>}
                                {i < subSec.length - 1 ? <Button variant="warning" onClick={() => swap(i, i + 1)}>↓</Button> : <></>}
                                {i > 0 && <Button variant="danger" onClick={() => remove(i)}>-</Button>}
                              </div>
                            </div>
                            <div >
                              <FieldArray name={`subSec[${i}].quizzes`}>
                                {(qprops) => {
                                  const { form, insert, remove, swap } = qprops;
                                  const { values } = form;
                                  const { quizzes } = values.subSec[i];
                                  //console.log(values);
                                  return (
                                    <Accordion defaultActiveKey={[0]} alwaysOpen>
                                      {quizzes.map((quiz, ii) => (
                                        <Accordion.Item key={ii} eventKey={ii}>
                                          <Accordion.Header>Quiz {ii + 1}</Accordion.Header>
                                          <Accordion.Body>
                                            <div className='d-flex gap-3'>
                                              <div className='flex-fill'>
                                                <div className='d-flex gap-3'>
                                                  <div className='form-floating mb-3 flex-fill'>
                                                    <Field type="text" className="form-control" name={`subSec[${i}].quizzes[${ii}].name`} id={`subSec[${i}].quizzes[${ii}].name`} />
                                                    <label htmlFor={`subSec[${i}].quizzes[${ii}].name`}>Quiz Name</label>
                                                    <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].name`} />
                                                  </div>
                                                  <div className='form-floating mb-3 '>
                                                    <Field className="form-control" name={`subSec[${i}].quizzes[${ii}].startDate`} id={`subSec[${i}].quizzes[${ii}].startDate`} type="datetime-local" />
                                                    <label htmlFor={`subSec[${i}].quizzes[${ii}].startDate`}>Quiz Start</label>
                                                    <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].startDate`} />
                                                  </div>

                                                  <div className="form-check mb-3">
                                                    <Field className="form-check-input" name={`subSec[${i}].quizzes[${ii}].prevDisabled`} id={`subSec[${i}].quizzes[${ii}].prevDisabled`} type="checkbox" />
                                                    <label htmlFor={`subSec[${i}].quizzes[${ii}].prevDisabled`}>Previous   Disabled</label>
                                                    <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].prevDisabled`} />
                                                  </div>
                                                </div>
                                                <div className='d-flex gap-3'>
                                                  <div className='form-floating mb-3  '>
                                                    <Field type="datetime-local" className="form-control" name={`subSec[${i}].quizzes[${ii}].compDate`} id={`subSec[${i}].quizzes[${ii}].compDate`} />
                                                    <label htmlFor={`subSec[${i}].quizzes[${ii}].compDate`}>Quiz Exp</label>
                                                    <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].compDate`} />
                                                  </div>
                                                  <div className='form-floating mb-3  '>
                                                    <Field type="number" className="form-control" name={`subSec[${i}].quizzes[${ii}].dura`} id={`subSec[${i}].quizzes[${ii}].dura`} />
                                                    <label htmlFor={`subSec[${i}].quizzes[${ii}].dura`}>Quiz Dura In Mins</label>
                                                    <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].dura`} />
                                                  </div>
                                                  <div className='form-floating mb-3 '>
                                                    <Field type="number" className="form-control" name={`subSec[${i}].quizzes[${ii}].totalMarks`} id={`subSec[${i}].quizzes[${ii}].totalMarks`} />
                                                    <label htmlFor={`subSec[${i}].quizzes[${ii}].totalMarks`}>Quiz Total Marks</label>
                                                    <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].totalMarks`} />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className='d-flex align-items-center gap-2'>
                                                <Button variant="primary" onClick={() => insert(i + 1, {
                                                  name: "", score: 0, HighScore: 0, avgScore: 0, startDate: "", compDate: "", dura: 0, totalMarks: 0, qss: [{
                                                    dura: 0, totalMarks: 0, que: [{ que: "", options: [''], corr: '' }]
                                                  }]
                                                })}>+</Button>
                                                {ii > 0 && <Button variant="warning" onClick={() => swap(ii, ii - 1)}>↑</Button>}
                                                {ii < quizzes.length - 1 && <Button variant="warning" onClick={() => swap(ii, ii + 1)}>↓</Button>}
                                                {ii > 0 && <Button variant="danger" onClick={() => remove(ii)}>-</Button>}
                                              </div>
                                            </div>
                                            <FieldArray name={`subSec[${i}].quizzes[${ii}].qss`}>
                                              {(qssProps) => {
                                                const { form, insert: qssInsert, remove: qssRemove, swap: qssSwap } = qssProps
                                                const { values } = form
                                                const { qss } = values.subSec[i].quizzes[ii]
                                                return (
                                                  <Accordion defaultActiveKey={[0]} alwaysOpen>
                                                    {qss.map((qq, iii) => (
                                                      <Accordion.Item key={iii} eventKey={iii}>
                                                        <Accordion.Header>Quiz SubSec {iii}</Accordion.Header>
                                                        <Accordion.Body>
                                                          <div key={iii} className='d-flex gap-3'>
                                                            <div className='form-floating mb-3 flex-fill'>
                                                              <Field type="number" className="form-control" name={`subSec[${i}].quizzes[${ii}].qss[${iii}].dura`} id={`subSec[${i}].quizzes[${ii}].qss[${iii}].dura`} />
                                                              <label htmlFor={`subSec[${i}].quizzes[${ii}].qss[${iii}].dura`}>Qss Dura</label>
                                                              <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].qss[${iii}].dura`} />
                                                            </div>
                                                            <div className='form-floating mb-3 flex-fill'>
                                                              <Field type="number" className="form-control" name={`subSec[${i}].quizzes[${ii}].qss[${iii}].totalMarks`} id={`subSec[${i}].quizzes[${ii}].qss[${iii}].totalMarks`} />
                                                              <label htmlFor={`subSec[${i}].quizzes[${ii}].qss[${iii}].totalMarks`}>Qss Total Marks</label>
                                                              <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].qss[${iii}].totalMarks`} />
                                                            </div>
                                                            <div className='d-flex align-items-center gap-2'>
                                                              <Button variant="primary" onClick={() => qssInsert(iii + 1, {
                                                                dura: 0, totalMarks: 0, que: [{ que: "", options: [''], corr: '' }]
                                                              })}>+</Button>
                                                              {iii > 0 && <Button variant="warning" onClick={() => qssSwap(iii, iii - 1)}>↑</Button>}
                                                              {iii < qss.length - 1 && <Button variant="warning" onClick={() => qssSwap(iii, iii + 1)}>↓</Button>}
                                                              <Button variant="danger" onClick={() => qssRemove(iii)}>-</Button>
                                                            </div>
                                                          </div>
                                                          <div>
                                                            <FieldArray name={`subSec[${i}].quizzes[${ii}].qss[${iii}].que`}>
                                                              {(queProps) => {
                                                                const { form, insert, remove, swap } = queProps;
                                                                const { values } = form;
                                                                const queArray = values.subSec[i].quizzes[ii].qss[iii].que;
                                                                return (
                                                                  <div>
                                                                    {Array.isArray(queArray) && queArray.map((queItem, iiii) => (
                                                                      <Accordion key={iiii} defaultActiveKey={[0]} alwaysOpen>
                                                                        <Accordion.Item eventKey={iiii}>
                                                                          <Accordion.Header>Que {iiii + 1}</Accordion.Header>
                                                                          <Accordion.Body>
                                                                            <div className=''>
                                                                              <div className='d-flex gap-3'>
                                                                                <div className='flex-fill d-flex flex-column'>
                                                                                  <div className='form-floating mb-3 flex-fill'>
                                                                                    <Field type="text" className="form-control" name={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].que`} id={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].que`} />
                                                                                    <label htmlFor={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].que`}> Que</label>
                                                                                    <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].que`} />
                                                                                  </div>
                                                                                  <div className='form-floating mb-3 flex-fill'>
                                                                                    <Field type="text" className="form-control" name={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].corr`} id={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].corr`} />
                                                                                    <label htmlFor={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].corr`}> Corr as same as option(copy paste the option)</label>
                                                                                    <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].corr`} />
                                                                                  </div>
                                                                                </div>

                                                                                <div className='d-flex align-items-center gap-2'>
                                                                                  <Button variant="primary" onClick={() => insert(iiii + 1, {
                                                                                    que: "", options: [''], corr: ''
                                                                                  })}>+</Button>
                                                                                  {iiii > 0 ? <Button variant="warning" onClick={() => swap(iiii, iiii - 1)}>↑</Button> : <></>}
                                                                                  {iiii < queArray.length - 1 ? <Button variant="warning" onClick={() => swap(iiii, iiii + 1)}>↓</Button> : <></>}
                                                                                  <Button variant="danger" onClick={() => remove(iiii)}>-</Button>
                                                                                </div>
                                                                              </div>
                                                                              <div className="border border-5 rounded-5 border-secondary p-3">
                                                                                <FieldArray name={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].options`}>
                                                                                  {(opProps) => {
                                                                                    const { form, insert, swap, remove } = opProps;
                                                                                    const { values } = form;
                                                                                    const optionsArray = values.subSec[i].quizzes[ii].qss[iii].que[iiii].options;

                                                                                    return (
                                                                                      <div className="">
                                                                                        {Array.isArray(optionsArray) && optionsArray.map((option, opIndex) => (
                                                                                          <div className='mb-3' key={opIndex}><div className="col-12 " >
                                                                                            <div className="form-floating d-flex gap-3">
                                                                                              <Field
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                name={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].options[${opIndex}]`}
                                                                                                id={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].options[${opIndex}]`}
                                                                                              />
                                                                                              <label htmlFor={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].options[${opIndex}]`}>Option {opIndex + 1}</label>
                                                                                              <div className='d-flex align-items-center gap-2'>
                                                                                                {opIndex > 0 && <Button variant="warning" onClick={() => swap(opIndex, opIndex - 1)}>↑</Button>}
                                                                                                {opIndex < optionsArray.length - 1 && <Button variant="warning" className='' onClick={() => swap(opIndex, opIndex + 1)}>↓</Button>}
                                                                                                <Button variant="primary" onClick={() => insert(opIndex + 1, '')}>+</Button>
                                                                                                {opIndex > 0 && (
                                                                                                  <Button variant='danger' onClick={() => remove(opIndex)}>-</Button>
                                                                                                )}

                                                                                              </div>
                                                                                            </div>
                                                                                          </div>
                                                                                            <ErrorMessage className="text-danger" component="p" name={`subSec[${i}].quizzes[${ii}].qss[${iii}].que[${iiii}].options[${opIndex}]`} /></div>
                                                                                        ))}
                                                                                      </div>

                                                                                    );
                                                                                  }}
                                                                                </FieldArray>
                                                                              </div>


                                                                            </div>
                                                                          </Accordion.Body>
                                                                        </Accordion.Item>
                                                                      </Accordion>
                                                                    ))}
                                                                  </div>
                                                                );
                                                              }}
                                                            </FieldArray>


                                                          </div>
                                                        </Accordion.Body>
                                                      </Accordion.Item>
                                                    ))}
                                                  </Accordion>
                                                );
                                              }}
                                            </FieldArray>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      ))}
                                    </Accordion>
                                  );
                                }}
                              </FieldArray>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  );
                }}
              </FieldArray>
            </div>
            <div>
              <Button type='submit' className='btn btn-primary'>Submit</Button>
            </div>
          </Form>
        </Formik >
      </div >
    </div >
  );
}
