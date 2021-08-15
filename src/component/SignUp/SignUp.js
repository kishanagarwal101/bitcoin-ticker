import React, { useRef } from 'react';
import { useAuth } from '../../AuthContext';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify'
import './SignUp.css'
import { Link, useHistory } from 'react-router-dom';
const SignUp = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const { signUp, currentUser } = useAuth();
    const history = useHistory();
    async function handleSubmit(e) {
        console.log(JSON.stringify(currentUser));
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value)
            return toast('Password Does not match');
        if (passwordRef.current.value.length < 6)
            return toast('Password length must be greater than 8');
        try {
            await signUp(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (e) {
            console.log(e, 'ERROR');
            if (e.code === 'auth/email-already-in-use')
                return toast('Email Already In use');

        }
    };
    return (
        <div className='mainDiv'>
            <div className='signUpCard'>
                <h1>Sign Up</h1>

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
                <input
                    className='inputTag'
                    type="password"
                    ref={confirmPasswordRef}
                    placeholder='Confirm Password'
                    name="password"
                />
                <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
                <p className='changePage'>
                    Already have an account? <Link to='/login'>Login.</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;