import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import "./ListUser.css";
import helperService from "../../../../../services/helperService";
import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
const tableData = [
  {
    reg_no: 1813015,
    name: "Dhanush Kaarthick  ",
    email: "dhanush@gmail.com",
    gender: "Male",
    stream: "B.E",
    batch: "2018-2022",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
  {
    reg_no: 1813016,
    name: "Dhusanthan R",
    email: "dhusanthanr1999g@gmail.com",
    gender: "Female",
    stream: "B.E",
    batch: "2018 - 2022",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
  {
    reg_no: 1813017,
    name: "Gajendhiran M",
    email: "gajendhiranmohan@gmail.com",
    gender: "Male",
    stream: "B.E",
    batch: "2018 - 2022",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
  {
    reg_no: 1813018,
    name: "Gobinath S",
    email: "gobigobi@gmail.com",
    gender: "Male",
    stream: "B.E",
    batch: "2018 - 2022",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
  {
    reg_no: 1813019,
    name: "Gokul S",
    email: "gokul@gmail.com",
    gender: "Male",
    stream: "B.E",
    batch: "2018 - 2022",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
  {
    reg_no: 1813046,
    name: "Nanthakumar B",
    email: "codingnanthu@gmail.com",
    gender: "Male",
    stream: "B.E",
    batch: "2018 - 2022",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
  {
    reg_no: 1813076,
    name: " Vasanthan P",
    email: "vasausa@gmail.com",
    gender: "Female",
    stream: "B.E",
    batch: "2018 - 2022",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
  {
    reg_no: 1813015,
    name: "Dhanush",
    email: "dhanush@gmail.com",
    gender: "Male",
    stream: "B.E",
    batch: "2011 - 5415",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
  {
    reg_no: 1813015,
    name: "Dhanush",
    email: "dhanush@gmail.com",
    gender: "Male",
    stream: "B.E",
    batch: "2011 - 5415",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
  {
    reg_no: 1813015,
    name: "Dhanush",
    email: "dhanush@gmail.com",
    gender: "Male",
    stream: "B.E",
    batch: "2011 - 5415",
    course: "Computer Science and Engineering",
    college: "KSRCE",
    phone: 3764376762,
  },
];
const ListUser = (props) => {
  //   const [posts, setPosts] = useState([]);
  //   const [page, setPage] = useState(1);
  //   const loadPosts = async () => {
  //     const res = await fetch(
  //       `https://jsonplaceholder.typicode.com/todos?_page=${page}`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     setPosts(data);
  //   };
  //   useEffect(() => {
  //     loadPosts();
  //   }, [page]);
  //   const classes = useStyles();
  // const sortTypes = {
  //   up: {
  //     class: "sort-up",
  //     fn: (a, b) => a.register_number - b.register_number,
  //   },
  //   down: {
  //     class: "sort-down",
  //     fn: (a, b) => b.register_number - a.register_number,
  //   },
  //   default: {
  //     class: "sort",
  //     fn: (a, b) => a,
  //   },
  // };

  // const [currentSort, setCurrentSort] = useState("default");
  // const onSortChange = () => {
  //   let nextSort;

  //   if (currentSort === "down") nextSort = "up";
  //   else if (currentSort === "up") nextSort = "default";
  //   else if (currentSort === "default") nextSort = "down";

  //   setCurrentSort(nextSort);
  // };
  const [authState] = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const fetchUsers = async () => {
    try {
      const { status, data } = await helperService.getUsers(pagination, {
        headers: { Authorization: authState.user.token },
      });
      if (status === 200) {
        setUsers(data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between p-3 m-3">
          <div>
            <div className="filter d-flex">
              <i className="fas fa-filter mt-3"></i>
              <h6 className="ml-4 font-weight-bolder mt-3 highlight-textz ">
                Filter By :{" "}
              </h6>
              <div className="dropdown mx-3">
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
              </div>
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
              <button className="pr-4 pl-4 mr-2 d-load-btn ml-3">
                <i class="fas fa-download"></i>
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
            {users.map((e) => {
              return (
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
              );
            })}
          </div>
          <div className="col-md-3 ">
            <div className="d-flex flex-column">
              <div className="col-md-12 list-table-header text-center">
                EDIT / DELETE
              </div>
              {users.map((e) => {
                return (
                  <>
                    <div
                      className="col-md-12 p-0 d-flex p-2 align-items-center justify-content-center"
                      style={{ marginTop: "6px", height: "50px" }}
                    >
                      <button className="pr-4 pl-4 mr-2 edit-btn ">
                        <i class="fas fa-pencil-alt"></i>
                        <span className="ml-2">Edit</span>
                      </button>
                      <button className="pr-4 pl-4 delete-btn" disabled>
                        <i class="fas fa-trash"></i>
                        <span className="ml-2">Delete</span>
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
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
