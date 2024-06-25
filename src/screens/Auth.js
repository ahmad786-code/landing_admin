import React from 'react'
import Login from '../components/Login'
 

const Auth = ({setUser}) => {
  return (
    <div className='auth_contaner'>
        <Login setUser={setUser} />
    </div>
  )
}

export default Auth