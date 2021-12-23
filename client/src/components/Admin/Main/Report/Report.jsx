import React from "react";

const Report = (props) => {
  React.useEffect(() => {
    props.snackBar("No Data found", "info");
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 mt-5">
      <h1>No data found</h1>
    </div>
  );
};

export default Report;
