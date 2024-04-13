import React, { useContext, useEffect, useState } from 'react';
import AuthCon from '../../context/AuthPro';
import { useParams } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function RFR() {
  const [quiz, setQuiz] = useState();
  const { auth } = useContext(AuthCon);
  const [err, setErr] = useState('');
  const { code } = useParams();
  const [sec, setSec] = useState(1);
  const [curr, setCurr] = useState({ curr: 0, sel: {}, ans: {} });

  useEffect(() => {
    console.log("curr:", curr);
  }, [curr]);

  useEffect(() => {
    let timer;
    if (sec === 2 && curr.curr < quiz.quiz.length) {
      timer = setTimeout(() => {
        console.log('Delayed message after 2 seconds!');
      }, 2000);
    } else {
      clearTimeout(timer);
    }
    return () => { console.log(2); clearTimeout(timer); }
  }, [sec]);


  const handlesub = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let q = {};

    for (let [key, value] of formData.entries()) q[key] = value;

    if (q.rfrCode === '') setErr('RFR Code Required');
    else {
      setErr('');
      const response = await fetch(`http://localhost:3000/user/rfr/quiz/${q.rfrCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth}`,
        },
      });
      const res = await response.json();
      if (res.success === false) setErr(res.err);
      else setQuiz(res.data);
    }

  };

  function sel(e) {
    e.preventDefault();
    const allOptions = document.querySelectorAll('.list-group-item');
    allOptions.forEach((option) => {
      option.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    let { sel } = curr;
    const ii = e.currentTarget.getAttribute('data1');
    const idd = e.currentTarget.getAttribute('idd');
    sel[idd] = ii;
    setCurr({ curr: curr.curr, sel, ans: curr.ans });
  }

  function clear() {
    const allOptions = document.querySelectorAll('.list-group-item');
    setCurr({ ...curr, sel: null });
    allOptions.forEach((option) => {
      option.classList.remove('active');
    });
  }

  function next() {
    const allOptions = document.querySelectorAll('.list-group-item');
    setCurr({ ans: { ...curr.ans, ...curr.sel }, sel: {}, curr: curr.curr + 1 });
    allOptions.forEach((option) => {
      option.classList.remove('active');
    });
  }

  return (
    <div className='container mt-5'>
      {sec === 1 && <div className='d-flex justify-content-center'>
        <form onSubmit={handlesub} style={{ width: "20rem" }} className='bg-white p-3 rounded-3 d-flex gap-3'>
          <div>
            <FloatingLabel controlId="floatingInput" label="Enter Code"> <Form.Control value={code} name="rfrCode" type="text" /> </FloatingLabel>
            {err && <div className="text-danger fw-bold">{err}</div>}
          </div>
          <div className='d-flex align-items-center'>
            <button className='btn btn-primary'>Submit</button>
          </div>
        </form>
      </div>}
      {quiz && sec === 1 && <div className='mt-4 col-5'>
        <pre className='bg-dark text-white rounded-3'> {JSON.stringify({ Name: quiz.name, Teacher: quiz.teacher, Code: quiz.code }, null, 2)} </pre>
        <div><button className="btn btn-primary mt-3" onClick={() => { setSec(2) }}>Start RFR</button></div>
      </div>}

      {sec === 2 && quiz && <div className='d-flex justify-content-center'>
        <div className='rounded-3 text-light p-3 col-6'  >
          <h3 className='btn text-light fs-6 mb-3 border-white'>Question: {curr.curr + 1} / {quiz.quiz.length}</h3>
          <div className='d-flex flex-column gap-2 mb-3'>
            <p className='fs-4 fw-bold'>{quiz.quiz[curr.curr].que}</p>
            <ul className='d-flex flex-column gap-1 list-group'>
              {quiz.quiz[curr.curr].options.map((q, idx) => (
                <li data1={q} idd={quiz.quiz[curr.curr]._id} key={idx} onClick={sel} className="p-2 rounded-2 fs-5 list-group-item list-group-item-secondary" > {q}</li>
              ))}
            </ul>
          </div>
          <div className='d-flex justify-content-between'>
            <button onClick={next} className='btn btn-primary'>Next</button>
            <button onClick={clear} className='btn btn-secondary'>Clear</button>
          </div>
        </div>
      </div>}
    </div >
  );

}
