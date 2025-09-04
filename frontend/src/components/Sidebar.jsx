import React, { useState } from 'react'
import { MdOutlineSearch  } from "react-icons/md";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

const Sidebar=()=> {
  const navigate =useNavigate();
  const {otherUsers} =useSelector(store=>store.user)
  const dispatch =useDispatch()

  const logoutHandler=async()=>{
    try{
      const res= await axios.get(`http://localhost:8080/api/v1/user/logout`)
      navigate('./login')
      toast.success(res.data.message)
      dispatch(setAuthUser(null))
    }catch(error){
      console.log(error)
    }
  }

    const [search,setSearch]=useState("")
    const searchSubmitHandLer=(e)=>{
      e.preventDefault()
      const conversationUser =  otherUsers?.find((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()))
      if(conversationUser){
        dispatch(setOtherUsers([conversationUser]))
      }else{
        toast.error("User not found")
      }
    }
    
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form action="" onSubmit={searchSubmitHandLer} className='flex items-center gap-2'>
        <input 
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='input input-bordered rounded-md'  
        type="text" 
        placeholder='Search...' />
        <button type='submit' className='btn  bg-slate-500 text-white'>
            <MdOutlineSearch className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>

      <OtherUsers/>

      <div onClick={logoutHandler} className='mt-2'>
        <button className='btn btn-sm'>Logout</button>
      </div>
      

    </div>
  )
}

export default Sidebar
