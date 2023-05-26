import React from "react";
import "./sidebar.css";

import Logos from "../../Assets/Logos.png";
import { FaTshirt } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BsQuestionLg } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={Logos} alt="Image" />
        <h2>ScrapeFusion &trade;</h2>
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

        </ul>
      </div>

      <div className="sideBarCard">
        <BsQuestionLg className="icon"/>
        <div className="cardContent">
          <img src="https://i.pinimg.com/originals/86/d7/5a/86d75a902dda5a4c6ac4b95d8a5afba4.gif" alt="img" />
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>Help center</h3>
          <p>Having trouble using scrapedoorfusion? Let us know!</p>
          <button className="btn">Help</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
