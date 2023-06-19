import {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Register() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let navigate=useNavigate()
  let [image,setImage]=useState()

  //this function will be called when user selects an image
  const onImageSelect=(event)=>{
   
   setImage(event.target.files[0])
  }



 

  const onFormSubmit=async(userObj)=>{
    //get FormData object
    let formData=new FormData()
    //add file 
    formData.append('photo',image,image.name)
    //add user obj
    formData.append('newUser',JSON.stringify(userObj))
    //make HTTP post req to userApi
    let res=await axios.post('http://localhost:4000/user-api/user',formData)
    console.log(res)
    if(res.status===201 && res.data.message==='created'){
        navigate('/login')
    }
  } 

  return (
    <div>
      <p className="display-3 text-info text-center">User Registration</p>
      <form className='w-50 mx-auto mt-3' onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" {...register('username')} id="" className="form-control mb-3" placeholder='Username' />
        <input type="text" {...register('password')} id="" className="form-control mb-3" placeholder='Password' />
        <input type="email" {...register('email')} id="" className="form-control mb-3" placeholder='Email' />
        <input type="date" {...register('dob')} id="" className="form-control mb-3" />
        <input type="file" {...register('photo')} id="" className="form-control mb-3" onChange={onImageSelect} />
        <button className="btn btn-success" type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register