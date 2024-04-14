import React, { useContext, useEffect, useState } from 'react'
import AuthCon from '../../context/AuthPro';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import QuizCard from './QuizCard';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";

export default function Home() {
    const { user, auth } = useContext(AuthCon)
    const [publicCourse, setPublicCourse] = useState(null)
    const [publicRFRs, setPublicRFRs] = useState(null)

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };

    async function fetchPublicCourses() {
        try {
            const res = await fetch('http://localhost:3000/user/course/publicCourses', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth}`,
                },
            });

            const data = await res.json();

            const q = data.data.map(course => (
                <div key={course._id} ><CourseCard key={course._id} {...course} /></div>
            ))

            setPublicCourse(q);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    async function fetchPublicQuizzies() {
        try {
            const response = await fetch('http://localhost:3000/user/quiz/allPublicQuizs', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth}`,
                },
            });

            const res = await response.json();
            let q = [];

            res.data.map(qq => {
                q.push(<QuizCard key={qq._id} data={qq} />);
                return null;
            });
            //console.log(res);

            setPublicRFRs(q);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    useEffect(() => { fetchPublicCourses(); fetchPublicQuizzies() }, [])

    const responsive = { 0: { items: 1 }, 568: { items: 2 }, 1024: { items: 3, }, 1080: { items: 4 } }

    return (
        <div className='container-fluid mt-5'>
            {user !== null ? <div className="mb-4 box bg-dark text-white">
                <div className=''>
                    <h1 className="display-5 fw-bold mb-2 ">{`Hi, ${user.name}!`}</h1>
                    <p className="col-md-9 fs-4 mb-3">Welcome to QuizUp, go to Courses to complete them in time.</p>
                    <Link to='/user/course/' className="btn btn-primary btn-lg " type="button">Courses</Link>
                </div>
            </div> : <></>}
            {publicCourse ? <div className='box bg-dark text-white'>
                <h1 className="display-5 fw-bold mb-2">Public Courses</h1>
                <div className='container'>
                    <Slider {...settings}>
                        {publicCourse.map((q, i) => {
                            return <div key={i}>{q}</div>
                        })}
                    </Slider>
                </div>
            </div> : <></>}

            {publicRFRs !== null ? <div className='box mb-5 bg-dark text-white'>
                <h1 className="display-5 fw-bold mb-2">Public RFRs</h1>
                <div className='container mb-1' >
                    <Slider {...settings}>
                        {publicRFRs.map((q, i) => {
                            return <div key={i}>{q}</div>
                        })}
                    </Slider>
                </div>
            </div> : <></>}
        </div>
    )
}
