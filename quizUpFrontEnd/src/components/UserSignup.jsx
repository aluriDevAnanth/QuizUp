import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthCon from '../context/AuthPro';
import * as yup from 'yup';

const userSignup = () => {
    const [showErr, setShowErr] = useState(false);
    const [err, setErr] = useState('');
    const [sign, setSign] = useState(true);
    const navi = useNavigate();
    const { setAuth, setUser } = useContext(AuthCon);

    const signupSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        pass: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        cpass: yup.string().oneOf([yup.ref('pass'), null], 'Passwords must match'),
        role: yup.string().oneOf(['student', 'teacher'], 'Invalid role').required('Role is required'),
    });

    const loginSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        pass: yup.string().required('Password is required'),
    });

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let q = {};

        for (let [key, value] of formData.entries()) {
            q[key] = value;
        }

        try {
            await signupSchema.validate(q, { abortEarly: false });
            const { name, email, pass, role } = q;
            const response = await fetch('http://localhost:3000/user/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, pass, role }),
            });
            const res = await response.json();
            console.log(res);
            if (res.success) {
                setSign(false);
                setShowErr(false);
            }
            else {
                setErr(res.error);
                setShowErr(true);
            }
        } catch (error) {
            setErr(error.errors.join(', '));
            setShowErr(true);
        }
    };

    const toggle = (e) => {
        e.preventDefault();
        setSign(!sign);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let q = {};
        for (let [key, value] of formData.entries()) {
            q[key] = value;
        }

        try {
            await loginSchema.validate(q, { abortEarly: false });
            const { email, pass } = q;
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, pass }),
            });

            const res = await response.json();
            if (res.success === true) {
                console.log(res);
                setShowErr(false);
                setUser(res.user);
                navi('/');
                Cookies.set('token', res.token, { expires: 3 });
                setAuth(Cookies.get("token"));
            } else {
                setErr(res.error);
                setShowErr(true);
            }
        } catch (error) {
            console.log(error);
            setErr(error.errors.join(', '));
            setShowErr(true);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-5 bgi' style={{ marginTop: '200px' }}>
            {sign && (
                <div>
                    <form onSubmit={handleSignup} className="box bg-dark text-white" style={{ width: '26rem' }}>
                        <h1 className='h1 mb-3'>Sign Up</h1>

                        <div className="form-floating mb-3">
                            <input name='name' type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input name='email' type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name='pass' type="password" className="form-control" id="pass" placeholder="Password" />
                            <label htmlFor="pass">Password</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name='cpass' type="password" className="form-control" id="cpass" placeholder="Password" />
                            <label htmlFor="cpass">Confirm Password</label>
                        </div>

                        <div className="form-floating mb-3">
                            <select name='role' className="form-control" id="sel" placeholder="Password" >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                            <label htmlFor="sel">Choose Role</label>
                        </div>

                        {showErr && <div className="alert alert-danger" role="alert">
                            {err}
                        </div>}

                        <div className='d-flex justify-content-between'>
                            <div className=' '>
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                            <button onClick={toggle} className='btn btn-secondary justify-content-end'>
                                Already have an account
                            </button>
                        </div>

                    </form>
                </div>
            )}

            {!sign && (
                <div>
                    <form onSubmit={handleLogin} className="box bg-dark text-white" style={{ width: '26rem' }}>
                        <h1 className='h1 mb-3'>Log In  </h1>
                        <div className="form-floating mb-3">
                            <input name='email' type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name='pass' type="password" className="form-control" id="pass" placeholder="Password" />
                            <label htmlFor="pass">Password</label>
                        </div>

                        {showErr && <div className="alert alert-danger" role="alert">
                            {err}
                        </div>}

                        <div className='d-flex justify-content-between'>
                            <div className=' '>
                                <button className="btn btn-primary">Log In</button>
                            </div>
                            <button onClick={toggle} className='btn btn-secondary justify-content-end'>
                                Create an acccount
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default userSignup;
