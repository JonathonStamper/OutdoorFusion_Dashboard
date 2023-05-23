import { Link } from "react-router-dom";
import './Nav.css';

export default function NavBar(){
    return(
        <>
        <nav className="nav">
            <a className="site-title" href="/">OutdoorFusion</a>
            <ul>
                <li>User:123</li>
                <li><a href="/performance">Performance</a></li>
            </ul>
        </nav>
        </>
    )
} 