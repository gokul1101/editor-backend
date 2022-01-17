import React, { useEffect, useState } from "react";
import FileDownload from "js-file-download";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import InputReducer from "../../../../Reducer/InputReducer";
import SelectReducer from "../../../../Reducer/SelectReducer/SelectReducer";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Pagination from "@material-ui/lab/Pagination";
import "./ListUser.css";
import helperService from "../../../../../services/helperService";
import { useContext } from "react";
import { AuthContext, useLoader } from "../../../../../contexts/AuthContext";
import FilterListIcon from "@material-ui/icons/FilterList";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import CustomButton from "../../../../Reducer/CustomButton/CustomButton";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #1E2D64",
  },
  fieldColor: {
    width: "100%",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00511B",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00511B",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#00511B",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const limit = 3;
const ListUser = (props) => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const handlePagination = (e, value) => {
    if (page !== value) {
      setPage(value);
      fetchUsers(value);
    }
  };
  const classes = useStyles();
  const [loader, showLoader, hideLoader] = useLoader();
  const [user, setUser] = useState({
    regno: "",
    name: "",
    email: "",
    gender_id: "",
    stream_id: "",
    course_id: "",
    college_id: "",
    phone_no: "",
    batch_id: "",
  });
  const [updateDetails, setUpdateDetails] = useState({});
  const [open, setOpen] = React.useState(false);

  const [authState] = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [, setRegno] = useState("");
  const fetchUsers = async (page = 1) => {
    try {
      showLoader();
      const { status, data } = await helperService.getUsers(
        { page, limit },
        {
          headers: { Authorization: authState.user.token },
        }
      );
      if (status === 200) {
        //TODO :
        props.snackBar("List of Users", "success");
        setUsers(data.users);
        setRegno(data.users.reg_no);
        if (!total) setTotal(data?.modelCount || 0);
        hideLoader();
      }
    } catch (err) {
      hideLoader();
    }
  };
  const downloadStudentsDetails = async () => {
    try {
      const { data, status } = await helperService.downloadStudentsDetails(
        // TODO : user quries
        {},
        {
          headers: { Authorization: authState?.user?.token },
          responseType: "arraybuffer",
        }
      );
      if (status === 200) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileDownload(blob, `${"UserDetails"}.xlsx`);
        props.snackBar("Sample file downloaded", "success");
      }
    } catch (err) {
      props.snackBar(err.message, "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const editUserDetail = (data) => {
    setUser(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateUser = async () => {
    try {
      const { status, message } = await helperService.updateUser(
        {
          id: user._id,
          updateDetails,
        },
        {
          headers: { Authorization: authState.user.token },
        }
      );
      if (status === 200) {
        props.snackBar(message, "success");
        handleClose();
        setUsers(
          users.map((exist_user) => {
            if (exist_user.regno === user.regno) return user;
            return exist_user;
          })
        );
      }
    } catch ({ message }) {
      props.snackBar(message, "error");
    }
  };
  return (
    <>
      <div className="container-fluid">
        {loader}
        <div className="d-flex">
          <FilterListIcon />
          <h6 className="ml-2 font-weight-bolder mt-1 highlight-text">
            Filter By :{" "}
          </h6>
        </div>
        <div className="d-flex flex-wrap">
          <div className="col-md-6 col-lg-3 my-1 px-1">
            <SelectReducer
              className={classes.fieldColor}
              array={["B.E", "B.Tech"]}
              name="Stream"
            />
          </div>
          <div className="col-md-6 col-lg-3 my-1 px-1">
            <SelectReducer
              className={classes.fieldColor}
              array={
                user.stream_id === "B.Tech"
                  ? ["Information Technology"]
                  : [
                      "Computer Science & Engineering",
                      "Electrical & Electronics Engineering",
                      "Electronics and Communication Engineering",
                      "Mechanical Engineering",
                      "Automobile Engineering",
                      "Civil Engineering",
                      "Safety & Fire Engineering",
                    ]
              }
              name="Course Name"
            />
          </div>
          <div className="col-md-6 col-lg-3 my-1 px-1">
            <SelectReducer
              className={classes.fieldColor}
              array={[
                "KSR College of Engineering",
                "KSR College of Technology",
                "KSR Institute for Engineering & Technology",
              ]}
              name="College Name"
            />
          </div>
          <div className="col-md-6 col-lg-3 my-1 px-1">
            <SelectReducer
              className={classes.fieldColor}
              array={["male", "female", "other"]}
              name="Gender"
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-md-6 col-lg-4 mt-2 p-0">
            <InputReducer
              className={classes.fieldColor}
              label="Search"
              placeholder="Search"
              name="Search"
              type="text"
            />
          </div>
          <div className="col-md-4 mt-2">
            <CustomButton
              className="btn-hover color-11 d-flex align-items-center py-2 px-3"
              onClick={downloadStudentsDetails}
            >
              <GetAppIcon />
              <span className="ml-2 font-weight-bolder">Download Details</span>
            </CustomButton>
          </div>
        </div>

        <div className="d-flex upcoming-header border-top border-bottom mt-4 p-2 mb-1">
          <div className="col-md-2 text-center content-nav-title">REG.NO</div>
          <div className="col-md-2 text-center content-nav-title">STREAM</div>
          <div className="col-md-2 text-center content-nav-title">COURSE</div>
          <div className="col-md-2 text-center content-nav-title">COLLEGE</div>
          <div className="col-md-2 text-center content-nav-title">BATCH</div>
        </div>

        <div className="d-flex flex-column mb-5">
          {users?.map((e) => {
            return (
              <div
                className="d-flex border-top border-bottom mt-1 p-2 mb-1 align-items-center justify-content-center"
                key={e._id}
              >
                <div className="col-md-2 text-center content-nav-title">
                  {e.regno}
                </div>
                <div className="col-md-2 text-center content-nav-title">
                  {e.stream_id}
                </div>
                <div className="col-md-2 text-center content-nav-title">
                  {e.course_id}
                </div>
                <div className="col-md-2 text-center content-nav-title">
                  {e.college_id}
                </div>
                <div className="col-md-2 text-center content-nav-title">
                  {e.batch_id}
                </div>
                <div className="col-md-2 d-flex text-center content-nav-title">
                  <div className="px-3">
                    <EditIcon
                      onClick={() => editUserDetail(e)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="px-3">
                    <RestoreFromTrashIcon
                      disabled
                      style={{ cursor: "inherit" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {total > limit && (
          <Pagination
            count={Math.floor(total / limit) + (total % limit !== 0 ? 1 : 0)}
            color="primary"
            variant="text"
            className="mt-5 d-flex justify-content-center"
            onChange={(e, value) => handlePagination(e, value)}
          />
        )}
        <div className="d-flex">
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="md"
            fullWidth
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Edit User"}
            </DialogTitle>

            <DialogContent>
              <div className="d-flex mx-2 my-3">
                <div className="col-md-6">
                  <InputReducer
                    className={classes.fieldColor}
                    id="outlined-multiline-static"
                    label="Register Name"
                    variant="outlined"
                    value={user.regno}
                    disabled={true}
                    // onClickHandler={(value) =>
                    //   setUser({ ...user, regno: value })
                    // }
                  />
                </div>
                <div className="col-md-6">
                  <InputReducer
                    className={classes.fieldColor}
                    id="outlined-multiline-static"
                    label="Name"
                    variant="outlined"
                    value={user.name}
                    onClickHandler={(value) => {
                      setUpdateDetails({ ...updateDetails, name: value });
                      setUser({ ...user, name: value });
                    }}
                  />
                </div>
              </div>
              <div className="d-flex mx-2 my-3">
                <div className="col-md-6">
                  <InputReducer
                    className={classes.fieldColor}
                    id="outlined-multiline-static"
                    label="Email"
                    variant="outlined"
                    value={user.email}
                    onClickHandler={(value) => {
                      setUpdateDetails({ ...updateDetails, email: value });
                      setUser({ ...user, email: value });
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <SelectReducer
                    className={classes.fieldColor}
                    label="gender"
                    array={["male", "female"]}
                    name="Gender"
                    value={user.gender_id}
                    handleSelect={(e) => {
                      setUpdateDetails({
                        ...updateDetails,
                        gender_id: e.target.value,
                      });
                      setUser({ ...user, gender_id: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="d-flex mx-2 my-3">
                <div className="col-md-6">
                  <SelectReducer
                    className={classes.fieldColor}
                    array={["B.E", "B.Tech"]}
                    name="Stream"
                    label="Stream"
                    defaultValue={user.stream_id}
                    value={user.stream_id}
                    handleSelect={(e) => {
                      setUpdateDetails({
                        ...updateDetails,
                        stream_id: e.target.value,
                      });
                      setUser({ ...user, stream_id: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <SelectReducer
                    className={classes.fieldColor}
                    array={[
                      "Computer Science & Engineering",
                      "Information Technology",
                      "Civil Engineering",
                    ]}
                    name="Course Name"
                    label="Course Name"
                    defaultValue={user.course_id}
                    value={user.course_id}
                    handleSelect={(e) => {
                      setUpdateDetails({
                        ...updateDetails,
                        course_id: e.target.value,
                      });
                      setUser({ ...user, course_id: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="d-flex mx-2 my-3">
                <div className="col-md-6">
                  <SelectReducer
                    className={classes.fieldColor}
                    array={[
                      "KSR College of Engineering",
                      "KSR College of Technology",
                      "KSR Institute for Engineering & Technology",
                    ]}
                    name="College Name"
                    label="college name"
                    defaultValue={user.college_id}
                    value={user.college_id}
                    handleSelect={(e) => {
                      setUpdateDetails({
                        ...updateDetails,
                        college_id: e.target.value,
                      });
                      setUser({ ...user, college_id: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <InputReducer
                    className={classes.fieldColor}
                    placeholder="Phone number"
                    label="Phone number"
                    name="Phone number"
                    type="text"
                    value={user.phone_no}
                    onClickHandler={(value) => {
                      setUpdateDetails({ ...updateDetails, phone_no: value });
                      setUser({ ...user, phone_no: value });
                    }}
                  />
                </div>
              </div>
              <div className="d-flex mx-2 my-3">
                <div className="col-md-6">
                  <SelectReducer
                    className={classes.fieldColor}
                    array={[
                      "2018-2022",
                      "2019-2023",
                      "2020-2024",
                      "2021-2025",
                      "2022-2026",
                    ]}
                    name="Batch year"
                    label="Batch year"
                    defaultValue={user.batch_id}
                    value={user.batch_id}
                    handleSelect={(e) => {
                      setUpdateDetails({
                        ...updateDetails,
                        batch_id: e.target.value,
                      });
                      setUser({ ...user, batch_id: e.target.value });
                    }}
                  />
                </div>
              </div>
            </DialogContent>

            <DialogActions>
              <button className="btn btn-success" onClick={updateUser}>
                Update User
              </button>

              <Button onClick={handleClose} color="primary">
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ListUser;
