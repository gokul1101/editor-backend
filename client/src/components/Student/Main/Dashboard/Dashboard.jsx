import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import Male from "../../../Images/man.png";
import DashImg1 from "../../../Images/card-image-1.png";
import DashImg2 from "../../../Images/card-image-2.png";
import DashImg3 from "../../../Images/card-image-3.png";
import HeaderArt from "../../../Images/header-art.svg";
import ProblemKit from "../../../Images/problem-img.svg";
import LoopHeader from "../../../Images/Loop start.svg";
import Img1 from "../../../Images/img-1 (1).svg";
import Img2 from "../../../Images/img-1 (2).svg";
import Img3 from "../../../Images/img-1 (3).svg";
import { AuthContext } from "../../../../contexts/AuthContext";
const Dashboard = (props) => {
  const [authState, authDispatch] = useContext(AuthContext);

  return (
    <div className="container-fluid dashboard">
      <NavLink to="/profile" exact>
        <div className="user-info position-relative">
          <div className="d-flex mx-4 pt-3 user-det justify-content-end">
            <div className="gender-info mr-3">
              <img src={Male} alt="male" height="50" width="50" />
            </div>
            <div className="user-profile d-flex flex-column">
              <span className="user-name name-title">
                {authState?.user?.name}
              </span>
              <span className="register-no">{authState?.user?.regno}</span>
            </div>
          </div>
        </div>
      </NavLink>
      <div className="header-dashboard mt-5">
        <div className="d-flex flex-column">
          <div className="col-md-7">
            <p className="header-title mt-1">
              <span className="dash-greet">Welcome</span>{" "}
              {authState?.user?.name} ..!
            </p>
          </div>
          <div className="d-flex">
            <div className="col-md-7 border-header d-flex flex-column pl-4 mr-3">
              <div className="d-flex">
                <div className="banner-stack col-md-6 d-flex flex-column justify-content-center">
                  <span className="header-article">Become a</span>
                  <span className="header-article">Full Stack</span>
                  <span className="header-article mb-3">Web Developer</span>
                  <NavLink to="/articles">
                    <span className="span-arrow">
                      <i className="fas fa-arrow-circle-right"></i> Learn more..
                    </span>
                  </NavLink>
                </div>
                <div className="banner-stack-img col-md-6">
                  <img src={LoopHeader} className="img-fluid" />
                </div>
              </div>
            </div>
            <div
              className="col-md-4 d-flex border-header-1 mt-2"
              style={{
                backgroundImage: `url(${ProblemKit})`,
                height: "300px",
                backgroundSize: "50% 100%",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#B0D7C0",
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

        <div className="mt-5 mb-5">
          <h3 class="text-center card-title">What we do ?</h3>
          <div class="d-flex flex-wrap justify-content-center mt-5">
            <div class="dash-card what-we-do-card mr-5 ml-5">
              <div class="dash-card img-one  p-4 m-4">
                <img src={DashImg1} alt="" class="ml-2 img-fluid" />
              </div>
              <h6 class="card-title text-align-center">Target</h6>
              <p class="text-align-center">
                Set an target to complete MCQ’S and problems.
              </p>
            </div>

            <div class="dash-card what-we-do-card mr-5 ml-5">
              <div class="dash-card img-one  p-4 m-4">
                <img src={DashImg2} alt="" class="ml-2 img-fluid" />
              </div>
              <h6 class="card-title text-align-center">Schedule</h6>
              <p class="text-align-center">
                Admin will assign you a problem statement.
              </p>
            </div>

            <div class="dash-card what-we-do-card mr-5 ml-5">
              <div class="dash-card img-one  p-4 m-4">
                <img src={DashImg3} alt="" class="ml-2 img-fluid" />
              </div>
              <h6 class="card-title text-align-center">Timer</h6>
              <p class="text-align-center">
                Complete the problems in a period of time.
              </p>
            </div>
          </div>
        </div>
        <div className="dashboard-code mt-5">
          <p className="text-center dash-title-category">WHY LOOP ?</p>
          <div className="d-flex align-items-center justify-content-center">
            <div className="col-md-6 d-flex flex-column align-items-center">
              <div className="d-flex flex-column mt-3">
                <span className="dash-title">Learn, Practice , Get Hired</span>
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
                <span className="dash-title ml-5">
                  Write Code in repeat mode.
                </span>
              </div>
              <div className="d-flex flex-column mt-3">
                <span>Once the challenge is posted by a faculty </span>
                <span>complete within the certain period of time </span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-code mt-5">
          <p className="text-center dash-title-category">Articles</p>
          <div className="d-flex align-items-center justify-content-center">
            <div className="col-md-6 d-flex flex-column align-items-center">
              <div className="d-flex flex-column mt-3">
                <span className="dash-title">Are you bored ?</span>
              </div>
              <div className="d-flex flex-column mt-4 ml-5">
                <span>Get some knowlegde by reading the </span>
                <span>articles when u get bored. </span>
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
                <span className="dash-title">Got Confused ?</span>
              </div>
              <div className="d-flex flex-column mt-3 ml-5">
                <span>Here it is a a perfect roadmap that will </span>
                <span>leads to find a better path as a </span>
                <span>full stack developer and in many fields</span>
              </div>
            </div>
          </div>
        </div>
              <div className="footer-link d-flex justify-content-between  mt-3">
              <div>
                <p className="font-weight-bolder">Copyrights reserved to Loop @ 2022</p>
              </div>
              <div className="d-flex">
              <NavLink className="text-muted" to="">Privacy Policy |</NavLink>
              <NavLink className="text-muted" to="">Terms & Conditions</NavLink>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
