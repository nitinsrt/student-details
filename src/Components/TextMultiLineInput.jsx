import { TextField } from '@mui/material';
import { getThemeProps } from '@mui/system';
import React from 'react';

const TextMultiLineInput = (props) =>{
   return (
       <div className='textInput'>
           <label className='label'>{props.label + " * "}</label>
           <TextField multiline placeholder={props.placeholder}  color="secondary"
          required className='textField' name={props.name} value={props.value} onChange={props.onChange} />
       </div>
   )
}

export default TextMultiLineInput