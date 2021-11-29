import React, { useContext, useEffect } from "react";
import Male from "../../../Images/man.png";
import Female from "../../../Images/woman.png";
import HeaderArt from "../../../Images/header-art.svg";
import ProblemKit from "../../../Images/problem-img.svg";
import LoopHeader from "../../../Images/Loop start.svg";
import Img1 from "../../../Images/img-1 (1).svg";
import Img2 from "../../../Images/img-1 (2).svg";
import Img3 from "../../../Images/img-1 (3).svg";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import { DataContext } from "../../../../Context";
const Dashboard = (props) => {
  useEffect(() => {
    props.setSideToggle(false);
    helloFuc();
  });

  const { helloFuc } = useContext(DataContext);
  return (
    <div className="container-fluid dashboard">
      <NavLink to="/profile" exact>
        <div className="user-info position-relative">
          <div className="d-flex mx-4 pt-3 user-det justify-content-end">
            <div className="gender-info mr-3">
              <img src={Male} alt="male" height="50" width="50" />
            </div>
            <div className="user-profile d-flex flex-column">
              <span className="user-name">Dhanush Karthick S</span>
              <span className="register-no">1813015</span>
            </div>
          </div>
        </div>
      </NavLink>
      <div className="header-dashboard mt-5">
        <div className="d-flex">
          <div className="col-md-7">
            <p className="header-title mt-1">
              <span className="dash-greet">Welcome</span> DHANUSH KARTHICK S ..!
            </p>
            <div className="d-flex border-header mt-3 align-items-center justify-">
              <div className="col-md-7 d-flex flex-column pl-4">
                <span className="header-article">Become a</span>
                <span className="header-article">Full Stack</span>
                <span className="header-article mb-3">Web Developer</span>
                <NavLink to="/articles">
                  <span className="span-arrow">
                    <i className="fas fa-arrow-circle-right"></i> Learn more..
                  </span>
                </NavLink>
              </div>
              <div className="col-md-5 p-0">
                <img
                  className="img-fluid"
                  alt="Header Banner"
                  src={HeaderArt}
                />
              </div>
            </div>
          </div>
          <div
            className="col-md-4 p-3 d-flex border-header-1"
            style={{
              backgroundImage: `url(${ProblemKit})`,
              height: "280px",
              backgroundSize: "50% 100%",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgb(57, 185, 143)",
              backgroundPosition: "78% 15%",
            }}
          >
            <div className="problem-solve-header d-flex flex-column align-items-center mt-5">
              <div className="d-flex flex-column align-self-start">
                <span className="problem-article">Problem </span>
                <span className="problem-article">Solving </span>
                <span className="problem-span mb-2">For students</span>
                <NavLink to="/codekata">
                  <span className="arrow-span">
                    <i className="fas fa-arrow-circle-right"></i> Learn more..
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-code mt-5">
        <p className="text-center dash-title-category">WHY LOOP ?</p>
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-md-6 d-flex flex-column align-items-center">
            <div className="d-flex flex-column mt-3">
              <span className="dash-title">Learn, Practice</span>
              <span className="dash-title">Get Hired</span>
            </div>
            <div className="d-flex flex-column mt-3">
              <span>Loop providing you a better platform to learn, </span>
              <span>practice and preparing for getting </span>
              <span>offers in the top MNC's</span>
            </div>
          </div>
          <div className="col-md-6">
            <img src={LoopHeader} alt="" />
          </div>
        </div>
      </div>
      <div className="dashboard-code mt-5">
        <p className="text-center dash-title-category">CODEKATA</p>
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <img src={Img1} alt="" />
          </div>

          <div className="col-md-6 d-flex flex-column align-items-center">
            <div className="d-flex flex-column mt-3">
              <span className="dash-title">Getting too</span>
              <span className="dash-title">Bored ?</span>
            </div>
            <div className="d-flex flex-column mt-3">
              <span>Get some knowledge by reading the </span>
              <span>articles whe you get bored </span>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-code mt-5">
        <p className="text-center dash-title-category">COMPILER</p>
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-md-6 d-flex flex-column align-items-center">
            <div className="d-flex flex-column mt-3">
              <span className="dash-title">Learn, Practice</span>
              <span className="dash-title">Get Hired</span>
            </div>
            <div className="d-flex flex-column mt-3">
              <span>Loop providing you a better platform to learn, </span>
              <span>practice and preparing for getting </span>
              <span>offers in the top MNC's</span>
            </div>
          </div>
          <div className="col-md-6">
            <img src={Img2} alt="" />
          </div>
        </div>
      </div>
      <div className="dashboard-code mt-5">
        <p className="text-center dash-title-category">ROADMAP</p>
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <img src={Img3} alt="" />
          </div>

          <div className="col-md-6 d-flex flex-column align-items-center">
            <div className="d-flex flex-column mt-3">
              <span className="dash-title">Getting too</span>
              <span className="dash-title">Bored ?</span>
            </div>
            <div className="d-flex flex-column mt-3">
              <span>Get some knowledge by reading the </span>
              <span>articles whe you get bored </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
