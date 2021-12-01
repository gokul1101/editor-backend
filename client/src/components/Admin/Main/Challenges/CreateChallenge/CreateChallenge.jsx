import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import InputReducer from "../../../../Reducer/InputReducer";
import "./CreateChallenge.css";
const CreateChallenge = (props) => {
  const [tags, setTags] = React.useState(props.tags);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      <p className="text-left dash-title-category pb-2">Create Challenges</p>
      <div className="d-flex flex-column mb-5">
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Challenge name <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <InputReducer
              placeholder="Challenge name"
              name="Challenge name"
              type="text"
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Description <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter Description"
              multiline
              rows={10}
              variant="outlined"
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Problem Statement <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter Problem Statement"
              multiline
              rows={10}
              variant="outlined"
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Input format <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter Input format"
              multiline
              rows={7}
              variant="outlined"
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Output format <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter Output format"
              multiline
              rows={7}
              variant="outlined"
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Constraints <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <InputReducer />
          </div>
        </div>
        <div className="d-flex mt-2 mb-5">
          <span className="contest-line-height mr-2 col-md-3">
            Tags <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <div className="tags-input">
              <ul id="tags">
                {tags.map((tag, index) => (
                  <li key={index} className="tag">
                    <span className="tag-title">{tag}</span>
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTags(index)}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                onKeyUp={(event) =>
                  event.key === "Enter" ? addTags(event) : null
                }
                placeholder="Press enter to add tags"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;
