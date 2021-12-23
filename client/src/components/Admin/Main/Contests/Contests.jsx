import React, { useContext, useEffect, useState } from "react";
import "./Contests.css";
import { Link } from "react-router-dom";
import helperService from "../../../../services/helperService";
import { AuthContext, useLoader } from "../../../../contexts/AuthContext";
import Pagination from "@material-ui/lab/Pagination";
import CustomButton from "../../../Reducer/CustomButton/CustomButton";

const Contests = (props) => {
  const [loader, showLoader, hideLoader] = useLoader();
  const limit = 3;
  const [authState, authDispatch] = useContext(AuthContext);
  const [contests, setContests] = useState({
    upcoming: [],
    ongoing: [],
    past: [],
    pastContestsCount: 0,
  });
  const [page, setPage] = useState(1);
  const handlePagination = (e, value) => {
    if (page !== value) {
      setPage(value);
      fetchContests(value, true);
    }
  };
  const fetchContests = async (page = 1, past = false) => {
    try {
      showLoader();
      const { status, data } = await helperService.getAllContests(
        { page, past, limit },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        const {
          pastContests,
          ongoingContests,
          upcomingContests,
          pastContestsCount,
        } = data.message;
        // console.log(data);
        setContests({
          pastContestsCount,
          past: pastContests,
          ongoing:
            ongoingContests.length > 0
              ? [...contests.ongoing, ...ongoingContests]
              : contests.ongoing,
          upcoming:
            upcomingContests.length > 0
              ? [...contests.upcoming, ...upcomingContests]
              : contests.upcoming,
        });
         hideLoader();
      }
    } catch (err) {
      console.log(err);
      hideLoader();
    }
  };
  useEffect(() => {
    fetchContests();
  }, []);
  const setContest = (contest) => {
    authDispatch({ type: "SET_CONTEST", payload: { ...contest } });
  };
  return (
    <div
      className="container-fluid"
      style={{ height: "100vh", overflowY: "scroll", marginTop: "40px" }}
    >
      {loader}
      <div className="d-flex">
        <div className="contest-header mr-auto">
          <p className="text-left dash-title-category pb-2">Contests</p>
        </div>
        <Link to="/contests/create-contest">
          <CustomButton className="btn-hover color-11 mt-0">
            <i className="fas fa-plus pr-2 pl-2"></i>CREATE CONTEST
          </CustomButton>
        </Link>
      </div>
      <div className="mt-3 mb-3">
        <div className="upcoming-events">
          <div className="upcoming-header">
            <span>Current Contests</span>
          </div>
        </div>
        <div className="d-flex border-top border-bottom mt-2 p-2 mb-2">
          <div className="col-md-3 text-center content-nav-title">Title</div>
          <div className="col-md-3 text-center content-nav-title">
            Starts at
          </div>
          <div className="col-md-3 text-center content-nav-title">Ends at</div>
          <div className="col-md-3 text-center content-nav-title">
            <i className="fas fa-clock"></i>
          </div>
        </div>
        <div className="d-flex flex-column">
          {contests?.ongoing?.map((event) => {
            return (
              <div className="d-flex mt-2 mb-2">
                <i className="fas fa-link contest-link position-relative"></i>
                <div className="col-md-3 text-center upcoming-task">
                  <Link
                    to={`/contests/${event._id}/edit`}
                    onClick={() => setContest(event)}
                  >
                    <span>{event.name}</span>
                  </Link>
                </div>
                <div className="col-md-3 text-center">{`${new Date(
                  event.start_date
                ).toLocaleString()} `}</div>
                <div className="col-md-3 text-center">{`${new Date(
                  event.end_date
                ).toLocaleString()} `}</div>
                <div className="col-md-3 text-center">
                  <span>{event.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 mb-3">
        <div className="upcoming-events">
          <div className="upcoming-header">
            <span>Upcoming Contests</span>
          </div>
        </div>
        <div className="d-flex border-top border-bottom mt-2 p-2 mb-2">
          <div className="col-md-3 text-center content-nav-title">Title</div>
          <div className="col-md-3 text-center content-nav-title">
            Starts at
          </div>
          <div className="col-md-3 text-center content-nav-title">Ends at</div>
          <div className="col-md-3 text-center content-nav-title">
            <i className="fas fa-clock"></i>
          </div>
        </div>
        <div className="d-flex flex-column">
          {contests?.upcoming?.map((event) => {
            console.log(event);
            return (
              <div className="d-flex mt-2 mb-2">
                <i className="fas fa-link contest-link position-relative"></i>
                <div className="col-md-3 text-center upcoming-task">
                  <Link
                    to={`/contests/${event._id}/edit`}
                    onClick={() => setContest(event)}
                  >
                    <span>{event.name}</span>
                  </Link>
                </div>
                <div className="col-md-3 text-center">{`${new Date(
                  event.start_date
                ).toLocaleString()} `}</div>
                <div className="col-md-3 text-center">{`${new Date(
                  event.end_date
                ).toLocaleString()} `}</div>
                <div className="col-md-3 text-center">
                  <span>{event.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 mb-3">
        <div className="upcoming-events">
          <div className="upcoming-header">
            <span>Past Contests</span>
          </div>
        </div>
        <div className="d-flex border-top border-bottom mt-2 p-2 mb-2">
          <div className="col-md-3 text-center content-nav-title">Title</div>
          <div className="col-md-3 text-center content-nav-title">
            Started at
          </div>
          <div className="col-md-2 text-center content-nav-title">
            <i className="fas fa-users"></i>
          </div>
          <div className="col-md-2 text-center content-nav-title">
            <i className="fas fa-clock"></i>
          </div>
          <div className="col-md-2 text-center content-nav-title">Status</div>
        </div>

        <div className="d-flex flex-column">
          {contests?.past?.map((event) => {
            return (
              <div className="d-flex mt-2 mb-2">
                <i className="fas fa-link contest-link position-relative"></i>
                <div className="col-md-3 text-center upcoming-task">
                  <span>{event.name}</span>
                </div>
                <div className="col-md-3 text-center">{`${new Date(
                  event.start_date
                ).toLocaleString()} `}</div>
                <div className="col-md-2 text-center">180</div>
                <div className="col-md-2 text-center">
                  <span>{event.duration}</span>
                </div>
                <div className="col-md-2 text-center">
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Pagination
          count={
            Math.floor(contests?.pastContestsCount / limit) +
            (contests?.pastContestsCount % limit !== 0 ? 1 : 0)
          }
          color="primary"
          variant="text"
          className="mt-5 d-flex justify-content-center"
          onChange={(e, value) => handlePagination(e, value)}
        />
      </div>
    </div>
  );
};

export default Contests;
