import React from 'react'
import { useLoginStore } from './../../store/loginStore'
import { useNavigate } from 'react-router-dom'
interface LoginProps {

}

export const Login: React.FC<LoginProps> = ({ }) => {
  const { loginInfo, setLoginState, setLogin } = useLoginStore()
  const navigate = useNavigate();
  const login = () => {
    setLogin()
    navigate('/')
  }
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginInfo, loginName: e.target.value })
  }
  return (
    <>
      <div>Login</div>
      <label htmlFor="">Name</label>
      <input type="text" value={loginInfo.loginName} onChange={onInput} />
      <button onClick={login}>Login</button>
    </>
  );
}