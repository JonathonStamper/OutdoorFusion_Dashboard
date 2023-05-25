import React from "react";
import "./sidebar.css";

import dashboardIcon from "../../Assets/dashboardIcon.png";
import { FaTshirt } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={dashboardIcon} alt="Image" />
        <h2>ScrapeDoorFusion &trade;</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">QUICK MENU</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="#" className="menuLink">
              <FaTshirt className="icon" />
              <span className="smallText">Items</span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink">
              <AiFillPhone className="icon" />
              <span className="smallText">Contact</span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink">
              <BsFillPersonFill className="icon" />
              <span className="smallText">My account</span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink">
              <AiFillHome className="icon" />
              <span className="smallText">Home</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sideBarCard">
        <AiOutlineQuestionCircle />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle1"></div>

          <h3>Help center</h3>
          <p>Having trouble using scrapedoorfusion? Let us know!</p>
          <button className="btn">Help</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
