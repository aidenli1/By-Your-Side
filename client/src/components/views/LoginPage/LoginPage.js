import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const clickMe = () => {
    console.log("lslslksn")
    navigate('/register')
  }

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/');
        } else {
          alert('Error')
        }
      })
  }


  return (

    <>
    
    <div className='center' style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
  }}>
     

      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button type='submit'
          style={{
            width: '200px'
          }}>
          Login
        </button>
      </form>
      <br />

      <button onClick={clickMe}
        style={{
          width: '200px'
        }}>
        Join
      </button>

      
    </div>
    </>
  )
}

export default LoginPage