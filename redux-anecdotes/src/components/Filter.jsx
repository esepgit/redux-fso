import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const style = {margin: 10}

  return (
    <div style={style}>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
      />
      favorite
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("FAVORITE"))}
      />
    </div>
  );
}

export default Filter