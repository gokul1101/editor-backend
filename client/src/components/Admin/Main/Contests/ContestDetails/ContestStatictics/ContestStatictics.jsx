import React, { useEffect } from "react";
import "./ContestStatictics.css";
import SubmissionGif from "../../../../../Images/submission.gif";
import Pagination from "@material-ui/lab/Pagination";
import { useContext } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import helperService from "../../../../../../services/helperService";
import { useState } from "react";
const limit = 10;
const ContestStatictics = (props) => {
  const {id} = useParams()
  const [authState,] = useContext(AuthContext);
  const fethContestSubmissions = async () => {
    try {
      const { data, status } = await helperService.getContestSubmissions(
        {page,limit,contest_id:id},
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        setSubmissions(data?.submissions?.submissions || [])
        if(!total) setTotal(data?.submissions?.totalCount || 0)
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fethContestSubmissions();
  }, []);
  const [page, setPage] = useState(1);
  const [total,setTotal] =  useState(0)
  const [submissions,setSubmissions] = useState([])
  const handlePagination = (e, value) => {
    if (page !== value) {
      setPage(value);
      fethContestSubmissions(value);
    }
  };
  return (
    <div className="container-fluid w-100 mt-5">
      <div className="d-flex stats-main">
        <div className="col-md-9 mb-5 stats-left d-flex flex-column border">
          <div className="statistics-nav d-flex justify-content-center mt-3 mb-2 w-100">
            <div className="col-md-2 inner-stat-nav">S.NO</div>
            <div className="col-md-2 inner-stat-nav">REG.NO</div>
            <div className="col-md-3 inner-stat-nav">NAME</div>
            <div className="col-md-2 inner-stat-nav">TIME</div>
            <div className="col-md-3 inner-stat-nav">POINTS</div>
          </div>

          {submissions.map((e, id) => {
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
          <div>
          <Pagination
          count={
            Math.floor(total / limit) +
            (total % limit !== 0 ? 1 : 0)
          }
          color="primary"
          variant="text"
          className="mt-5 d-flex justify-content-center"
          onChange={(e, value) => handlePagination(e, value)}
        />
          </div>
        </div>

        <div className="col-md-3 stats-right d-flex flex-column m-1">
          <div className="top-part mx-2 my-2 p-2">
            <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
              <img
                alt="someImage"
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
                <div className="col-md-4 d-flex justify-content-between align-items-center">
                  <img
                    alt="someImage"
                    src="https://img.icons8.com/emoji/30/000000/coin-emoji.png"
                  />
                  <span className="score-point">1029</span>
                </div>
              </div>
              <div className="d-flex mt-2 mb-2">
                <div className="col-md-2">
                  <button className="correct">2</button>
                </div>
                <div className="col-md-6 top-scorer">Dhanush Karthick</div>
                <div className="col-md-4 d-flex justify-content-between align-items-center">
                  <img
                    alt="someImage"
                    src="https://img.icons8.com/emoji/30/000000/coin-emoji.png"
                  />
                  <span className="score-point">102</span>
                </div>
              </div>
              <div className="d-flex mt-2 mb-2">
                <div className="col-md-2">
                  <button className="correct">3</button>
                </div>
                <div className="col-md-6 top-scorer">Dhanush Karthick</div>
                <div className="col-md-4 d-flex justify-content-between align-items-center">
                  <img
                    alt="someImage"
                    src="https://img.icons8.com/emoji/30/000000/coin-emoji.png"
                  />
                  <span className="score-point">10</span>
                </div>
              </div>
            </div>
          </div>
          <div className="top-part mx-2 my-2 p-3">
            <div className="submissions d-flex flex-column align-items-center justify-content-center">
              <img src={SubmissionGif} height="98" width="96" />
              <span className="mt-4">
                Total no. of submissions :{" "}
                <span className="submission-count">40</span>
              </span>
              <span>
                No. of submissions Left :{" "}
                <span className="submission-count">20</span>
              </span>
              <span>
                Ena vaikrathunu therla :{" "}
                <span className="submission-count">10</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestStatictics;
