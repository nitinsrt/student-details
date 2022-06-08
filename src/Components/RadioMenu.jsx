import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'


const RadioMenu = (props)=>{
   return (
    <div style={{ marginLeft:'20px' }}>
      <div className='dynamicForm'>
          <label className='labelTop'>{props.label}</label>
          </div>
      <RadioGroup value={props.value} onChange={props.onChange} name={props.name} >
      <FormControlLabel value="IT" control={<Radio />} label="IT" />
      <FormControlLabel value="CS" control={<Radio />} label="CS" />
      </RadioGroup>
      </div>
   )
}

export default RadioMenu