import { Button, TextField } from '@mui/material'
import {React, useState} from 'react'
import './dynamicForm.css'
import TextInput from './TextInput'

const Offers = (props)=>{
    const [values,setvalues] = useState({
        organisation: "",
        designation:"",
        ctc:"",
        location: ""
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
         props.onSave(values.organisation,values.designation,values.ctc,values.location,props.i)
     }
    return (
      <div className='dynamicForm'>
     <label className='labelTop'>{props.label}</label> <br/>
     <TextInput label="Enter Your Organisation" placeholder='Organisation' name="organisation" value={values.organisation} onChange={onChange}/>
     <TextInput label="Enter Your Designation" placeholder='Designation' name="designation" value={values.designation} onChange={onChange}/>
     <TextInput label="Enter Your CTC" note="(Only Numbers, no commas or LPA)" placeholder='CTC' name="ctc" value={values.ctc} onChange={onChange}/>
     <TextInput label="Enter Location" note="(Write 'Remote' in case of WFH)" placeholder='Location' name="location" value={values.location} onChange={onChange}/>
     <div>
     <Button type='submit' variant='outlined' onClick={onSave} >Save</Button>
     </div>
     </div>
    )
} 

export default Offers