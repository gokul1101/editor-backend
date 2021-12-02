import React from "react";
import "./ContestStatictics.css";
import SubmissionGif from "../../../../../Images/submission.gif";
const ContestStatictics = (props) => {
  const stats = [
    {
      reg: 1813015,
      name: "Dhanush",
      time: 120,
      points: 98,
    },
    {
      reg: 1813016,
      name: "Dhusanthan",
      time: 120,
      points: 98,
    },
    {
      reg: 1813017,
      name: "Gaju",
      time: 120,
      points: 98,
    },
    {
      reg: 1813018,
      name: "Gobi",
      time: 120,
      points: 98,
    },
    {
      reg: 1813019,
      name: "Gokul",
      time: 120,
      points: 98,
    },
    {
      reg: 1813015,
      name: "Dhanush",
      time: 120,
      points: 98,
    },
    {
      reg: 1813016,
      name: "Dhusanthan",
      time: 120,
      points: 98,
    },
    {
      reg: 1813017,
      name: "Gaju",
      time: 120,
      points: 98,
    },
    {
      reg: 1813018,
      name: "Gobi",
      time: 120,
      points: 98,
    },
    {
      reg: 1813019,
      name: "Gokul",
      time: 120,
      points: 98,
    },
  ];
  return (
    <div className="container-fluid w-100">
      <div className="d-flex">
        <div className="col-md-9 d-flex flex-column border">
          <div className="statistics-nav d-flex justify-content-center mt-3 mb-2 w-100">
            <div className="col-md-2 inner-stat-nav">S.NO</div>
            <div className="col-md-2 inner-stat-nav">REG.NO</div>
            <div className="col-md-3 inner-stat-nav">NAME</div>
            <div className="col-md-2 inner-stat-nav">TIME</div>
            <div className="col-md-3 inner-stat-nav">POINTS</div>
          </div>
          {stats.map((e, id) => {
            return (
              <div className="stats d-flex w-100">
                <div className="col-md-2 stats-detail">{id + 1}</div>
                <div className="col-md-2 stats-detail">{e.reg}</div>
                <div className="col-md-3 stats-detail">{e.name}</div>
                <div className="col-md-2 stats-detail">{e.time}</div>
                <div className="col-md-3 stats-detail">{e.points}</div>
              </div>
            );
          })}
        </div>
        <div className="col-md-3 d-flex flex-column m-1">
          <div className="top-part mt-2 mb-2 p-2">
            <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
              <img
                src="https://img.icons8.com/emoji/30/000000/trophy-emoji.png"
                className="pr-3 img-fluid"
              />
              <span className="top-participants">Top 3 Participants</span>
            </div>
            <div className="d-flex flex-column mt-4">
              <div className="d-flex mt-2 mb-2">
                <div className="col-md-2">
                  <button className="correct">1</button>
                </div>
                <div className="col-md-6 top-scorer">Dhanush Karthick</div>
                <div className="col-md-4 d-flex justify-content-between">
                  <img src="https://img.icons8.com/emoji/30/000000/coin-emoji.png" />
                  <span className="score-point">1029</span>
                </div>
              </div>
              <div className="d-flex mt-2 mb-2">
                <div className="col-md-2">
                  <button className="correct">2</button>
                </div>
                <div className="col-md-6 top-scorer">Dhanush Karthick</div>
                <div className="col-md-4 d-flex justify-content-between">
                  <img src="https://img.icons8.com/emoji/30/000000/coin-emoji.png" />
                  <span className="score-point">103</span>
                </div>
              </div>
              <div className="d-flex mt-2 mb-2">
                <div className="col-md-2">
                  <button className="correct">3</button>
                </div>
                <div className="col-md-6 top-scorer">Dhanush Karthick</div>
                <div className="col-md-4 d-flex justify-content-between">
                  <img src="https://img.icons8.com/emoji/30/000000/coin-emoji.png" />
                  <span className="score-point">10</span>
                </div>
              </div>
            </div>
          </div>
          <div className="top-part mt-2 mb-2 p-3">
            <div className="submissions d-flex flex-column align-items-center justify-content-center">
              <img src={SubmissionGif} height="96" width="96" />
              <span>Total no. of submissions : <span className="submission-count">40</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestStatictics;
