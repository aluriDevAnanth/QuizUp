import React, { useContext, useEffect, useState } from 'react';
import AuthCon from '../../context/AuthPro';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';

export default function RFRQUIZ({ quiz }) {
	const [sec, setSec] = useState(1);
	const [queno, setQue] = useState(0);
	const [ans, setAns] = useState({ curr: '', sel: false, anss: {} });
	const [score, setScore] = useState(false);
	const { auth } = useContext(AuthCon);

	useEffect(() => {
		let interval;
		//console.log(sec);
		if (sec === 2) {
			interval = setInterval(() => {
				if (queno + 1 === quiz.quiz.length) {
					handleSub();
				} else {
					const nextBtn = document.getElementById("nextBtn");
					nextBtn.click();
				}
			}, 2000);
		}
		return () => clearInterval(interval);
	}, [sec, queno]);

	const sel = (e) => {
		const curr = e.currentTarget.getAttribute('data');
		const sel = true;
		const { anss } = ans;
		const allOptions = document.querySelectorAll('.list-group-item');
		allOptions.forEach((option) => {
			option.classList.remove('active');
		});
		e.currentTarget.classList.add('active');
		setAns({ curr, sel, anss });
	};

	const clear = () => {
		const allOptions = document.querySelectorAll('.list-group-item');
		allOptions.forEach((option) => {
			option.classList.remove('active');
		});
		const curr = '';
		const sel = false;
		const { anss } = ans;
		setAns({ curr, sel, anss });
	};

	const next = () => {
		console.log(ans);
		const allOptions = document.querySelectorAll('.list-group-item');
		allOptions.forEach((option) => {
			option.classList.remove('active');
		});
		let { anss, curr, sel } = ans;
		const ele = document.getElementById('queId').getAttribute('data');
		anss[ele] = quiz.quiz[queno].options[curr.toString()];
		sel = false;
		curr = '';
		setQue(queno + 1);
		setAns({ curr, sel, anss });
		//console.log({ curr, sel, anss });
	};

	const handleSub = async () => {
		console.log(ans.anss);
		const response = await fetch('http://localhost:3000/user/rfr/eval', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth}`,
			},
			body: JSON.stringify({ id: quiz._id, ans: ans.anss }),
		});
		const res = await response.json();
		setScore(res);
		setSec(sec + 1);
	};

	return (
		<div className='container d-flex flex-column align-items-center mt-5'>
			<div style={{ width: '30rem' }} className='d-flex flex-column container text-white box rounded-3 bg-dark'>
				{sec === 1 ? (
					<div className=''>
						<h1 className='fs-1 text-center mb-5'>Quiz App</h1>
						<div className='mb-3'>
							<p className='fs-3'>Code: {quiz.code}</p>
							<p className='fs-3'>Number of Questions: {quiz.quiz.length}</p>
							<p className='fs-3'>Teacher: {quiz.teacher}</p>
						</div>
						<button onClick={() => setSec(sec + 1)} className='btn btn-primary start'>
							Start Quiz
						</button>
					</div>
				) : sec === 2 ? (
					<div className=''>
						<div className='mb-3'>
							{queno < quiz.quiz.length ? (
								<>
									<div className='btn mb-3 bg-secondary text-white'>
										Question <span className='current'> {queno + 1} / {quiz.quiz.length}</span>
									</div>
									<div id='queId' data={quiz.quiz[queno]._id} className='fs-5 mb-3 fw-bold'>
										{quiz.quiz[queno].que}
									</div>
									<div className='mb-3'>
										<ProgressBar striped animated now={60} label={`${60}%`} />
									</div>
									<div>
										<ListGroup as="ul">
											{quiz.quiz[queno].options.map((q, index) => (
												<ListGroup.Item as="li" className="bg-white p-2 text-dark rounded-2  " key={index} data={index} onClick={sel}  > {q} </ListGroup.Item>
											))}
										</ListGroup>
									</div>
								</>
							) : (
								<></>
							)}
						</div>
						<div className='d-flex justify-content-between'>
							<div className='d-flex '>
								{queno !== quiz.quiz.length ? (
									<button className='btn btn-light ms-3' id='nextBtn' disabled={!ans.sel} onClick={next}>
										Next
									</button>
								) : (
									<></>
								)}
							</div>
							{queno !== quiz.quiz.length ? (
								<button onClick={clear} className='btn btn-light'>
									Clear
								</button>
							) : (
								<></>
							)}
						</div>
					</div>
				) : (
					<div className=' '>
						<h1 className='text-center fs-1 fw-bloder'>RFR</h1>
						<div className=' '>
							<p className='text-center fs-1 fw-bolder'>Quiz Completed</p>
							<p className='text-center fs-4'>
								Your score: {`${score.score} / ${quiz.quiz.length}`}{' '}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
