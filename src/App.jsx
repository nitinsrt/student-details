
import './App.css';
import TextInput from './Components/TextInput';
import {React, useState} from 'react'
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

const [isloading,setisloading] = useState(false)
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
   setisloading(true)
   await axios.post(baseUrl,values)
   .then((res)=>{
         setisloading(false)
         setresponse(res)
         const resp= res
         console.log(resp)
   }).catch(err => {
     alert(err)
   })
   if(response.data.status==='success'){
     alert("Success")
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
      isloading && !response ? <Audio height="50" width="50" color="black" arialabel="loading" /> :
    
    <form>
      <div className="formField">
      <TextInput placeholder="Name" label="Enter Your Name" value={values.name} name="name" required={true} onChange={onChange}/>
      </div>

      <div className='formField'>
      <TextInput placeholder="Roll Number" value={values.rollNo} name="rollNo" label="Enter Your Roll Number" required={true} onChange={onChange}/>
      </div>

      <div className='formField'>
      <RadioMenu label="Choose Your Branch" required={true} value={values.branch} name="branch" onChange={onChange}/>
      </div>

      <div className='formField'>
      <TextInput placeholder="Contact Number" value={values.contactNo} name="contactNo" label="Enter Your Contact Number"  required={true} onChange={onChange}/>
      </div>

      <div className='formField'>
      <TextInput placeholder="Email Address" value={values.email} name="email" label="Enter Your Email Address"  required={true} onChange={onChange}/>
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
        <label className='labelTop'>Current Position</label>
        <TextInput label="Enter Your Organisation" placeholder="Organisation" name="organisation" value={values.currentPosition.organisation} onChange={onChangePostition} />
        <TextInput label="Enter Your Package" placeholder="Package" name="package" value={values.currentPosition.package} onChange={onChangePostition}/>
        <TextInput label="Enter Location" placeholder="Location" name="location" value={values.currentPosition.location} onChange={onChangePostition}/>
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
      </div>

      <div className='formField'>
      <FutureGoals label="Write Your Future Goals" placeholder="Future Goals" value={values.goals} name="goals" onChange={onChange}/>
      </div>

      <div className='formField'>
      <FutureGoals label="Any Other Relevant Details" placeholder="Your Answer" value={values.relDetails} name="relDetails" onChange={onChange} />
      </div>
      
      <div className='formField'>
        <TextInput label="Enter Your Github Link" placeholder="Github Link" name="githubLink" value={values.gitHubLink} onChange={onChange}  />
      </div>

      <div className='formField'>
        <TextInput label="Enter Your LinkedIn Link" placeholder="LinkedIn Link" name="linkedinLink" value={values.linkedinLink} onChange={onChange}  />
      </div>

      <Button variant='contained' onClick={submitForm}>Submit</Button>

    </form>
}
  </div>
  )
};

export default App;
