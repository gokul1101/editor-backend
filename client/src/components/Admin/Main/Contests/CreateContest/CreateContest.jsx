import InputReducer from "../../../../Reducer/InputReducer";
import "./CreateContest.css";
const CreateContest = () => {
  return (
    <div className="container" style={{ marginTop: "120px" }}>
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
          <span className="contest-line-height mr-2">
            Contest name <span className="contest-star">*</span>
          </span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Create Contest"
              name="Create Contest"
              type="text"
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-3">
          <span className="contest-line-height mr-5">
            Starts at <span className="contest-star">*</span>
          </span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Starts at"
              name="Starts at"
              type="text"
            />
          </div>
          <span className="contest-line-height mr-2">at</span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Ends at"
              name="Ends at"
              type="text"
            />
          </div>
          <span className="info-circle mr-2 mt-3"><i className="fas fa-info-circle"></i></span>
        </div>
        <div className="d-flex">
          <span className="contest-line-height mr-5">
            Ends at <span className="contest-star">*</span>
          </span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Ends at"
              name="Ends at"
              type="text"
            />
          </div>
          <span className="contest-line-height mr-2">at</span>
          <div className="col-md-4">
            <InputReducer
              placeholder="Ends at"
              name="Ends at"
              type="text"
            />
          </div>
          <span className="info-circle mr-2 mt-3"><i className="fas fa-info-circle"></i></span>
        </div>
      </div>
    </div>
  );
};

export default CreateContest;
