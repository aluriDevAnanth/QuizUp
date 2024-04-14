import React from 'react'
import { Link } from 'react-router-dom';

export default function quizCard(props) {
    const quiz = props.data;

    return (
        <div className="card p-0 rounded-3 text-bg-dark" style={{ width: "18rem" }}>
            <img src="https://placehold.co/700x400" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title fs-5 fw-bolder">{quiz.name}</h5>
                <span className="d-inline-block mb-2 text-truncate" style={{ maxWidth: "15rem" }}>  {quiz.des} </span>
                <Link to={`/user/rfr/${quiz.code}`} className="btn btn-primary">Go to RFR</Link>
                {quiz.publicc && <span className="ms-3 badge text-bg-info text-dark" style={{ fontSize: "smaller" }}>Public</span>}
            </div>
        </div>
    )
}
