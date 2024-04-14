import React, { useContext, useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import AuthCon from '../../context/AuthPro';

export default function UserCourse() {
  const { auth } = useContext(AuthCon);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/course/allMyCourses', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth}`,
        },
      });

      const res = await response.json();
      setCourses(res.data.courses);
      console.log(res);
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
            <div key={course._id} ><CourseCard key={course._id} {...course} /></div>
          ))
        ) : null}
      </div>
    </div >
  );
}
