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
import FilterListIcon from '@material-ui/icons/FilterList';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
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
        {  },
        {
          headers: { Authorization: authState?.user?.token },
          responseType: "arraybuffer",
        }
      );
      if (status === 200) {
        console.log(data);
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        FileDownload(blob, `${"UserDetails"}.xlsx`);
      }
    } catch (err) {
      console.log(err);
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
    // console.log(user,updateDetails);
    // let checkStatus = false;
    // for(let i in user){
    //   if(Object.keys(updateDetails).length !== 0 ){
    //     for(let j in updateDetails){
    //       if(user[i] === updateDetails[j]){
    //         checkStatus = true
    //       }
    //     }
    //   }
    // } 
    // if(checkStatus === true || Object.keys(updateDetails).length === 0 ){      
    //   props.snackBar("Already Up-to-Date","info")  
    //   return
    // }
    try {
      const { status, data } = await helperService.updateUser(
        {
          id: user._id,
          updateDetails,
        },
        {
          headers: { Authorization: authState.user.token },
        }
      );
      if (status === 200) {
        props.snackBar("Updated Successfully", "success");
        handleClose();
        setUsers(
          users.map((exist_user) => {
            if (exist_user.regno === user.regno) return user;
            return exist_user;
          })
        );
      }
    } catch (err) {}
  };
  return (
    <>
      <div className="container-fluid">
        {loader}
        <div className="d-flex justify-content-between p-3 m-3">
          <div>
            <div className="filter d-flex">
              <FilterListIcon className="m-2"/>
              <h6 className="ml-4 font-weight-bolder mt-3 highlight-text ">
                Filter By :{" "}
              </h6>
              {/* <div className="dropdown mx-3">
                <button
                  className="drop-button dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Ascending
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item">Desending</a>
                  <a className="dropdown-item">Random</a>
                </div>
              </div> */}
            </div>
          </div>
          <div className="d-flex">
            <div className="form-group has-search">
              <span className="fa fa-search form-control-feedback"></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>

            <div>
              <button className="pr-4 pl-4 mr-2 d-load-btn ml-3" onClick={downloadStudentsDetails}>
                <GetAppIcon/>
                <span className="ml-2 font-weight-bolder">
                  Download Details
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <div
            className="col-md-9 d-flex flex-column"
            style={{ overflowX: "auto" }}
          >
            <div className="d-flex">
              <div className="col-md-1 list-table-header text-center ">
                Reg no
              </div>
              <div className="col-md-3 list-table-header text-center">Name</div>
              <div className="col-md-3 list-table-header text-center">
                Email
              </div>
              <div className="col-md-1 list-table-header text-center">
                Gender
              </div>
              <div className="col-md-1 list-table-header text-center">
                Stream
              </div>
              <div className="col-md-2 list-table-header text-center">
                Batch
              </div>
              <div className="col-md-3 list-table-header text-center">
                Course
              </div>
              <div className="col-md-3 list-table-header text-center">
                College
              </div>
              <div className="col-md-2 list-table-header text-center">
                Phone Number
              </div>
            </div>
            {users?.map((e) => (
              <div className="d-flex" key={e._id}>
                <div
                  className="col-md-1 list-table-data p-2 text-center data"
                  style={{ height: "50px" }}
                >
                  {e.regno}
                </div>
                <div
                  className="col-md-3 list-table-data p-2 text-center data"
                  style={{ height: "50px" }}
                >
                  {e.name}
                </div>
                <div
                  className="col-md-3 list-table-data p-2 text-center data"
                  style={{ height: "50px" }}
                >
                  {e.email}
                </div>
                <div
                  className="col-md-1 list-table-data p-2 text-center data"
                  style={{ height: "50px" }}
                >
                  {e.gender_id}
                </div>
                <div
                  className="col-md-1 list-table-data p-2 text-center data"
                  style={{ height: "50px" }}
                >
                  {e.stream_id}
                </div>
                <div
                  className="col-md-2 list-table-data p-2 text-center data"
                  style={{ height: "50px" }}
                >
                  {e.batch_id}
                </div>
                <div
                  className="col-md-3 list-table-data p-2 text-center data"
                  style={{ height: "50px" }}
                >
                  {e.course_id}
                </div>
                <div
                  className="col-md-3 list-table-data p-2 text-center data"
                  style={{ height: "50px" }}
                >
                  {e.college_id}
                </div>
                <div
                  className="col-md-2 list-table-data p-2 text-center data"
                  style={{ height: "50px" }}
                >
                  {e.phone_no}
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3 ">
            <div className="d-flex flex-column">
              <div className="col-md-12 list-table-header text-center">
                EDIT / DELETE
              </div>
              {users.map((e) =>(
                  <div
                    key={e._id}
                    className="col-md-12 p-0 d-flex p-2 align-items-center justify-content-center"
                    style={{ marginTop: "6px", height: "50px" }}
                  >
                    <button
                      className="pr-4 pl-4 mr-2 edit-btn "
                      onClick={() => editUserDetail(e)}
                    >
                      <EditIcon/>
                      <span className="ml-2">Edit</span>
                    </button>
                    <button className="pr-4 pl-4 delete-btn" disabled>
                      <RestoreFromTrashIcon/>
                      <span className="ml-2">Delete</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div>
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
        {total > limit &&
        <Pagination
          count={Math.floor(total / limit) + (total % limit !== 0 ? 1 : 0)}
          color="primary"
          variant="text"
          className="mt-5 d-flex justify-content-center"
          onChange={(e, value) => handlePagination(e, value)}
        />
}
      </div>
    </>
  );
};

export default ListUser;

/*  
<div className="container-fluid mt-5">
        <div className="d-flex flex-column" id="style-default">
          
          <div
            className="d-flex col-md-8 p-0"
            style={{ overflowX: "scroll", overflowY: "hidden" }}
          >
            <div className="col-md-3 list-table-header">
              Register number
              <button onClick={onSortChange} className="sort-btn pl-3">
                <i className={`fas fa-${sortTypes[currentSort].class}`} />
              </button>
            </div>
            <div className="col-md-3 list-table-header">Stream</div>
            <div className="col-md-3 list-table-header">Course</div>
            <div className="col-md-3 list-table-header">College</div>
            <div className="col-md-3 list-table-header">Phone Number</div>
            <div className="col-md-3 list-table-header">Name</div>
          </div>
          <div
            className="d-flex"
            style={{ overflowX: "scroll" }}
          >
            {[...tableData].sort(sortTypes[currentSort].fn).map((p) => {
              return (
                <>
                  <div className="d-flex col-md-8 p-0">
                    <div className="col-md-3 list-table-data p-2">
                      {p.register_number}
                    </div>
                    <div className="col-md-3 list-table-data p-2">
                      {p.stream}
                    </div>
                    <div className="col-md-3 list-table-data p-2">
                      {p.course}
                    </div>
                    <div className="col-md-3 list-table-data p-2">
                      {p.college}
                    </div>
                    <div className="col-md-3 list-table-data p-2">
                      {p.batch}
                    </div>
                    <div className="col-md-3 list-table-data p-2">
                      {p.batch}
                    </div>
                  </div>
                  <div className="d-flex pr-3 col-md-4">
                    <button className="pr-4 pl-4 mr-2 edit-btn">Edit</button>
                    <button className="pr-4 pl-4 delete-btn" disabled>
                      Delete
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        
        <div className="mt-3 mb-5">
          <P agination
            className="float-right"
            count={13}
            variant="text"
            color="primary"
            //   onChange={(e, value) => setPage(value)}
          />
        </div>
      </div>

*/
