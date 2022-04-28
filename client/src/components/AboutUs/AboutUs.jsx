import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../images/Loop1.jpg";
import ProfilePic from "../../images/man.png";
import GoBack from "../Reducer/GoBack/GoBack";
import { TeamCard } from "../Reducer/TeamCard/TeamCard";
import "./AboutUs.css";
export const AboutUs = () => {
  const history = useHistory();
  return (
    <div className="container-fluid team-page d-flex flex-column">
      <div className="position-absolute go-back my-3">
        <GoBack onClickHandler={() => history.push("/login")} />
      </div>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <img src={Logo} className="img-fluid my-2" height={100} width={100} />
        <span className="team">Meet the Team</span>
      </div>
      <div className="d-flex my-4">
        <div className="col-md-3 border-right d-flex align-items-center justify-content-center flex-column">
          <span className="team my-3">Supporter</span>
          <TeamCard
            src={ProfilePic}
            name="Dhanush Karthick S"
            designation="HOD / CSE"
          />
        </div>
        <div className="col-md-9 d-flex flex-column">
          <span className="team text-center my-3">GUIDE</span>
          <div className="d-flex col-md-12">
            <div className="col-md-4">
              <TeamCard
                src={ProfilePic}
                name="Dhanush Karthick S"
                designation="HOD / CSE"
              />
            </div>
            <div className="col-md-4">
              <TeamCard
                src={ProfilePic}
                name="Dhanush Karthick S"
                designation="HOD / CSE"
              />
            </div>
            <div className="col-md-4">
              <TeamCard
                src={ProfilePic}
                name="Dhanush Karthick S"
                designation="HOD / CSE"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <span className="team my-3">DEVELOPERS COMMUNITY</span>
        <div className="col-md-12 d-flex flex-wrap align-items-center justify-content-center">
          <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
            <TeamCard
              src={ProfilePic}
              name="Dhanush Karthick S"
              designation="Developer"
            />
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
            <TeamCard
              src={ProfilePic}
              name="Dhusanthan R"
              designation="Developer"
            />
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
            <TeamCard
              src={ProfilePic}
              name="Gajendhiran M"
              designation="Developer"
            />
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
            <TeamCard src={ProfilePic} name="Gokul S" designation="Developer" />
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
            <TeamCard
              src={ProfilePic}
              name="Gobinath S"
              designation="Developer"
            />
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
            <TeamCard
              src={ProfilePic}
              name="Nandha Kumar B"
              designation="Developer"
            />
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center flex-column">
            <TeamCard
              src={ProfilePic}
              name="Vasanthan P"
              designation="Developer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
