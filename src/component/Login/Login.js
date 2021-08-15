import React, { useRef } from 'react';
import { useAuth } from '../../AuthContext';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify'
import './Login.css'
import { Link, useHistory } from 'react-router-dom';

const Login = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { login, currentUser } = useAuth();
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value.length < 6)
            return toast('Password length must be greater than 8');
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className={'mainDiv'}>
            <div className={'signUpCard'}>
                <h1>Login</h1>

                <input
                    className='inputTag'
                    type="email"
                    ref={emailRef}
                    placeholder='Email Id'
                    name="email"
                />
                <input
                    className='inputTag'
                    type="password"
                    ref={passwordRef}
                    placeholder='Password'
                    name="password"
                />
                <Button variant="contained" onClick={handleSubmit}>Login</Button>
                <p className='changePage'>
                    Need an account? <Link to='/signup'>Register Now</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;