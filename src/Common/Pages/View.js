import {React, ReactDOM} from "react";
import { useState } from "react";
import {Button, FloatingLabel, Form} from 'react-bootstrap';
// import lankaNIC from "lanka-nic";
import './view.css'



export default function View(){

    const [nic, setNic] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [data,setData] = useState([]);

        function calView(){
            const ob = {
             NICNo:nic,   
            DOB: dob,
            Gender: gender,
            }
        const ob1 = [...data];
    ob1.push(ob);
    setData(ob1);
    clear();
}
function clear () {
    setNic("");
}
        
    return (

        <div className="Viewer">

<div className='w-25 border rounded m-5 p-5 mt-5 bg-light'>
            {/* const lankaNIC = require("lanka-nic"); */}
            {/* let { dob, gender } = lankaNIC.getInfoFromNIC("925182566V"); */}


            <FloatingLabel
        controlId="floatingInput"
        label="NIC NO"
        className="mb-3"
      >
        <Form.Control type="email" value = {nic} placeholder=" " onChange={(v)=> setNic(v.target.value)}  />
      </FloatingLabel>
      <br/>
            <Button variant="outline-primary" onClick={()=>setNic(nic)}>Search</Button>{' '}
            <br/><br/>
            <div>
            <label> NIC NO:{nic}</label>
            <br/>
            <br/>
            <label> DOB:{dob}</label>
            <br/>
            <br/>
            <label>GENDER:{gender}</label>
            </div>
            <br/>

            <div>
                {data.map((val)=> (
                    <View nic={val.NICNo}/>
                ))}
            </div>
        </div>
        </div>
        
    );
}