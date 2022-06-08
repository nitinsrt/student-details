import { TextField } from '@mui/material'
import React from 'react'
 
const FutureGoals = (props) =>{
   return (
       <div className='dynamicForm'>
       <label className='labelTop'>{props.label}</label>
       <TextField placeholder={props.placeholder} className='textField' color="secondary" multiline value={props.value} name={props.name} onChange={props.onChange} />
       </div>
   )
}

export default FutureGoals