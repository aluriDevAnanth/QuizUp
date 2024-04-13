import React from 'react'
import { format } from 'date-fns';

export default function Sidebar({ showQuiz, course }) {
    
    return (
        <div>
            <div className="vh-100 sticky-top" style={{ width: '40px' }}>
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                    <i className="bi bi-arrow-bar-right"></i>
                </button>
            </div>


            <div style={{ width: '18rem' }} className="  text-bg-dark offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Contents</h5>
                    <button type="button" className="delete is-large btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body container-fluid">
                    <ul className="list-unstyled ps-0">
                        {
                            course.subSec.map(q => {
                                return <li key={q._id} className="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed text-white fs-3" data-bs-toggle="collapse" data-bs-target={`#home-collapse${q._id}`} aria-expanded="false">
                                        {q.name}
                                    </button>
                                    {q.quizzes.map(qq => (
                                        <div className="collapse" id={`home-collapse${q._id}`} key={qq._id}>
                                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                <li onClick={showQuiz}>
                                                    <input name='id' type="text" hidden data={`${q._id} ${qq._id}`} />
                                                    <button href="#" className="list-group-item list-group-item-action active py-3 lh-sm">
                                                        <div className="d-flex flex-column w-100 align-items-center justify-content-between">
                                                            <h1 className="mb-1 fs-5">{qq.name}</h1>
                                                            <p>start date: {format(new Date(qq.startDate), 'MMMM dd, yyyy')}</p>
                                                            <p>total marks: {qq.totalMarks}</p>
                                                            <p>{format(new Date(qq.compDate), 'MMMM dd, yyyy')}</p>
                                                        </div>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}



                                </li>
                            })
                        }


                    </ul>
                </div>
            </div>
        </div>
    )
}
