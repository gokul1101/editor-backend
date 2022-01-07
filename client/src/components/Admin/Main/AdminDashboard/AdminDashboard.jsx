import React from "react";
import "./AdminDashboard.css";
import adminUser from "../../../../images/admin-dashboard-user.png";
import adminStar from "../../../../images/admin-star.png";
import adminSubmission from "../../../../images/admin-submission.png";
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
                alt="someImage"
                src={adminUser}
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
              alt="someImage"
                src={adminStar}
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
              alt="someImage"
                src={adminSubmission}
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
