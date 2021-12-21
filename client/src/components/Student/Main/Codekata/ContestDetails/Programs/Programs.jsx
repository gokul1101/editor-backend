import React, { useContext, useEffect, useState } from "react";
import "./Programs.css";
import { useHistory, useParams } from "react-router-dom";
import SelectReducer from "../../../../../Reducer/SelectReducer/SelectReducer";
import Editor from "../../../../../Reducer/Editor/Editor";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import helperService from "../../../../../../services/helperService";
import Testcase from "./Testcase/Testcase";
import Timer from "../../Timer/Timer";
import { parseCode, template } from "../../../../../../services/utils";
const Programs = (props) => {
  let history = useHistory();
  const { questionId } = useParams();
  const [authState] = useContext(AuthContext);
  let [difficulty, setDifficulty] = useState("");
  const findChallenge = () => {
    const problem = authState?.contest?.challenges?.find(
      (problem) => problem._id === questionId
    );
    return problem || {};
  };
  const [challenge, setChallenge] = useState(findChallenge());
  let [testCases, setTestCases] = useState({});
  const [themeName, setThemeName] = useState("nord_dark");
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(
    sessionStorage.getItem(challenge?.name)
      ? JSON.parse(sessionStorage.getItem(challenge?.name))?.code
      : template[language]
  );
  const [isError, setIsError] = useState(true);
  const [isSampleFailed, setIsSampleFailed] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState({});
  const [tabClick, setTabClick] = useState(true);
  useEffect(() => {
    props.setSideToggle(true);
  });

  const getTestCases = async () => {
    try {
      const {
        data: { message, testcases },
      } = await helperService.getTestCases(
        { questionId },
        { headers: { Authorization: authState.user.token } }
      );
      setTestCases(testcases || {});
    } catch (err) {}
  };
  const compile = async () => {
    try {
      setTabClick(false);
      setIsLoading(true);
      let parsedCode = parseCode(code);
      sessionStorage.setItem(
        challenge?.name,
        JSON.stringify({ code, lang: language })
      );
      const { status, data } = await helperService.runCode(
        { id: challenge?._id, code: parsedCode, lang: language },
        { headers: { Authorization: authState?.user?.token } }
      );
      if (status === 200) {
        console.log(data);
        if (data?.errors) setIsError(true);
        else setIsError(false);
        if (data?.err) setErrors(data?.err);
        if (data?.isSampleFailed) setIsSampleFailed(true);
        else setIsSampleFailed(false);
        setOutput({ sample: data?.sample || [], hidden: data?.hidden || [] });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const submitChallenge = () => {}
  useEffect(() => {
    setDifficulty(challenge?.difficulty_id.level);
    getTestCases();
  }, []);
  const handleChange = (event) => setThemeName(event.target.value);

  const handleLanguage = (event) => {
    setLanguage(event.target.value);
    setCode(template[event.target.value]);
    sessionStorage.removeItem(challenge?.name);
  };
  return (
    <>
      <div className="container-fluid" id={challenge?._id}>
        <div className="problem-header p-2 d-flex border-bottom border-left">
          <div className="problem-title d-flex">
            <div
              className="back-btn mt-2 ml-2 mr-2"
              onClick={() => history.goBack()}
            >
              <div className="triangle"></div>
              <div className="halfcircle"></div>
            </div>
          </div>
          <div className="timer mt-1 ml-2">
            <h6 className="timer-text" style={{ width: "230px" }}>
              <Timer />
            </h6>
          </div>
          <div className="w-100 d-flex flex-row-reverse mt-3 mb-2">
            <div>
              <h5 className="mt-2 score-card">
                Maximum Score : <span className="program-score p-2">80</span>
              </h5>
            </div>
            <div className="w-25 mx-2">
              <SelectReducer
                array={["c", "java"]}
                name="Select language"
                handleSelect={handleLanguage}
                value={language}
                size="small"
                defaultValue={language}
                className="w-100"
              />
            </div>
            <div className="w-25 mx-2">
              <SelectReducer
                array={[
                  "xcode",
                  "monokai",
                  "github",
                  "nord_dark",
                  "textmate",
                  "one_dark",
                ]}
                name="Select theme"
                handleSelect={handleChange}
                value={themeName}
                size="small"
                className="w-100"
                defaultValue={themeName}
              />
            </div>
          </div>
        </div>
        <div className="problem-toggler">
          <div className="d-flex">
            <div className="col-md-4 p-0 border-left border-right border-bottom">
              <ul
                className="nav nav-pills program-pills p-3 border-bottom"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item program-item" role="presentation">
                  <a
                    className={`nav-link ${tabClick? "active" : ""} program-link`}
                    id="pills-problem-tab"
                    data-toggle="pill"
                    href="#pills-problem"
                    role="tab"
                    aria-controls="pills-problem"
                    aria-selected="true"
                  >
                    Problem
                  </a>
                </li>
                <li className="nav-item program-item" role="presentation">
                  <a
                    className={`nav-link ${!tabClick? "active" : ""} program-link`}
                    id="pills-submissions-tab"
                    data-toggle="pill"
                    href="#pills-submissions"
                    role="tab"
                    aria-controls="pills-submissions"
                    aria-selected="false"
                  >
                    TestCase
                  </a>
                </li>
              </ul>
              <div className="tab-content p-2" id="pills-tabContent">
                <div
                  className={`tab-pane fade ${tabClick? "show active" : ""}`}
                  id="pills-problem"
                  role="tabpanel"
                  aria-labelledby="pills-problem-tab"
                >
                  <div className="d-flex mt-2">
                    <h5 className="problem-state mr-2 font-weight-bolder">
                      {challenge?.name}
                    </h5>
                    <div
                      className={`problem-badge-${difficulty} d-flex align-items-center justify-content-center mr-2`}
                    >
                      <span className={`badge-${difficulty}`}>
                        {difficulty.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="problem-statement text-justify mt-3">
                    <p>{challenge?.statement}</p>
                  </div>
                  <div className="constraints mb-2">
                    <span className="constraints-title font-weight-bolder color-highlight">
                      Constraints :
                    </span>
                    <div className="constraints-content d-flex flex-column mt-2">
                      <span className="mt-2">
                        <i className="fas fa-circle constraints-dot mr-2"></i>
                        <span className="constraints-highlight pr-2 pl-2 mr-1 ">
                          {challenge?.constraints}
                        </span>
                      </span>
                      {/* <span className="mt-2">
                        <i className="fas fa-circle constraints-dot mr-2"></i>
                        <span className="constraints-highlight pr-2 pl-2 mr-1">
                          0 &lt; m &lt; 200,000
                        </span>{" "}
                        where m is the length of{" "}
                        <span className="constraints-highlight pr-2 pl-2 ml-1">
                          b
                        </span>
                      </span> */}
                    </div>
                  </div>
                  <div className="problem-input d-flex flex-column mt-4 mb-2">
                    <span className="constraints-title mb-2 text-muted">
                      Example :
                    </span>
                    <div className="example-input mt-2">
                      <span className="font-weight-bolder ip-highlight">
                        input format :{" "}
                      </span>{" "}
                      <br />
                      <p className="mt-2">{challenge?.input_format}</p>
                    </div>
                    <div className="example-output mt-2">
                      <span className="font-weight-bolder op-highlight">
                        output format :{" "}
                      </span>{" "}
                      <br />
                      <p className="mt-2 ">{challenge?.output_format}</p>
                    </div>
                  </div>
                  <div className="hints mt-2 d-flex flex-column">
                    <span className="constraints-title font-weight-bolder color-highlight">
                      Description :
                    </span>
                    <div className="problem-statement text-justify mt-2">
                      <p>{challenge?.description}</p>
                    </div>
                  </div>
                </div>
                {/* /TESTCASE/ */}
                <div
                  className={`tab-pane fade ${!tabClick? "show active" : ""}`}
                  id="pills-submissions"
                  role="tabpanel"
                  aria-labelledby="pills-submissions-tab"
                >
                  <Testcase
                    testCaseOutput={output}
                    isLoading={isLoading}
                    isError={isError}
                    testcases={testCases}
                    isSampleFailed={isSampleFailed}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8 p-0 d-flex flex-column">
              <Editor
                language={language}
                theme={themeName}
                onChangeHandler={(value) => setCode(value)}
                value={code}
              />
              <div className="mt-3 d-flex justify-content-end">
                <button className="btn-hover color-11 mr-2 pl-4 pr-3" onClick={compile}>
                  RUN CODE <i className="fas fa-code mx-2"></i>
                </button>
                <button className="btn-hover color-11 pl-4 pr-3" onClick={submitChallenge}>
                  SUBMIT <i className="fas fa-rocket mx-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;
