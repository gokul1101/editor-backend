import React, { useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-textmate";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./Compiler.css";
import { useHistory } from "react-router-dom";
import Male from "../../../Images/man.png";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import ComImg from "../../../Images/Loop1.jpg";
const Compiler = (props) => {
  const themes = [
    "xcode",
    "monokai",
    "github",
    "nord_dark",
    "textmate",
    "one_dark",
  ];
  const languages = ["c", "java"];
  const [themeName, setThemeName] = React.useState("nord_dark");
  const [language, setLanguage] = React.useState("java");
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "95%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    props.setSideToggle(true);
  });

  const returnBack = () => {
    history.goBack();
  };

  const handleChange = (event) => {
    setThemeName(event.target.value);
  };

  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="container-fluid p-0 compiler-container">
      <div className="d-flex">
        <div className="d-flex mr-auto mt-2">
          <div class="back-btn mt-3 ml-4" onClick={returnBack}>
            <div class="triangle"></div>
            <div class="halfcircle"></div>
          </div>
          <div className="complier-img">
            <img
              src={ComImg}
              alt="compilerImg"
              height="40"
              width="100"
              className="img-fluid ml-3 pt-2"
            />
          </div>
        </div>
        <div className="user-info position-relative">
          <div className="d-flex mx-4 pt-3 user-det justify-content-end">
            <div className="gender-info mr-3">
              <img src={Male} alt="male" height="50" width="50" />
            </div>
            <div className="user-profile d-flex flex-column">
              <span className="user-name">Dhanush Karthick S</span>
              <span className="register-no">1813015</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-9 p-0">
          <AceEditor
            className="mt-3"
            height="100vh"
            width="100%"
            placeholder="Your code goes here.."
            mode={language}
            theme={themeName}
            name="Editor"
            onChange={(value) => console.log(value)}
            fontSize={20}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={`public class MyClass {
    public static void main(String args[]) {
        int x=10;
        int y=25;
        int z=x+y;
        System.out.println("Sum of x+y = " + z);
    }
}`}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
        <div className="col-md-3 p-3">
          <div className="d-flex w-100">
            <div className="col-md-6 p-0">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Select Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  onChange={handleLanguage}
                >
                  {languages.map((name) => {
                    return (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-6 p-0">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Select theme
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={themeName}
                  onChange={handleChange}
                >
                  {themes.map((name) => {
                    return (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="d-flex flex-column">
            <TextField
              className="mt-3"
              id="outlined-multiline-static"
              label="Enter your input"
              multiline
              rows={6}
              variant="outlined"
            />
            <div className="d-flex align-items-end justify-content-end border-bottom">
              <Button
                variant="outlined"
                className="w-25 mt-3 mb-3 pr-2 pl-2"
                color="primary"
              >
                COMPILE
              </Button>
            </div>
            <div className="d-flex flex-column">
              <span className="mt-2">OUTPUT :</span>
              <TextField
                className="mt-2"
                id="outlined-multiline-static"
                multiline
                rows={10}
                variant="outlined"
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Compiler;

/* 
  <div className="d-flex">
        
       
      </div>
      
      <button className="btn-hover color-11 mt-2 float-right">
        COMPILE <i className="fas fa-code  mr-2 ml-2"></i>
      </button>
*/
