import '../App.css';
import {useState} from "react";


function Login() {
  //manage state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [message, setMessage] = useState('Default');
  const [authMessage, setAuthMessage]=useState('Unchecked')
    
  //Server event for loging in
  async function loginUser (e){
    e.preventDefault();

    const response = await fetch('http://localhost:'+process.env.REACT_APP_PORT+'/api/login',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    
    const data = await response.json()

    if(data.isUser){
      //store token locally
      localStorage.setItem('token', data.token)
      //inform who you logged in as
      alert('Logged in as ' + '`' + data.name + '`')
      setMessage('Logged In as '+ data.name)
      console.log(message)
    }else{
      localStorage.setItem('token', '')
      setMessage('Not Logged In')
      alert('Not Logged in')
    }
    
    console.log("Login", data);
  }
  // verify authentication
  async function checkAuthentication() {

    console.log(localStorage.getItem('token'))
		const req = await fetch("http://localhost:"+process.env.REACT_APP_PORT+"/api/checkauth", {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			}
		})

		const data = await req.json()
    console.log(data)
		if (data.status === 'ok') {
			setAuthMessage("Yes")
		} else {
			setAuthMessage("No")
		}
  }
// JSX render area#################################
return (
  <div className="App">
     {/* start form  */}
      <div className="frontEndStart">
      <form className="form" onSubmit={loginUser}  method="post">
      <h1>Login</h1>
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
      <input type="submit" value="Log In" />
        <p>{message}</p>
      </form>
      <button onClick={checkAuthentication}> Am I Authethenticated? </button>
      <p>{authMessage}</p>
    </div>
  </div>
);
}

export default Login;
