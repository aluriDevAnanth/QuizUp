import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCon from '../../../context/AuthPro'
import Cookies from 'js-cookie';

export default function TeacherHeader() {
  const { auth, setAuth, setUser } = useContext(AuthCon)
  const navi = useNavigate()

  function handleLogout(e) {
    Cookies.remove('token');
    setAuth(undefined)
    setUser(undefined)
    navi('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'> <p className='fw-bolder fs-3'>QuizUp</p> </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {auth !== undefined ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='/teacher/course'>Your Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/teacher/rfr/">Your RFRs</Link>
            </li>
          </ul> : <></>}
          {auth === undefined ? <></> : <Link className="nav-link active me-3" aria-current="page" to="settings">Settings</Link>}
          {auth === undefined ? <></> : <button className='btn btn-danger' onClick={handleLogout} >LogOut</button>}
        </div>
      </div>
    </nav>

  )
}
