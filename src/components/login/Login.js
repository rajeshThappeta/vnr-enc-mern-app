import {useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'

import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import { userLogin } from '../../slices/loginSlice';

function Login() {

  let  {userLoginStatus,errorMessage}=useSelector(state=>state.login)

  let {register,handleSubmit,formState:{errors}}=useForm()
  let navigate=useNavigate()
  let dispatch=useDispatch()

  let [loginUserErr,setLoginUserErr]=useState('')

  const onFormSubmit=async(userCredObj)=>{
    //make HTTP post req to userApi
   // console.log(userCredObj)
    let actionObj=userLogin(userCredObj)
    dispatch(actionObj)
  } 


  useEffect(()=>{
    if(userLoginStatus===true){
      navigate('/user-profile')
    }else{
      setLoginUserErr(errorMessage)
    }
  },[userLoginStatus,errorMessage])

  console.log(userLoginStatus,errorMessage)

  return (
    <div>
    <p className="display-3 text-info text-center">User Login</p>

    {/* login error message */}
    {loginUserErr.length!==0 && <p className='text-danger text-center display-6'>{errorMessage}</p>}
    <form className='w-50 mx-auto mt-3' onSubmit={handleSubmit(onFormSubmit)}>
      <input type="text" {...register('username')} id="" className="form-control mb-3" placeholder='Username' />
      <input type="text" {...register('password')} id="" className="form-control mb-3" placeholder='Password' />
     
      <button className="btn btn-success" type='submit'>Login</button>
    </form>
  </div>
  )
}

export default Login