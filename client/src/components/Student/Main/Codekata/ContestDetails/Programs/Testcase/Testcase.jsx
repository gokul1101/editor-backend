import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import "./Testcase.css";
import Loader from "../../../../../../Images/loader.gif";
import CompilerError from "../CompileError/CompilerError";
const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "#E1F8FF",

    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Testcase = ({ testcases }) => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <CompilerError />
      <h6 className="p-2 font-weight-bolder test-case-heading mt-5">
        Sample Test Case
      </h6>
      <div className="position-relative">
        {testcases?.sample?.map((testcase, index) => {
          return (
            <Accordion
              square
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index + 1}d-content`}
                id={`panel${index + 1}d-header`}
              >
                <Typography classname="test-case-heading ">
                  {/* <img
                    src={Loader}
                    alt="loader"
                    height={40}
                    className="p-2 rounded-circle"
                  /> */}
                  <span className="ml-3">Test Case {index + 1}</span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{testcase?.input}</Typography>
                <Typography>{testcase?.output}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
      {/* Hidden test Case Accordian */}
      <h6 className="p-2 font-weight-bolder test-case-heading mt-5">
        Hidden Test Case
      </h6>
      <div className="position-relative">
        {Array.apply(0, Array(testcases?.hidden || 0)).map((testcase, index) => {
          let length = (testcases?.sample?.length || 0) + index + 1;
          return (
            <Accordion square expanded={expanded === `panel${length}`}>
              <AccordionSummary
                aria-controls={`panel${length}d-content`}
                id={`panel${length}d-header`}
              >
                <Typography className="test-case-heading w-100 mr-auto">
                  <button className="btn btn-danger">
                    <i className="fas fa-times-circle"></i>
                  </button>
                  <span className="ml-3 text-dark">Test Case {length}</span>
                </Typography>

                <div className="lock-icon p-2 float-right">
                  <i className="fas fa-lock"></i>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography></Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Testcase;
