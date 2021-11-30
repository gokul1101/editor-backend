import React, { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = (props) => {
  const helloFuc = () => {
    console.log("Hello Fuction Triggered");
  };
  return (
    <div>
      <DataContext.Provider
        value={{
          helloFuc,
        }}
      >
        {props.children}
      </DataContext.Provider>
    </div>
  );
};

export default DataProvider;
