import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import axios from "axios";
import { toast } from 'react-toastify'
import Fab from '@material-ui/core/Fab';
import BackspaceIcon from '@material-ui/icons/Backspace';
import './Form.css'
const Form = () => {
    const urlRef = useRef(null);
    const bodyRef = useRef(null);
    const resRef = useRef(null);
    const resContainerRef = useRef(null);
    const handlesubmit = (async () => {
        if (urlRef.current.value.length === 0)
            return toast('Please Provide URL');
        if (bodyRef.current.value.length === 0)
            return toast('Please Provide Body');
        axios.post(urlRef.current.value, bodyRef.current.value)
            .then(res => {
                resContainerRef.current.style.visibility = 'visible'
                resRef.current.textContent = JSON.stringify(res.data);
                console.log(res.data);
            })
            .catch(err => {
                toast('Some Error Occured');
            })

    })
    return (<div className='mainForm'>
        <div className='responseDiv' ref={resContainerRef}>
            <Fab className='backIcon' color="primary" aria-label="add">
                <BackspaceIcon onClick={() => { resContainerRef.current.style.visibility = 'hidden' }} />
            </Fab>
            <pre className='reponseContainer' ref={resRef}>
            </pre>
        </div>
        <div className='formContainer'>
            <h1>Post Request</h1>
            <div className='formInner'>
                <input placeholder='URL' className='urlInput' ref={urlRef} />
                <textarea className='bodyInput' cols="40" rows="5" placeholder='Body' ref={bodyRef}></textarea>
                <Button variant="contained" onClick={handlesubmit}>Post</Button>
            </div>
        </div>
    </div>);
}

export default Form;