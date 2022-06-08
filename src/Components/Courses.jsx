import { getThemeProps } from '@mui/system'
import {React, useState} from 'react'
import TextInput from './TextInput'
import { Button } from '@mui/material'


const Courses = (props) => {
    const [values,setvalues] = useState({
        name: "",
        organisation: "",
        feedback: ""
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
         props.onSave(values.name,values.organisation,values.feedback,props.i)
     }
   return(
       <div className='dynamicForm'>
       <label className='labelTop'>{props.label}</label> <br/>
       <TextInput label="Enter Course Name" placeholder="Name" name="name" value={values.name} onChange={onChange} />
       <TextInput label="Enter Course Organisation" placeholder="Organisation" name="organisation" value={values.organisation} onChange={onChange} />
       <TextInput label="Enter Course Feedback" placeholder="Feedback" name="feedback" value={values.feedback} onChange={onChange} />
       <div>
       <Button type='submit' variant='outlined' onClick={onSave}>Save</Button>
       </div>
       </div>
   )
}

export default Courses