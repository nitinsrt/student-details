
import './App.css';
import TextInput from './Components/TextInput';
import {React, useState, useTransition} from 'react'
import { Alert, Button } from '@mui/material';
import Internships from './Components/Internships';
import RadioMenu from './Components/RadioMenu';
import Offers from './Components/Offers';
import Achievements from './Components/Achievements';
import Journey from './Components/Journey';
import FutureGoals from './Components/FutureGoals';
import InternshipsCard from './Components/InternshipsCard';
import Courses from './Components/Courses';
import TextMultiLineInput from './Components/TextMultiLineInput';
import axios from 'axios';
import {Audio} from 'react-loader-spinner'

const App=()=> {

 const validateEmail=(email)=>{ //Validates the email address
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
}

const validatePhone=(phone)=> { //Validates the phone number
    var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
    return phoneRegex.test(phone);
}

const [validEmail,setvalidEmail] = useState(true)
const [validPhone, setvalidPhone] = useState(true)
const [isloading,setisloading] = useState(false)
const [requiredName,setrequiredName] = useState(false)
const [requiredPhone,setrequiredPhone]= useState(false)
const [requiredRoll, setrequiredRoll] = useState(false)
const [requiredBranch, setrequiredBranch] = useState(false)
const [requiredEmail,setrequiredEmail] = useState(false)
const [requiredJourney, setrequiredJourney] = useState(false)
const [response,setresponse] = useState(null)
const [values,setvalues] = useState({
   name:"",
   rollNo: "",
   branch: "",
   contactNo: "",
   email: "",
   internships: [],
   offers: [],
   currentPosition: {
      organisation: "",
      package: 0,
      location: ""
   },
   courses: [],
   achievements: [],
   journey: "",
   goals:"",
   relDetails: "",
   githubLink: "",
   linkedinLink: ""
})

const baseUrl = "https://class-of-iet22.herokuapp.com/form"

const submitForm = async () =>{
   if(values.email===""||values.name===""||values.branch===""||values.contactNo===""||values.journey===""){
    checkRequired()
     alert("Please Fill all the Required Fields")
     return
   }
   else{
    setisloading(true)
   checkRequired()
   await axios.post(baseUrl,values)
   .then((res)=>{
         setisloading(false)
         setresponse(res)
         if(res.status===200){
          alert("Success")
        }
        setvalues(
          {
            name:"",
            rollNo: "",
            branch: "",
            contactNo: "",
            email: "",
            internships: [],
            offers: [],
            currentPosition: {
               organisation: "",
               package: 0,
               location: ""
            },
            courses: [],
            achievements: [],
            journey: "",
            goals:"",
            relDetails: "",
            githubLink: "",
            linkedinLink: ""
         
        })
   }).catch(err => {
     setisloading(false)
     alert(err)
   })
  }
}

const checkRequired = () =>{
  if(values.email===""){
    setrequiredEmail(true)
  }else{
    setrequiredEmail(false)
  }
  if(values.name===""){
    setrequiredName(true)
  }else{
    setrequiredName(false)
  }
  if(values.branch===""){
    setrequiredBranch(true)
  }else{
    setrequiredBranch(false)
  }
  if(values.rollNo===""){
    setrequiredRoll(true)
  }else{
    setrequiredRoll(false)
  }
  if(values.contactNo===""){
    setrequiredPhone(true)
  }else{
    setrequiredPhone(false)
  }
  if(values.journey===""){
    setrequiredJourney(true)
  }else{
    setrequiredJourney(false)
  }
}



const internshipsArr=[
  {
    id:0,
  }
];

const offersArr = [
  {
    id:0
  }
]

const achievementsArr = [
  {
    id : 0
  }
]

const coursesArr = [
  {
    id: 0
  }
]

const [courses, setcourses] = useState(coursesArr)
const [internships,setinternships]=useState(internshipsArr);
const [offers,setoffers] = useState(offersArr);
const [achievements,setachievements] = useState(achievementsArr)


const addCourses = (e)=>{
    e.preventDefault() 
    setcourses( s => {
      return [...s,{
        id: courses.length
      }
    ]
    })
}

const deleteCourses = (i) =>{
   const updatedCourses = [...courses]
   updatedCourses.splice(i,1)
   setcourses(updatedCourses)
   values.courses.splice(i.id,1)
}

const addIntern = (e)=>{
   e.preventDefault()
    setinternships( s=> {
      return [
        ...s,{
          id:internships.length
        }
      ]
    })
}

const deleteIntern = (i)=>{
  const updatedInterns = [...internships]
  updatedInterns.splice(i,1)
  setinternships(updatedInterns)
  values.internships.splice(i.id,1)
  
}

const addOffer = (e)=>{
  e.preventDefault()
   setoffers( s=> {
     return [
       ...s,{
         id: offers.length
       }
     ]
   })
}

const deleteOffer = (i) =>{
  const updatedOffers = [...offers]
  updatedOffers.splice(i,1)
  setoffers(updatedOffers)
  values.offers.splice(i.id,1)
}

const addAchievement=(e)=>{
  e.preventDefault()
  setachievements(s=>{
    return [
      ...s,{
        id: achievements.length
      }
    ]
  })
}

const deleteAchievement = (i)=>{
  const updatedAchievements = [...achievements]
  updatedAchievements.splice(i,1)
  setachievements(updatedAchievements)
  values.achievements.splice(i.id,1)
}

let value,name;

const onChange= (e) =>{
   value= e.target.value
   name = e.target.name
   if(name==="email"){
     if(validateEmail(value)){
         setvalidEmail(true)
     }else{
       setvalidEmail(false)
     }
   }
   if(name==='contactNo'){
     if(validatePhone(value)){
       setvalidPhone(true)
    }else{
      setvalidPhone(false)
    }
  }

  setvalues(
   {
     ...values,
     [name]: value
   }
  )
}

const onSaveIntern = (org,desig,dur,loc,desc,i)=>{
  const obj = {
    organisation: org,
    designation: desig,
    duration: parseInt(dur),
    location: loc,
    description: desc
  }
    values.internships.push(obj)
    alert("Saved")
}

const onSaveOffer = (org,desig,ctc,loc,i)=>{
  const obj = {
    organisation: org,
    designation: desig,
    package: parseInt(ctc),
    location: loc
  }
    values.offers.push(obj)
    alert("Saved")
}

const onSaveAchievement = (body, type, i) =>{
    const obj = {
     type: type,
      body: body
    }
    values.achievements.push(obj)
    alert("Saved")
}

/*const onChangeFile = (e) =>{
    value = e.target.files
    name = e.target.name
    const reader = new FileReader()
    reader.readAsDataURL(value[0])
    reader.onload = (e) =>{
      setvalues({
        ...values,
        [name]: e.target.result
      })
    }
}*/

const onSaveCourses = (name, org,fb,i) =>{
  const obj = {
    name: name,
    organisation: org,
    feedback: fb
  }
  values.courses.push(obj)
  alert("Saved")
}

const onChangePostition = (e)=>{
   value=e.target.value
   name = e.target.name

   setvalues(prev=>({
     ...prev,
     currentPosition: {
       ...prev.currentPosition,
       [name]: value
     }
   }))
}

  return (<div className='app'>
    {
      isloading ? <Audio height="50" width="50" color="black" arialabel="loading" /> :
    
    <form>
      <div className="formField">
      <TextInput  placeholder="Name" label="Enter Your Name" value={values.name} name="name" required={true} onChange={onChange}/>
      {
        requiredName ? <span className='error'>required *</span>: null
      }
      </div>

      <div className='formField'>
      <TextInput placeholder="Roll Number" value={values.rollNo} name="rollNo" label="Enter Your Roll Number" required={true} onChange={onChange}/>
      {
        requiredRoll ? <span className='error'>required *</span>: null
      }
      </div>

      <div className='formField'>
      <RadioMenu label="Choose Your Branch" required={true} value={values.branch} name="branch" onChange={onChange}/>
      {
        requiredBranch ? <span className='error'>required *</span>: null
      }
      </div>

      <div className='formField'>
      <TextInput placeholder="Contact Number" value={values.contactNo} name="contactNo" label="Enter Your Contact Number"  required={true} onChange={onChange}/>
      {
         !validPhone ? <span className='error'>Enter a valid Phone No</span> : null
      }
      {
        requiredPhone ? <span className='error'>required *</span>: null
      }
      </div>

      <div className='formField'>
      <TextInput placeholder="Email Address" value={values.email} name="email" label="Enter Your Email Address"  required={true} onChange={onChange}/>
      {
         !validEmail ? <span className='error'>Enter a valid email</span> : null
      }
      {
        requiredEmail ? <span className='error'>required *</span>: null
      }
      </div>
      
      <div className='formField'>
      {internships.map((index)=>(
        <div>
        <Internships key={index} label="Internship Details" onSave={onSaveIntern} i={index.id}/>
        {index ? <Button type='submit' variant='outlined' onClick={()=> deleteIntern(index)}>Delete Intern</Button> : null}
        </div>
      ))}
      <Button style={{ marginTop:'2em' }}type='submit' variant='outlined' onClick={addIntern} >Add Intern</Button>
      </div>

      <div className='formField'>
      {offers.map((index)=>(
        <div>
        <Offers key={index} label="Offers Details" i={index} onSave={onSaveOffer} />
        {index ? <Button type='submit' variant='outlined' onClick={()=> deleteOffer(index)}>Delete Offer</Button> : null}
        </div>
      ))}
      <Button style={{ marginTop:'2em' }} type='submit' variant='outlined' onClick={addOffer} >Add Offer</Button>
      </div>

      <div className='formField'>
        <div className='dynamicForm'>
        <label className='labelTop'>Current Position (Offer Selected By You)</label>
        <TextInput label="Enter Your Organisation" placeholder="Organisation" name="organisation" value={values.currentPosition.organisation} onChange={onChangePostition} />
        <TextInput note="(Only Numbers, no commas or LPA)" label="Enter Your Package" placeholder="Package" name="package" value={values.currentPosition.package} onChange={onChangePostition}/>
        <TextInput note="(Write 'Remote' in case of WFH)" label="Enter Location" placeholder="Location" name="location" value={values.currentPosition.location} onChange={onChangePostition}/>
        </div>
      </div>

      <div className='formField'>
      {courses.map((index)=>(
        <div>
        <Courses key={index} label="Course Details" i={index} onSave={onSaveCourses} />
        {index ? <Button type='submit' variant='outlined' onClick={()=> deleteCourses(index)}>Delete Course</Button> : null}
        </div>
      ))}
      <Button style={{ marginTop:'2em' }} type='submit' variant='outlined' onClick={addCourses} >Add Course</Button>
      </div>
      
      <div className='formField'>
      {achievements.map((index)=>(
        <div>
        <Achievements key={index} label="Achievement Details" i={index} onSave={onSaveAchievement} />
        {index ? <Button type='submit' variant='outlined' onClick={()=> deleteAchievement(index)}>Delete Achievement</Button> : null}
        </div>
      ))}
      <Button style={{ marginTop:'2em' }} type='submit' variant='outlined' onClick={addAchievement} >Add Achievement</Button>
      </div>

      <div className='formField'>
       <div className='dynamicForm'>
     <label className='labelTop'>Write Your Journey</label> <br/>
     <TextMultiLineInput label="Write Your Technical Journey" placeholder="Journey" name="journey" value={values.journey} onChange={onChange}  />
     </div>
     {
        requiredJourney ? <span className='error'>required *</span>: null
      }
      </div>

      <div className='formField'>
      <FutureGoals label="Write Your Future Goals" required={true} placeholder="Future Goals" value={values.goals} name="goals" onChange={onChange}/>
      </div>

      <div className='formField'>
      <FutureGoals label="Any Other Relevant Details" placeholder="Your Answer" value={values.relDetails} name="relDetails" onChange={onChange} />
      </div>
      
      <div className='formField'>
        <TextInput label="Enter Your Github Profile Link" placeholder="Github Link" name="githubLink" value={values.gitHubLink} onChange={onChange}  />
      </div>

      <div className='formField'>
        <TextInput label="Enter Your LinkedIn Profile Link" placeholder="LinkedIn Link" name="linkedinLink" value={values.linkedinLink} onChange={onChange}  />
      </div>

      <Button variant='contained' onClick={submitForm}>Submit</Button>

    </form>
}
  </div>
  )
};

export default App;
