import logo from './logo.svg';
import './App.css';
import NavBar from './Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/HomePage';

export default function App() {
  return (
    <Router>
      
        <NavBar></NavBar>
        <div>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/Perfomances" element="" />
  
          </Routes>
        </div>
      
    </Router>
  );
}