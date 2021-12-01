import React, { createContext } from "react";

export const DataContext = createContext();

const DataProvider = (props) => {
  const [state, setstate] = useState({})
  return (
    <div>
      <DataContext.Provider
        value={[state,setstate]}
      >
        {props.children}
      </DataContext.Provider>
    </div>
  );
};

export default DataProvider;
