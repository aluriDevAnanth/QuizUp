import React, { useContext } from 'react'
import AuthCon from '../../context/AuthPro';

export default function Dashboard() {
  const { auth } = useContext(AuthCon)

  async function dashInfo() {
    try {
      const response = await fetch('http://localhost:3000/teacher/dashInfo', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        setUser({ ...res.data, roll: res.roll });
      } else {
        console.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <ul className="list-group col-4">
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Total Students</div>
            </div>
            <span className="badge text-bg-primary rounded-pill">14</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Total Courses</div>
            </div>
            <span className="badge text-bg-primary rounded-pill">14</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Total RFRs</div>
            </div>
            <span className="badge text-bg-primary rounded-pill">14</span>
          </li>
        </ul>
      </div>

    </div>
  )
}
