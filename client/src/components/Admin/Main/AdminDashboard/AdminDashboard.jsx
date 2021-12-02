import React from "react";
import "./AdminDashboard.css";
const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div
        className="d-flex align-items-center justify-content-center flex-wrap"
        style={{ marginTop: "40px" }}
      >
        <div className="col-md-3 m-2 dash-highlight p-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <h1 className="user-count">121</h1>
              <span className="user-span">Total no. of users</span>
            </div>
            <div className="img-start ">
              <img
                src="https://cdn-icons-png.flaticon.com/512/476/476863.png"
                height="80"
                width="80"
                className="img-fluid "
              />
            </div>
          </div>
        </div>
        <div className="col-md-3 m-2 dash-highlight p-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <h1 className="user-count">08</h1>
              <span className="user-span">Total no. of Contests</span>
            </div>
            <div className="img-start">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3141/3141839.png"
                height="80"
                width="80"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        <div className="col-md-3 m-2 dash-highlight p-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <h1 className="user-count">21</h1>
              <span className="user-span">Total no. of Submissions</span>
            </div>
            <div className="img-start">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3874/3874088.png"
                height="80"
                width="80"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
