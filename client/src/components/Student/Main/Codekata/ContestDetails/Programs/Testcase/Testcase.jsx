import React, { useEffect, useState } from "react";
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

const Testcase = ({
  testCaseOutput,
  testcases,
  isError,
  isSampleFailed,
  errors,
  isLoading,
}) => {
  const [expanded, setExpanded] = useState("");
  const [output, setOutput] = useState({});
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    setOutput(testCaseOutput);
  }, [testCaseOutput]);
  return (
    <div className="h-100">
      {(!isError && Object.keys(output).length <= 0) || isError ? (
        <CompilerError errors={errors} />
      ) : (
        <>
          <h6 className="p-2 font-weight-bolder test-case-heading mt-5">
            Sample Test Case
          </h6>
          <div className="position-relative">
            {testcases?.sample?.map((testcase, index) => {
              let sampleOutput =
                (output?.sample && output?.sample[index]) || {};
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
                      {isLoading ? (
                        <img
                          src={Loader}
                          alt="loader"
                          height={40}
                          className="p-2 rounded-circle"
                        />
                      ) : (
                        <>
                          <button
                            className={`btn btn-${
                              sampleOutput?.errors ? "danger" : "success"
                            }`}
                          >
                            <i
                              className={
                                sampleOutput?.errors
                                  ? "fas fa-times-circle"
                                  : "far fa-check-circle"
                              }
                            ></i>
                          </button>
                          <span className="ml-3 text-dark">
                            Test Case {index + 1}
                          </span>
                        </>
                      )}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="d-flex flex-column">
                    <p>{`Input : ${testcase?.input}`}</p>
                    <p>{`Output : ${testcase?.output}`}</p>
                    <p>
                      {sampleOutput?.actualOutput
                        ? `Your output : ${sampleOutput?.actualOutput}`
                        : ""}
                    </p>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
          {!isSampleFailed ? (
            <>
              {/* Hidden test Case Accordian */}
              <h6 className="p-2 font-weight-bolder test-case-heading mt-5">
                Hidden Test Case
              </h6>
              <div className="position-relative">
                {Array.apply(0, Array(testcases?.hidden || 0)).map(
                  (testcase, index) => {
                    let length = (testcases?.sample?.length || 0) + index + 1;
                    let hiddenOutput =
                      (output?.hidden && output?.hidden[index]) || false;
                    return (
                      <Accordion
                        square
                        expanded={expanded === `panel${length}`}
                      >
                        <AccordionSummary
                          aria-controls={`panel${length}d-content`}
                          id={`panel${length}d-header`}
                        >
                          <Typography className="test-case-heading w-100 mr-auto">
                            {isLoading ? (
                              <img
                                src={Loader}
                                alt="loader"
                                height={40}
                                className="p-2 rounded-circle"
                              />
                            ) : (
                              <>
                                <button
                                  className={`btn btn-${
                                    hiddenOutput ? "success" : "danger"
                                  }`}
                                >
                                  <i
                                    className={
                                      hiddenOutput
                                        ? "far fa-check-circle"
                                        : "fas fa-times-circle"
                                    }
                                  ></i>
                                </button>
                                <span className="ml-3 text-dark">
                                  Test Case {length}
                                </span>
                              </>
                            )}
                          </Typography>

                          <div className="lock-icon p-2 float-right">
                            <i className="fas fa-lock"></i>
                          </div>
                        </AccordionSummary>
                      </Accordion>
                    );
                  }
                )}
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Testcase;
