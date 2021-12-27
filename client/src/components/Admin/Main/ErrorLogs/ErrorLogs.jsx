import React, { useContext, useEffect, useState } from "react";
import helperService from "../../../../services/helperService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import ErrorLogDialogBox from "../../../Reducer/ErrorLogDialogBox/ErrorLogDialogBox";

const ErrorLogs = (props) => {
  const { id } = useParams();
  const [authState] = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [errorLogs, setErrorLogs] = useState([]);
  const [errorLog, setErrorLog] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorLog({})
  };

  const fetchErrorLogs = async () => {
    // console.log(authState?.user);
    try {
      const { data, status } = await helperService.getErrorLogs(
        { created_by: id },
        { headers: { Authorization: authState?.user?.token } }
      );
      if (status === 200) {
        props.snackBar(data.message,"success")
        setErrorLogs(data.errorLogs);
      }
    } catch (err) {
      props.snackBar(err.data,"error")
      console.log(err, "at error logs");
    }
  };
  useEffect(() => {
    fetchErrorLogs();
  }, []);
  return (
    <div className="container">
      <p className="text-left dash-title-category pb-2 mt-5">Error Logs</p>
      <span className="create-con-text mt-1">
        Shows all the errors while creating the students as a bulk upload
      </span>
      <div className="mt-4 d-flex flex-column">
        <div className="d-flex upcoming-header border-top border-bottom mt-2 p-2 mb-1">
          <div className="col-md-3 text-center content-nav-title">
            ADMIN NAME
          </div>
          <div className="col-md-3 text-center content-nav-title">
            NO. OF LOGS
          </div>
          <div className="col-md-2 text-center content-nav-title">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="col-md-2 text-center content-nav-title">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="col-md-2 text-center content-nav-title">
            SHOW
            {/* <i className="fas fa-external-link-alt"></i> */}
          </div>
        </div>
        <div className="d-flex flex-column border-top border-bottom mt-1 p-2 mb-1">
          {errorLogs.map((log) => (
            <div className="d-flex">
              <div
                className="col-md-3 text-center content-nav-title"
                key={log._id}
              >
                {authState?.user?.name}
              </div>
              <div className="col-md-3 text-center content-nav-title">
                {log.totalLogs}
              </div>
              <div className="col-md-2 text-center content-nav-title">
                {+log.totalLogs - log.errorLogs.length}
              </div>
              <div className="col-md-2 text-center content-nav-title">
                {log.errorLogs.length}
              </div>
              <div className="col-md-2 text-center content-nav-title">
                <i
                  style={{ cursor: "pointer" }}
                  className="fas fa-external-link-alt"
                  onClick={() => {
                    setErrorLog(log);
                    handleClickOpen();
                  }}
                ></i>
              </div>
            </div>
          ))}
          <ErrorLogDialogBox
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            log={errorLog}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorLogs;
