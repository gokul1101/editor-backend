import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SelectReducer = (props) => {

  return (
    <div>
      <FormControl variant="outlined"  className={props.className}>
        <InputLabel id="demo-simple-select-outlined-label">
          {props.name}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.themeName}
          onChange={props.handleSelect}
          label={props.name}
        >
          {props.array.map((item, id) => {
            return (
              <MenuItem value={item} key={id}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectReducer;
