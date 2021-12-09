import React, { useContext, useEffect, useState } from "react";
import "./Programs.css";
import { useHistory, useParams } from "react-router-dom";
import SelectReducer from "../../../../../Reducer/SelectReducer/SelectReducer";
import Editor from "../../../../../Reducer/Editor/Editor";
import { AuthContext } from "../../../../../../contexts/AuthContext";

const Programs = (props) => {
  let history = useHistory();
  const { questionId } = useParams();
  const [authState] = useContext(AuthContext);
  const [challenge, setChallenge] = useState({});
  let [difficulty, setDifficulty] = useState("")
  useEffect(() => {
    props.setSideToggle(true);
  });
  const findChallenge = () => {
    const problem = authState?.contest?.challenges?.find(
      (problem) => problem._id === questionId
    );
    setChallenge(problem);
    setDifficulty(problem?.difficulty_id.level);
  };
  useEffect(() => {
    findChallenge();
  }, []);
  const [themeName, setThemeName] = React.useState("nord_dark");
  const [language, setLanguage] = React.useState("java");
  const handleChange = (event) => setThemeName(event.target.value);

  const handleLanguage = (event) => setLanguage(event.target.value);
  return (
    <>
      <div className="container-fluid" id={challenge?._id}>
        <div className="problem-header p-2 d-flex border-bottom border-left">
          <div className="problem-title d-flex">
            <div
              class="back-btn mt-1 ml-2 mr-2"
              onClick={() => history.goBack()}
            >
              <div class="triangle"></div>
              <div class="halfcircle"></div>
            </div>
            {/* <span className="problem-title-head">Array of hope</span> */}
          </div>
          {/* <div className="d-flex align-items-center ml-3 mr-auto">
            
          </div> */}
          <div className="d-flex align-items-center justify-content-center">
            <div className="timer d-flex pr-2 pl-2">
              <i class="fas fa-clock clock-icon mr-2"></i>
              <span className="timer-clock">: 8</span>
            </div>
          </div>
        </div>
        <div className="problem-toggler">
          <div className="d-flex">
            <div className="col-md-4 p-0 border-left border-right border-bottom">
              <ul
                class="nav nav-pills program-pills p-3 border-bottom"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item program-item" role="presentation">
                  <a
                    class="nav-link active program-link"
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
                <li class="nav-item program-item" role="presentation">
                  <a
                    class="nav-link program-link"
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
              <div class="tab-content p-2" id="pills-tabContent">
                <div
                  class="tab-pane fade show active p-2"
                  id="pills-problem"
                  role="tabpanel"
                  aria-labelledby="pills-problem-tab"
                >
                  <div className="d-flex mt-2">
                    <h5 className="problem-state mr-2">{challenge?.name}</h5>
                    <div
                      className={`problem-badge-${difficulty} d-flex align-items-center justify-content-center mr-2`}
                    >
                      <span className={`badge-${difficulty}`}>{difficulty.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap mt-2">
                    <div className="problem-badge-company d-flex align-items-center justify-content-center mr-2">
                      <span className="badge-company">VIRTUSA</span>
                    </div>
                    <div className="problem-badge-company d-flex align-items-center justify-content-center mr-2">
                      <span className="badge-company">KAAR</span>
                    </div>
                    <div className="problem-badge-company d-flex align-items-center justify-content-center mr-2">
                      <span className="badge-company">CRATOFLOW</span>
                    </div>
                    <div className="problem-badge-company d-flex align-items-center justify-content-center mr-2">
                      <span className="badge-company">IONIXX</span>
                    </div>
                  </div>
                  <div className="problem-statement text-justify mt-2">
                    <p>
                      Given two lists of integer a and b sorted in ascending
                      order, merge them into one large sorted list.
                    </p>
                  </div>
                  <div className="constraints mb-2">
                    <span className="constraints-title">Constrainst :</span>
                    <div className="constraints-content d-flex flex-column mt-2">
                      <span className="mt-2">
                        <i class="fas fa-circle constraints-dot mr-2"></i>
                        <span className="constraints-highlight pr-2 pl-2 mr-1">
                          0 &lt; n &lt; 200,000
                        </span>{" "}
                        where n is the length of{" "}
                        <span className="constraints-highlight pr-2 pl-2 ml-1">
                          a
                        </span>
                      </span>
                      <span className="mt-2">
                        <i class="fas fa-circle constraints-dot mr-2"></i>
                        <span className="constraints-highlight pr-2 pl-2 mr-1">
                          0 &lt; m &lt; 200,000
                        </span>{" "}
                        where m is the length of{" "}
                        <span className="constraints-highlight pr-2 pl-2 ml-1">
                          b
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="problem-input d-flex flex-column mt-4 mb-2">
                    <span className="constraints-title mb-2">Example :</span>
                    <div className="example-input mt-2">
                      <span>Input : </span> <br />a = [5, 10, 15] , b = [2, 3,
                      5]
                    </div>
                    <div className="example-output mt-2">
                      <span>output : </span> <br />
                      [5, 10, 15]
                    </div>
                  </div>
                  <div className="hints mt-2 d-flex flex-column">
                    <span className="constraints-title">Hints :</span>
                    <div className="problem-statement text-justify mt-2">
                      <p>
                        The idea is to use Merge function of Merge sort. Create
                        an array arr3[] of size n1 + n2. Simultaneously traverse
                        arr1[] and arr2[]. Pick smaller of current elements in
                        arr1[] and arr2[], copy this smaller element to next
                        position in arr3[] and move ahead in arr3[] and the
                        array whose element is picked.
                      </p>
                    </div>
                  </div>
                  {/* /TESTCASE/ */}
                  <div></div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-submissions"
                  role="tabpanel"
                  aria-labelledby="pills-submissions-tab"
                >
                  TestCase
                </div>
              </div>
            </div>
            <div className="col-md-8 p-0 d-flex flex-column">
              <div className="w-100 d-flex mt-3 mb-2">
                <SelectReducer
                  array={["c", "java"]}
                  name="Select theme"
                  handleSelect={handleLanguage}
                  value={language}
                  className="w-50"
                />
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
                  className="w-50"
                />
              </div>
              <Editor language={language} themeName={themeName} />
              <div className="create-con mt-1 d-flex justify-content-end">
                <button className="p-2">
                  <i className="fas fa-code pr-2 pl-2"></i>RUN CODE
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
