import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [Age, setAge] = useState("")
  const [Gender, setGender] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onAgeHandler = (event) => {
    setAge(event.currentTarget.value)
  }
  const onGenderHandler = (event) => {
    setGender(event.currentTarget.value)
  }
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPassword = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();


    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야합니다.")
    }

    let body = {
      name: Name,
      age: Age,
      gender: Gender,
      email: Email,
      password: Password
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          navigate('/');
        } else {
          alert('Failed to sign up')
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
          <label>Name</label>
          <input type="text" value={Name} onChange={onNameHandler} />

          <label>Age</label>
          <input type="number" value={Age} onChange={onAgeHandler} />

          <label>Gender</label>
          <input type="text" value={Gender} onChange={onGenderHandler} />

          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />

          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler} />

          <label>Confirm password</label>
          <input type="password" value={ConfirmPassword} onChange={onConfirmPassword} />

          <br />

          <button type='submit'>
            회원가입
          </button>

        </form>


      </div>
    </>
  )
}

export default RegisterPage