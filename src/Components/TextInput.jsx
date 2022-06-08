import React from 'react';
import "./TextInput.css"
import TextField from "@mui/material/TextField"

const TextInput = (props)=>{
  if (props.required){
  return (
      <div className='textInput'>
          <label className='label'>{props.label}</label>
          <TextField variant="outlined" 
          placeholder={props.placeholder} 
          className="textField" 
          onChange={props.onChange} 
          color="secondary"
          required
          type={props.type}
          value={props.value}
          name={props.name}
          />
      </div>
  )
  }else{
    return(<div className='textInput'>
          <label className='label'>{props.label}</label>
          <TextField variant="outlined" 
          placeholder={props.placeholder} 
          className="textField" 
          onChange={props.onChange} 
          color="secondary"
          value={props.value}
          type={props.type}
          name={props.name}
          />
      </div>
    )
  }
}

export default TextInput