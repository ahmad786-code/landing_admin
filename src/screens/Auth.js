import React from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

const Auth = ({setUser}) => {
  return (
    <div className='auth_contaner'>
        <Login setUser={setUser} />
        <SignUp setUser={setUser} />
    </div>
  )
}

export default Auth