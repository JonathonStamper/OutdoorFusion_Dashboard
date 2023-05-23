import logo from './logo.svg';
import './App.css';
import NavBar from './Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <>
        <NavBar></NavBar>
        <div>
          <Routes>
            <Route path="/" element="" />
            <Route path="/perfomances" element="" />
  
          </Routes>
        </div>
      </>
    </Router>
  );
}