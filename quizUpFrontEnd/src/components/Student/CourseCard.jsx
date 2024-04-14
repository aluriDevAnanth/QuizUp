import React from 'react'
import AuthCon from '../../context/AuthPro'
import { useContext } from 'react'
import { Link } from 'react-router-dom'


export default function CourseCard(props) {
    const { user } = useContext(AuthCon)
    //console.log(user)
    //console.log(props)
    const { _id, name, des, publicc } = props;

    return (
        <div data-bs-theme="dark" className="card mt-4 rounded-3 text-bg-dark" style={{ width: "18rem", maxHeight: '400px' }}>
            <img src="https://placehold.co/700x400" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title fs-5 fw-bolder">{name}</h5>
                <p className=" card-text mb-2 d-inline-block text-truncate" style={{ width: '15rem' }}>{des}</p>
                <Link to={`/user/course/${_id}`} className="btn btn-primary">Go to Course</Link>
                {publicc && <span className="ms-3 badge text-bg-info text-dark" style={{ fontSize: "smaller" }}>Public</span>}
            </div>
        </div>

    )
}
