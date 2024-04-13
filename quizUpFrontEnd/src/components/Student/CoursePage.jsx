import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthCon from '../../context/AuthPro';

const CoursePage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(undefined);
    const [quiz, setQuiz] = useState(undefined);
    const [subSec, setSubSec] = useState(undefined);
    const { auth } = useContext(AuthCon)

    const fetchCourses = async () => {
        //console.log(auth)
        try {
            const res = await fetch(`http://localhost:3000/user/course/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth}`,
                },
            });

            const data = await res.json();
            //setCourses(data.data.courses);
            setCourse(data.course);


        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const showQuiz = (e) => {
        //console.log(e.currentTarget)
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
    //console.log(url)

    return (
        <>
            {course !== undefined ? (
                <div className='d-flex mt-5'>
                    <Sidebar showQuiz={showQuiz} course={course} />
                    {quiz !== undefined ?
                        <div className='ms-4 container-fluid m-3'>
                            <div className='d-flex flex-column box has-background-dark has-text-white rounded-3'>
                                <div className='d-flex flex-row justify-content-between'>
                                    <p className='fs-1 fw-bold text-light'>{quiz.name}</p>
                                    <div><Link to={`${url}/${subSec._id}/${quiz._id}`} className="btn btn-primary">Start Test</Link></div>
                                </div>
                                <div className='mt-5'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Questions</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Marks</th>
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
                        </div> :
                        <div className='text-center fw-bold fs-1 vw-100'>Select quiz to display</div>}
                </div>
            ) : (
                <div className='text-center vw-100 mt-5'>Loading...</div>
            )}
        </>
    );
};

export default CoursePage;
