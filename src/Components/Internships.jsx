import { Button, duration, TextField } from '@mui/material'
import {React, useState} from 'react'
import './dynamicForm.css'
import TextInput from './TextInput'
import TextMultiLineInput from './TextMultiLineInput'

const Internships = (props)=>{

    const [values,setvalues] = useState({
       organisation: "",
       designation:"",
       duration:0,
       location: "",
       description: ""
    })
    let name,value;

    const onChange = (e) =>{
        value=e.target.value
        name = e.target.name

        setvalues({
            ...values, [name]: value
        })
    }



    const onSave= (e)=>{
        e.preventDefault()
        props.onSave(values.organisation,values.designation,values.duration,values.location,values.description,props.i)
    }
     
    return (
      <div className='dynamicForm'>
     <label className='labelTop'>Internship Details</label> <br/>
     <TextInput label="Enter Your Organisation" required={true} value={values.organisation} name="organisation" placeholder='Organisation' onChange={onChange}/>
     <TextInput label="Enter Your Designation" required={true} value={values.designation} name="designation" placeholder='Designation' onChange={onChange}/>
     <TextInput label="Enter Duration (In Months)"  required={true} value={values.duration} name="duration" placeholder='Duration' type="Number" onChange={onChange}/>
     <TextInput label="Enter Location"  required={true} value={values.location} name="location" placeholder='Location' onChange={onChange}/>
     <TextInput label="Enter Description" value={values.description} name="description" placeholder="Description" onChange={onChange}/>
     <div>
     <Button type='submit' variant='outlined' onClick={onSave}>Save</Button>
     </div>
     </div>
    )
} 

export default Internships