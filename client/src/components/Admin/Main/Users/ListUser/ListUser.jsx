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
// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });
const tableData = [
  {
    register_number: 1813015,
    course: "MECH",
    stream: "B.E",
    college: "KSRCT",
    batch: "2018-2012",
  },
  {
    register_number: 1813016,
    course: "ECE",
    stream: "B.E",
    college: "KSRCE",
    batch: "2018-2012",
  },
  {
    register_number: 1813017,
    course: "IT",
    stream: "B.E",
    college: "KSRIET",
    batch: "2018-2012",
  },
  {
    register_number: 1813018,
    course: "CSE",
    stream: "B.E",
    college: "KSRCT",
    batch: "2018-2012",
  },
  {
    register_number: 1813019,
    course: "EEE",
    stream: "B.E",
    college: "KSRCE",
    batch: "2018-2012",
  },
  {
    register_number: 1813016,
    course: "IT",
    stream: "B.E",
    college: "KSRIET",
    batch: "2018-2012",
  },
  {
    register_number: 1813018,
    course: "CSE",
    stream: "B.E",
    college: "KSRCT",
    batch: "2018-2012",
  },
  {
    register_number: 1813019,
    course: "EEE",
    stream: "B.E",
    college: "KSRCE",
    batch: "2018-2012",
  },
  {
    register_number: 1813016,
    course: "IT",
    stream: "B.E",
    college: "KSRIET",
    batch: "2018-2012",
  },
  {
    register_number: 1813016,
    course: "IT",
    stream: "B.E",
    college: "KSRIET",
    batch: "2018-2012",
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
  const sortTypes = {
    up: {
      class: "sort-up",
      fn: (a, b) => a.register_number - b.register_number,
    },
    down: {
      class: "sort-down",
      fn: (a, b) => b.register_number - a.register_number,
    },
    default: {
      class: "sort",
      fn: (a, b) => a,
    },
  };

  const [currentSort, setCurrentSort] = useState("default");
  const onSortChange = () => {
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setCurrentSort(nextSort);
  };
  return (
    <>
      <div className="container-fluid mt-5">
        <div
          className="d-flex flex-column "
          id="style-default"
          style={{ width: "60vw", overflowX: "scroll" }}
        >
          <div className="force-overflow">
            <div className="d-flex">
              <div className="col-3 list-table-header">
                Register number
                <button onClick={onSortChange} className="sort-btn pl-3">
                  <i className={`fas fa-${sortTypes[currentSort].class}`} />
                </button>
              </div>
              <div className="col-3 list-table-header">Stream</div>
              <div className="col-3 list-table-header">Course</div>
              <div className="col-3 list-table-header">College</div>
              <div className="col-3 list-table-header">Phone Number</div>
              <div className="col-3 list-table-header">Name</div>
            </div>
            {[...tableData].sort(sortTypes[currentSort].fn).map((p) => {
              return (
                <>
                  <div className="position-relative">
                    <div className="d-flex">
                      <div className="col-3 list-table-data p-2">
                        {p.register_number}
                      </div>
                      <div className="col-3 list-table-data p-2">
                        {p.stream}
                      </div>
                      <div className="col-3 list-table-data p-2">
                        {p.course}
                      </div>
                      <div className="col-3 list-table-data p-2">
                        {p.college}
                      </div>
                      <div className="col-3 list-table-data p-2">{p.batch}</div>
                      <div className="col-3 list-table-data p-2">{p.batch}</div>
                    </div>
                  </div>
                  <div
                    className="d-flex position-absolute pr-3"
                    style={{ left: "85%", marginTop: "-35px" }}
                  >
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
          <Pagination
            className="float-right"
            count={13}
            variant="text"
            color="primary"
            //   onChange={(e, value) => setPage(value)}
          />
        </div>
      </div>
    </>
  );
};

export default ListUser;
