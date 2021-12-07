import { useEffect, useState } from "react";
import InputReducer from "../../../../Reducer/InputReducer";
import "./CreateContest.css";
const CreateContest = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState({ start_date: null, end_date: null });
  const [time, setTime] = useState({ start_time: null, end_time: null });
  // const [name,setName] = useState("");
  const getContest = () => {};
  return (
    <div className="container mt-5">
      <div className="d-flex flex-column">
        <p className="text-left dash-title-category pb-2">Create Contest</p>
        <span className="create-con-text mt-1">
          Host your own coding contest on LOOP. You can provide and complete
        </span>
        <span className="create-con-text">
          with your friends from your organization
        </span>
        <span className="create-con-text mt-1">
          get started by providing the initail details of the contest{" "}
        </span>
      </div>

      <div className="d-flex flex-column mt-4">
        <div className="d-flex mt-1 mb-3">
          <span className="contest-line-height col-md-2">
            Contest name <span className="contest-star">*</span>
          </span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Create Contest"
              name="Create Contest"
              type="text"
              value={name}
              onClickHandler={(e) => setName(e)}
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-3">
          <span className="contest-line-height col-md-2">
            Date <span className="contest-star">*</span>
          </span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Starts at"
              name="Starts at"
              type="text"
              value={date.start_date}
              onClickHandler={(e) => setDate({ ...date, start_date: e })}
            />
          </div>
          <span className="contest-line-height mr-2">at</span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Ends at"
              name="Ends at"
              type="text"
              value={date.end_date}
              onClickHandler={(e) => setDate({ ...date, end_date: e })}
            />
          </div>
          <span className="info-circle mr-2 mt-3">
            <i className="fas fa-info-circle"></i>
          </span>
        </div>
        <div className="d-flex">
          <span className="contest-line-height col-md-2">
            Time <span className="contest-star">*</span>
          </span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Ends at"
              name="Ends at"
              type="text"
              value={time.start_time}
              onClickHandler={(e) => setTime({ ...time, start_time: e })}
            />
          </div>
          <span className="contest-line-height mr-2">at</span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Ends at"
              name="Ends at"
              type="text"
              value={time.end_time}
              onClickHandler={(e) => setTime({ ...time, end_time: e })}
            />
          </div>
          <span className="info-circle mr-2 mt-3">
            <i className="fas fa-info-circle"></i>
          </span>
        </div>
      </div>

      <div className="create-con mt-3 float-right">
        <button className="p-2" onClick={getContest}>
          <i className="fas fa-plus pr-2 pl-2"></i>CREATE CONTEST
        </button>
      </div>
    </div>
  );
};

export default CreateContest;
