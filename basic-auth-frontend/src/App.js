import React,{Component} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
class App extends Component {
  render() {
    return (
        <Router>
        <nav>
          <Link to='/'> Home </Link>
          <Link to='/Register'> Register </Link>
          <Link to='/Login'> Login </Link>
        </nav>
        <header className="App-header">
        <h1> auth app challenge</h1>
        </header>
          <Routes>
            
            <Route path='/'  element={<Home/>}/> 
            <Route path='/Login'  element={<Login/>}/> 
            <Route path='/Register' element={<Register/>}/>

          </Routes>
       
        </Router>
    );
  }
}

export default App;
