import { Button, TextField } from '@mui/material'
import {React, useState} from 'react'
import './dynamicForm.css'
import TextInput from './TextInput'

const Achievements = (props)=>{
    const [values,setvalues] = useState({
        type:"",
        body: ""
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
         props.onSave(values.body,values.type,props.i)
     }
    return (
      <div className='dynamicForm'>
     <label className='labelTop'>{props.label}</label> <br/>
     <TextInput label="Enter Achievement Type"  placeholder='Type' name="type" value={values.type} onChange={onChange} />
     <TextInput label="Enter Your Achievements" placeholder='Achievements' name="body" value={values.body} onChange={onChange} />
     <div>
     <Button type='submit' variant='outlined' onClick={onSave} >Save</Button>
     </div>
     </div>
    )
} 

export default Achievements