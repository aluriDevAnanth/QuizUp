import React, { useEffect, useContext, useState } from 'react';
import { GoAlertFill } from "react-icons/go";
import './css/quizPage.css';
import { useParams } from 'react-router-dom';
import AuthCon from '../../context/AuthPro';

const QuizPage = (props) => {
    const { cid, ssid, qid } = useParams();
    const { auth } = useContext(AuthCon)
    const [quiz, setQuiz] = useState(undefined)
    const [currQ, setCurrQ] = useState({ sec: 0, que: 0, op: -1 })
    const [corr, setCorr] = useState({})

    const fetchQuiz = async () => {
        try {
            const res = await fetch(`http://localhost:3000/user/course/${cid}/${ssid}/${qid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth}`,
                },
            });

            const data = await res.json();
            console.log(data);
            setQuiz(data.quiz)
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    useEffect(() => {
        fetchQuiz();
    }, [])

    const next = () => {
        let { sec, que, op } = currQ;

        if (op !== -1) {
            let qq = `${quiz.qss[sec]._id + " " + quiz.qss[sec].que[que]._id}`
            let q = corr;
            q[qq] = quiz.qss[sec].que[que].options[op]
            setCorr(q)
            console.log(q)
        }
        que = que + 1;
        if (que === quiz.qss[currQ.sec].que.length) {
            que = 0
            sec = sec + 1
        }
        op = -1;
        setCurrQ({ sec, que, op })
    };

    const prev = () => {
        let { sec, que, op } = currQ; let q;
        if (op !== -1) {
            let qq = `${quiz.qss[sec]._id + " " + quiz.qss[sec].que[que]._id}`
            let q = corr;
            q[qq] = quiz.qss[sec].que[que].options[op]
            setCorr(q)
            console.log(q)
        }
        if (que === 0 && sec !== 0) {
            sec = sec - 1
            que = quiz.qss[currQ.sec].que.length - 1
        } else {
            que = que - 1
        }
        op = -1;
        console.log(sec, que, op)
        setCurrQ({ sec, que, op })
    };

    const handleSec = (e) => {
        let { sec, que, op } = currQ;
        setCurrQ({ sec: Number(e.currentTarget.getAttribute("data")), que: 0, op: -1 })
    }

    const handleQ = (e) => {
        let { sec, que, op } = currQ;
        setCurrQ({ sec, que: Number(e.currentTarget.getAttribute("data")), op: -1 })
    }

    const handleTable = () => {
        const n = quiz.qss[currQ.sec].que.length;
        const m = quiz.qss.length;
        let q = [];

        for (let i = 0; i < m; i++) {
            q[i] = [];
            for (let j = 0; j < n; j++) {
                q[i][j] = 0;
            }
            return q;
        }
        console.log(q)
    }

    const handleOp = (e) => {
        let { sec, que, op } = currQ
        op = Number(e.currentTarget.getAttribute("data"))
        //console.log(sec,que,op)
        setCurrQ({ sec, que, op })
    }

    const handleSub = async () => {
        try {
            const res = await fetch(`http://localhost:3000/user/course/${cid}/${ssid}/${qid}/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth}`,
                },
                body: JSON.stringify(corr),
            });

            const data = await res.json();
            console.log(data)
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    const handleClear = () => {
        const allOptions = document.querySelectorAll('.list-group-item');
        allOptions.forEach(option => {
            option.classList.remove('active');
        });
        let { sec, que, op } = currQ;
        op = -1
        setCurrQ({ sec, que, op })
    }

    return (
        quiz ?
            <div className='container-fluid'>
                <div className="row">
                    <div className='col-xs-12 col-9 '>
                        <div className="mt-5 mb-3 container-fluid">
                            <div className='row gap-2'>
                                {quiz.qss.map((q, index) => {
                                    return <li key={index} data={index} onClick={handleSec} className='btn btn-light col-2 d-flex p-2 fw-bold text-center'>Section {index + 1}</li>
                                })}
                            </div>
                        </div>
                        <div className="question-panel d-flex flex-column">
                            <GoAlertFill className="alert1" size={30} />
                            <div className="fs-3 fw-bold mb-3">Section {currQ.sec + 1}: Question  {currQ.que + 1}</div>
                            <div className="fs-4 mb-5">{quiz.qss[currQ.sec].que[currQ.que].que}</div>
                            <div className="container-fluid">
                                <ol className='list-group list-group-numbered row gap-1'>
                                    {quiz.qss[currQ.sec].que[currQ.que].options.map((q, i) => {
                                        return <li key={i} onClick={handleOp} data={i} className={`list-group-item list-group-item-action list-group-item-light alert alert-light ${i === currQ.op ? 'active' : ''} d-flex p-2 fs-5 fw-bold `}>{q}</li>
                                    })}
                                </ol>

                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <div>
                                    <button onClick={handleClear} className='btn btn-light'>Clear</button>
                                </div>
                                <div className="">
                                    {!quiz.prevDisabled && <button className="me-3 btn btn-light" onClick={prev} disabled={currQ.que === 0 && currQ.sec === 0 && !prevDisabled}>Previous</button>}
                                    <button className=" btn btn-light" onClick={next} disabled={currQ.sec === quiz.qss.length - 1 && currQ.que === quiz.qss[currQ.sec].que.length - 1}>Next</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="side-panel mt-5">
                            <h2 className='fs-5 mb-3 fw-blod'>Questions</h2>
                            <div className=" container-fluid">
                                <div className='row gap-2'>
                                    {quiz.qss[currQ.sec].que.map((q, index) => (
                                        <button key={index} onClick={handleQ} disabled={quiz.prevDisabled} data={index} className={`btn col-6 btn-light displayNumbers ${index === currQ.que ? 'active' : ''} `}> {index + 1} </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-5 submit-button-container d-flex justify-content-center">
                                <button onClick={handleSub} className="btn btn-light">Submit </button>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
            : <></>
    );
}

export default QuizPage;