import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Slide from "@material-ui/core/Slide";
import "./DropFileInput.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CustomButton from "../../../../../Reducer/CustomButton/CustomButton";
import ErrorLogDialogBox from "../../../../../Reducer/ErrorLogDialogBox/ErrorLogDialogBox";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DropFileInput = (props) => {
  useEffect(() => {
  }, []);
 // const theme = useTheme();
  //const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];

    if (
      newFile &&
      newFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      // const updatedList = [newFile];
      setFileList([newFile]);
    } else {
      props.snackBar("Please select a valid  excel file", "error");
    }
  };

  const bulkUser = () => {
    props.onFileChange(fileList);
    setUpload(true);
  };

  const [open, setOpen] = React.useState(false);
  const [upload, setUpload] = useState(false);
  const [logs,setLogs] = useState({})
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    };

  const fileRemove = (file) => {
    const updatedList = [fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    // props.onFileChange(updatedList);
  };
  useEffect(()=>{
    if(props.reqflag) {
      props.removeFileHandler(setFileList)
      props.setReqflag(false)
    } 
  },[props.reqflag])
  useEffect(() => {
    setLogs(props?.logs)
  })
  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img
            alt="someImage"
            src="https://img.icons8.com/fluency/96/000000/microsoft-excel-2019.png"
          />
          <p>Drag & Drop your files here</p>
        </div>
        <input
          type="file"
          value=""
          onChange={onFileDrop}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </div>
      {fileList.length > 0  ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div
              key={index}
              className="drop-file-preview__item d-flex w-100 align-items-center justify-content-center"
            >
              <img
                alt="someImage"
                src="https://img.icons8.com/fluency/96/000000/microsoft-excel-2019.png"
              />
              <div className="drop-file-preview__item__info d-flex flex-column">
                <span>{item.name}</span>
                <div className="d-flex justify-content-between">
                  <span>{item.size}B</span>
                  <i
                    className="far fa-trash-alt del-item m-1"
                    onClick={() => fileRemove(item)}
                  ></i>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex align-items-center justify-content-center mt-3">
            <CustomButton
              className="btn-hover color-11 mt-2"
              onClickHandler={bulkUser}
            >
              <i className="fas fa-upload pr-2 pl-2"></i>
              {"create Users"}
            </CustomButton>
          </div>
          <div className="d-flex align-items-end justify-content-end mt-3 p-2">
            {props?.logs?.totalLogs >= 0 && (
              <div className="log-file">
                <span
                  className="badge badge-pill badge-secondary"
                  onClick={handleClickOpen}
                >
                  Logs
                </span>
              </div>
            )}

            <ErrorLogDialogBox
              open={open}
              handleClose={handleClose}
              log={props?.logs}
            />
          </div>
        </div>
      ) : (
        <div className="drop-file-preview__item mt-2 d-flex flex-column align-items-center justify-content-center">
          No file choosen. Excel file only be uploaded.
          <div className="d-flex align-items-center justify-content-center mt-3">
            {/* <button className="loop-btn pr-2 pl-2 mt-2 mb-2">
              <i className="fas fa-download pr-2 pl-2"></i>Download Sample file
            </button> */}
            <CustomButton className="btn-hover color-11 mt-4">
              <i className="fas fa-download pr-2 pl-2"></i>Download Sample file
            </CustomButton>
          </div>
        </div>
      )}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
