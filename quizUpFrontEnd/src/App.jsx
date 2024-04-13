import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'

//login
import UserSignup from './components/UserSignup'

//Student
import Header from './components/Student/Header'
import Home from './components/Student/Home'
import UserCourse from './components/Student/UserCourse'
import RFR from './components/Student/RFR'
import CoursePage from './components/Student/CoursePage'
import QuizPage from './components/Student/QuizPage'

//teacher
import Dashboard from './components/Teacher/Dashboard'
import TeacherHeader from './components/Teacher/components/TeacherHeader'
import YourCourses from './components/Teacher/YourCourses'

//context
import AuthCon from './context/AuthPro'
import YourRFRs from './components/Teacher/YourRFRs'
import Settings from './components/Student/Settings'

function App() {
  const { auth, user } = useContext(AuthCon)
  //console.log(auth, user)
  return (
    <>
      <Routes>
        <Route path='/' element={auth === undefined ? <UserSignup /> : <></>} />
      </Routes>

      {user && user.role === "student" && <>
        <Header />
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/user/course' element={<UserCourse />} />
          <Route path='/user/signup' element={<UserSignup />} />
          <Route path='/user/rfr' element={<RFR />} />
          <Route path='/user/rfr/:code' element={<RFR />} />
          <Route path='/user/course/:id' element={<CoursePage />} />
          <Route path='/user/course/:cid/:ssid/:qid' element={<QuizPage />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </>}

      {user && user.role === "teacher" && <>
        <TeacherHeader />
        <Routes >
          <Route path='/' element={<Dashboard />} />
          <Route path='/teacher/course' element={<YourCourses />} />
          <Route path='/teacher/rfr/' element={<YourRFRs />} />
        </Routes>
      </>}

    </>

  )
}

export default App
