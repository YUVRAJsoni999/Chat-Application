import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

function OtherUser(props) {
    const user=props.user

    const dispatch=useDispatch();
    const {selectedUser,onlineUsers}=useSelector(store=>store.user)
    const isOnline=onlineUsers?.includes(user._id)
    
    const selectedUserHandler =()=>{
        dispatch(setSelectedUser(user))
    }

  return (
    <>
        <div onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id===user?._id? 'bg-zinc-500' : ''} flex gap-2 items-center hover:bg-zinc-600 rounded p-2 cursor-pointer`}>
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                <div className='w-12 rounded-full'>
                    <img src={user?.profilePhoto} alt="user-profile" />
                </div>
            </div>
            <div className='flex flex-col flex=1'>
                <div className='flex justify-between gap-2'>
                    <p>{user?.fullName}</p>
                </div>
            </div>
        </div>
        <div className='divider my-0 py-0 '>

        </div>
        
    </>
  )
}

export default OtherUser
