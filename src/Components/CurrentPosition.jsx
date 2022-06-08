
import {React, useState} from 'react'
import TextInput from './TextInput'
import { Button } from '@mui/material'


const Courses = (props) => {
    const [values,setvalues] = useState({
        organisation: "",
        package: "",
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
         props.onSave(values.organisation,values.package,values.location,props.i)
     }
   return(
       <div className='dynamicForm'>
       <label className='labelTop'>{props.label}</label> <br/>
       <TextInput label="Enter Organisation" placeholder="Organisation" name="organisation" value={values.organisation} onChange={onChange} />
       <TextInput label="Enter Package" placeholder="Package" name="package" value={values.package} onChange={onChange} />
       <TextInput label="Enter Location" placeholder="Location" name="location" value={values.location} onChange={onChange} />
       </div>
   )
}

export default Courses