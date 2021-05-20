import axios from 'axios'
import setUser from '../redux/authReducer'
import {connect} from 'react-redux'
import {useState} from 'react'

const Auth = (props) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleRegsiter = () => {
    axios.post('/auth/register',{email,password})
      .then(res=>{
        props.setUser(res.data)
        props.history.push("/products")
      })
      .catch(err=>console.log(err))
  }

  const handleLogin = () => {
    axios.post('/auth/login',{email,password})
      .then(res=>{
        props.setUser(res.data)
        props.history.push("/products")
      })
      .catch(err=>console.log(err))
  }

  return(
    <div>
      <h1>Auth Page</h1>
      <input value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegsiter}>Register</button>
    </div>
  )
}

export default connect(null,{setUser})(Auth)