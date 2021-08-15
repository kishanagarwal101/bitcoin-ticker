import React from 'react';
import './Appbar.css'
import Button from '@material-ui/core/Button';
import { useAuth } from '../../AuthContext';
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom';
const Appbar = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const handleLogout = (async () => {
        try {
            await logout();
            history.push('/login')
        }
        catch (e) {
            return toast('someError')
        }

    })
    return (
        <div className='mainApp'>
            <p className='companyName'>TraceLink</p>
            <div className='appBarRight'>
                <a className='link' href='/form' >Form Page</a>
                <Button variant="contained" color="primary" className='logoutButton' onClick={handleLogout}>
                    Logout
                </Button>

            </div>

        </div>
    );
}

export default Appbar;