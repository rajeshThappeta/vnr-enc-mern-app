import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Register() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let navigate=useNavigate()

  const onFormSubmit=async(userObj)=>{
    //make HTTP post req to userApi
    let res=await axios.post('http://localhost:4000/user-api/user',userObj)
    console.log(res)
    if(res.status===201 && res.data.message==='created'){
        navigate('/login')
    }
  } 

  return (
    <div>
      <p className="display-3 text-info text-center">User Registration</p>
      <form className='w-50 mx-auto mt-3' onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" {...register('username')} id="" className="form-control mb-3" />
        <input type="text" {...register('password')} id="" className="form-control mb-3" />
        <input type="email" {...register('email')} id="" className="form-control mb-3" />
        <input type="date" {...register('dob')} id="" className="form-control mb-3" />
        <button className="btn-btn-success" type='submit'>Regsiter</button>
      </form>
    </div>
  )
}

export default Register