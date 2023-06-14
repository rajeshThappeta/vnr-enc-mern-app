import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <ul class="nav">
    <li class="nav-item">
      <Link class="nav-link active" to=''>Home</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link active" to='register'>Register</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link active" to='login'>Login</Link>
    </li>
  
  </ul>
  )
}

export default Header