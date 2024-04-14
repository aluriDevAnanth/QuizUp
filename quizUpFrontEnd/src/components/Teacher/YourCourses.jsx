import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Accordion, AccordionHeader, AccordionBody } from 'react-bootstrap';
import * as Yup from 'yup';
import AddCourse from './components/AddCourse';
import AuthCon from '../../context/AuthPro';
import { Modal } from 'react-responsive-modal';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

/* const initialValues = {
	name: '',
	des: '',
	start: '',
	exp: '',
	subSec: [{
		name: '',
		start: '',
		exp: '',
		quizzes: [{
			name: '',
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
}; */

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
									options: Yup.array().of(Yup.string()).min(2, 'At least two options are required'),
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

const data = {
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
}

export default function YourCourses() {
	const { auth } = useContext(AuthCon)
	const [view, setView] = useState(11)
	const [courses, setCourses] = useState()
	const [curr, setCurr] = useState()
	const [open, setOpen] = useState()

	const onOpenModal = () => { setOpen(true); }
	const onCloseModal = () => { setOpen(false); }

	async function editStudents({ users }) {
		try {
			const response = await fetch(`http://localhost:3000/teacher/course/editStudents`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${auth}`
				},
				body: JSON.stringify({ users, curr })
			});
			const res = await response.json();
		} catch (error) {
			console.error('Error fetching courses:', error);
		}
	}

	async function fetchAllMyCourses() {
		try {
			const response = await fetch(`http://localhost:3000/teacher/course/getAllMyCourses`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${auth}`,
				},
			});

			const res = await response.json();
			setCourses(res.data);
		} catch (error) {
			console.error('Error fetching courses:', error);
		}
	}

	useEffect(() => {
		fetchAllMyCourses();
	}, [view]);

	return (
		<div className='container'>
			<div className='d-flex mb-5'>
				<div className='me-4'>
					<p className='fs-1 fw-bold'>Your Courses</p>
				</div>
				<div className='mt-1'>
					<button onClick={() => { setCurr(null); setView(22) }} className='btn btn-success mt-2 me-3'>+</button>
					<button onClick={() => { setCurr(null); setView(11) }} className='btn btn-warning mt-2'>Existing Courses</button>
				</div>
			</div>
			{view === 11 && <div>
				{courses && courses.map((q, i) => {
					return <Accordion key={i} value={q._id} data-bs-theme="dark" alwaysOpen>
						<AccordionHeader>{q.name}</AccordionHeader>
						<AccordionBody>
							<div style={{ position: 'relative' }}>
								<JsonView data={q} shouldExpandNode={allExpanded} style={{ ...defaultStyles, minHeigth: "100px" }} />
								<button className='btn btn-secondary me-3 mt-3' onClick={() => { setView(22); setCurr(q) }} style={{ position: 'absolute', top: '5px', right: '5px' }} > Edit </button>
								<button className='btn btn-secondary me-3 mt-3' onClick={(e) => { onOpenModal(); setCurr(q) }} style={{ position: 'absolute', top: '5px', right: '70px' }} > Edit Students </button>
							</div>
						</AccordionBody>
					</Accordion>
				})}
			</div>}
			{view === 22 && <div>
				<AddCourse curr={curr} setCurr={setCurr} setView={setView} />
			</div>}
			{curr && <Modal open={open} onClose={onCloseModal} center>
				<div style={{ color: "black" }} className='mt-4 d-flex flex-column gap-3' >
					<p className='fs-4 fw-bold'>Edit Students</p>
					<p className=' '>Edit Students through email with comma seperated without any spaces</p>
					<Formik initialValues={{ users: curr.users.join(',') }} onSubmit={values => { editStudents(values); onCloseModal() }} >
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
		</div >
	);
}
