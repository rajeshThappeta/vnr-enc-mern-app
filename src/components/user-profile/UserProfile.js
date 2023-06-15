import React from 'react'
import {useSelector} from 'react-redux'

function UserProfile() {
 let {currentUser}=useSelector(state=>state.login)

  return (
    <div>
      <p className="display-5 text-primary text-end">Welcome ,{currentUser.username}</p>
    </div>
  )
}

export default UserProfile