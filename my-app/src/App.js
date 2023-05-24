import logo from './logo.svg';
import './App.css';
import NavBar from './Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/HomePage';
import Chart_Diplay from './Components/ChartDisplayer';

export default function App() {
  return (
    <Router>
      
        <NavBar></NavBar>
        <div>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/Perfomances" element="" />
            <Route path='/Datachart/:table' element={<Chart_Diplay/>}/>
          </Routes>
        </div>
      
    </Router>
  );
}