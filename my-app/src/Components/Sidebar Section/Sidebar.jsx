import React from "react";
import "./sidebar.css";

import Fusion_Logo from '../../Assets/Fusion_Logo.png'
import {FaTshirt} from 'react-icons/fa'
import {AiFillPhone} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'



const Sidebar = () => {
  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={Fusion_Logo} alt="Image" />
        <h2>OutdoorFusion</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">
          QUICK MENU
        </h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <FaTshirt className='icon'/>
              <span className="smallText">
                Items
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <AiFillPhone className='icon'/>
              <span className="smallText">
                Contact
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <BsFillPersonFill className='icon'/>
              <span className="smallText">
                My account
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <AiFillHome className='icon'/>
              <span className="smallText">
                Home
              </span>
            </a>
          </li>

        </ul>


      </div>
    </div>
  )
}

export default Sidebar;
