import { useContext, useEffect, useState } from "react";
import helperService from "../../../../../services/helperService";
import InputReducer from "../../../../Reducer/InputReducer";
import { AuthContext, useLoader } from "../../../../../contexts/AuthContext";
import "./CreateContest.css";
import { useHistory, useParams } from "react-router-dom";
import CustomButton from "../../../../Reducer/CustomButton/CustomButton";
const CreateContest = (props) => {
  const [loader, showLoader, hideLoader] = useLoader();
  const history = useHistory();
  const { id } = useParams();
  const convertDate = (date) => {
    if (date) return date.split("T")[0];
    return "";
  };
  //**state declartion start */
  const [authState, authDispatch] = useContext(AuthContext);
  const [name, setName] = useState(authState?.contest?.name);
  const [date, setDate] = useState({
    start_date: convertDate(authState?.contest?.start_date),
    end_date: convertDate(authState?.contest?.end_date),
  });
  const [time, setTime] = useState({
    start_time: authState?.contest?.start_time,
    end_time: authState?.contest?.end_time,
  });

  const createContest = async () => {
    try {
      showLoader();
      const { status } = await helperService.createContest(
        {
          name,
          start_date: date.start_date,
          end_date: date.end_date,
          start_time: time.start_time,
          end_time: time.end_time,
          created_by : authState?.user?._id
        },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 201) {
        hideLoader();
        props.snackBar("Contest created successfully", "success");
        history.push(`/contests`);
      }
    } catch (error) {
      console.log(error);
      hideLoader();
      // props.snackBar(error.error,"error")
    }
  };
  const updateContest = async () => {
    try {
      showLoader();
      const { data, status } = await helperService.updateContest(
        {
          id,
          name,
          start_date: date.start_date,
          end_date: date.end_date,
          start_time: time.start_time,
          end_time: time.end_time,
        },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        props.snackBar("Contest updated successfully", "success");
        hideLoader();
      }
    } catch (error) {
      console.log(error);
      hideLoader();
    }
  };
  useEffect(() => {
    // if (props?.title && !authState?.contest) {
    //   fetchContest();
    // }
    // return () => {
    //   authDispatch({ type: "REMOVE_CONTEST" });
    // };
  }, []);

  return (
    <div className="container mt-5">
      {loader}
      <div className="d-flex flex-column">
        <p className="text-left dash-title-category pb-2">{props?.title}</p>
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
              className="bg-input-change"
              placeholder="Contest name"
              name="Contest name"
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
            {console.log("At line 79", date)}
            <InputReducer
              placeholder="Starts at"
              name="Starts at"
              type="date"
              value={date.start_date}
              onClickHandler={(e) => setDate({ ...date, start_date: e })}
            />
          </div>

          <span className="contest-line-height mr-2">at</span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Ends at"
              name="Ends at"
              type="date"
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
              type="time"
              value={time.start_time}
              onClickHandler={(e) => setTime({ ...time, start_time: e })}
            />
          </div>
          <span className="contest-line-height mr-2">at</span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Ends at"
              name="Ends at"
              type="time"
              value={time.end_time}
              onClickHandler={(e) => setTime({ ...time, end_time: e })}
            />
          </div>
          <span className="info-circle mr-2 mt-3">
            <i className="fas fa-info-circle"></i>
          </span>
        </div>
      </div>
      <CustomButton
        className="btn-hover color-11 mt-4 float-right"
        disabled={
          props?.title !== "Create Contest" &&
          new Date(authState?.contest?.end_date) < new Date()
        }
        onClickHandler={
          props?.title !== "Create Contest" ? updateContest : createContest
        }
      >
        <i className="fas fa-plus pr-2 pl-2"></i> {props?.title?.toUpperCase()}
      </CustomButton>
    </div>
  );
};

export default CreateContest;
