import {React} from "react";
import { useState } from "react";
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import lankaNIC from "lanka-nic";
import './view.css'



export default function View(){

    const [nic, setNic] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');

         
const searching = () => {
    if(nic.length === 10 || nic.length === 12){
        let { dateOfBirth, gender } = lankaNIC.getInfoFromNIC(nic);
        setDob(new Date(dateOfBirth).toISOString().slice(0, 10));
        setGender(gender);
        console.log (new Date(dateOfBirth).toISOString().slice(0, 10));
        console.log(gender);
    }
    else(
        alert("There is an error on your NIC No....")
    )
    
}
    return (

        <div className="Viewer">
        

<div className='w-25 border rounded m-5 p-5 mt-5 bg-light'>
    <h3 className="h3">NIC Tracker</h3>
            <FloatingLabel
                controlId="floatingInput"
                label="National ID"
                className="mb-3"
            >
        <Form.Control type="text" value = {nic} placeholder=" " onChange={(v)=> setNic(v.target.value)}  />
      </FloatingLabel>
      <br/>
            <Button className="Btn_Search" variant="outline-primary" onClick={(searching)}> Search</Button>
            <br/><br/>
            <div>
            <label> National ID:{nic}</label>
            <br/>
            <br/>
            <label> Date Of Birth:{dob}</label>
            <br/>
            <br/>
            <label> Gender:{gender}</label>
            </div>
            <br/>
        </div>
        </div>
        
    );
}