import React, { useContext, useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import AuthCon from '../../context/AuthPro';

export default function UserCourse() {
  const { auth } = useContext(AuthCon);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:3000/user/course/allMyCourses', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth}`,
        },
      });

      const data = await res.json();
      setCourses(data.data.courses);
      //console.log(data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container mb-5">
      <div className="row row-cols-auto gap-3 row-gap-5">
        {courses ? (
          courses.map((course, i) => (
            course.publicc ? <div key={course._id} ><CourseCard key={course._id} {...course} /></div> : <div key={i}></div>
          ))
        ) : null}
      </div>
    </div >
  );
}
