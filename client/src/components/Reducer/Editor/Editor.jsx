import React from "react";
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

const Editor = (props) => {
  return (
    <div>
      <AceEditor
        height="80vh"
        width="100%"
        placeholder="Your code goes here.."
        mode={props.language}
        theme={props.themeName}
        name="Editor"
        onChange={(value) => console.log(value)}
        fontSize={20}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={`public class Main {
    public static void main(String args[]) {
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
  );
};

export default Editor;
