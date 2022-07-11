import '../App.css';
import {  useState } from "react";

function Register() {
  //manage state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [message, setMessage] = useState('Hello');
  
  //Server event for registering a new user
  async function registerUser (e){
    e.preventDefault();
    console.log('connecting on '+ process.env.REACT_APP_PORT)
    const response = await fetch('http://localhost:'+process.env.REACT_APP_PORT+'/api/register',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    
    const data = await response.json()

    if(data.name){
      console.log(data.name + " User Created")
      setMessage(data.name + " User Created")
      console.log("DB Response " + data.status);
    }else{
      console.log("No User Created")
      setMessage('User Already Exists')
    }
  }

  // JSX render area#################################
return (
  <div className="App">
      {/* start form  */}
      <div className="frontEndStart">
      <form className="form" onSubmit={registerUser}  method="post">
      <h1>Register</h1>
        <input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange= {(e) => setName(e.target.value)}  
        />
        <input 
        type="email" 
        placeholder="E-Mail" 
        value={email}
        onChange= {(e) => setEmail(e.target.value)}
        />
        <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange= {(e) => setPassword(e.target.value)}

        />
      <input type="submit" value="Register" />
      </form>
      <p>{message}</p>
    </div>
  </div>
);
}

export default Register;
