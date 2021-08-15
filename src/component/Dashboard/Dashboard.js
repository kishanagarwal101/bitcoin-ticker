import React from 'react';
import Graphs from './Graphs'
import './Dashboard.css'
import Appbar from '../Appbar/Appbar';
const Dashboard = (props) => {
    return (
        <div className='main'>
            <Appbar />
            <div className='graph'>
                <Graphs />
            </div>
        </div>
    );
}

export default Dashboard;