import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthCon from '../../context/AuthPro';

const CoursePage = () => {
	const { id } = useParams();
	const [course, setCourse] = useState();
	const [quiz, setQuiz] = useState();
	const [subSec, setSubSec] = useState();
	const { auth, user } = useContext(AuthCon)

	const fetchCourses = async () => {
		try {
			const res = await fetch(`http://localhost:3000/user/course/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${auth}`,
				},
			});
			const data = await res.json();
			setCourse(data.course);
		} catch (error) {
			console.error('Error fetching courses:', error);
		}
	};

	const showQuiz = (e) => {
		const id = e.currentTarget.querySelector('input[name="id"]').getAttribute('data');
		const iid = id.split(" ")
		const ss = course.subSec.find(q => {
			return q._id === iid[0]
		})
		const quizz = ss.quizzes.find(q => {
			return q._id === iid[1]
		})
		setSubSec(ss)
		setQuiz(quizz)
	}

	useEffect(() => {
		fetchCourses();
	}, [])

	const url = window.location.href;

	async function addStudent(e) {
		const response = await fetch(`http://localhost:3000/user/course/addStudent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${auth}`,
			},
			body: JSON.stringify({ email: user.email, courseId: course?._id })
		});
		const res = await response.json();
		setCourse(res.data.course)
	}

	return (
		<>
			{course ? (
				<div className='d-flex mt-5'>
					{course?.users.includes(user.email) && <Sidebar showQuiz={showQuiz} course={course} />}
					{quiz ?
						<div className='ms-4 container-fluid m-3'>
							<div className='d-flex flex-column box has-background-dark has-text-white rounded-3'>
								<div className='d-flex flex-row justify-content-between'>
									<p className='fs-1 fw-bold text-light'>{quiz.name}</p>
									<div><Link to={`${url}/${subSec._id}/${quiz._id}`} className="btn btn-primary">Start Test</Link></div>
								</div>
								<div className='mt-5'>
									<table className="table table-hover table-stripped table-bordered table-dark">
										<thead>
											<tr className='text-white'>
												<td className='text-white'>#</td>
												<td className='text-white'>Questions</td>
												<td className='text-white'>Duration</td>
												<td className='text-white'>Marks</td>
											</tr>
										</thead>
										<tbody>
											{
												quiz.qss.map(q => {
													return <tr key={q._id}>
														<td scope="row">1</td>
														<td>{q.que.length}</td>
														<td>{q.dura}</td>
														<td>{q.totalMarks}</td>
													</tr>
												})
											}

										</tbody>
									</table>
								</div>
								<div className='mt-5'>
									<p className='text-center fw-medium text-danger'> Start Before: 18 Aug 23 | 11:55 AM (GMT +05:30) </p>
								</div>
							</div>
						</div> : course?.users.includes(user.email) ? <div className='text-center fw-bold fs-1 vw-100'>Select quiz to display</div>
							: <div className='d-flex flex-column align-items-center w-100' >
								<div className='alert alert-danger'>Your are not subscribed. Do so now if you wan to access the course</div>
								{course && <button onClick={addStudent} className="btn btn-primary">Subscribe</button>}
							</div>
					}
				</div>
			) : (
				<div className='text-center vw-100 mt-5'>Loading...</div>
			)}
		</>
	);
};

export default CoursePage;
