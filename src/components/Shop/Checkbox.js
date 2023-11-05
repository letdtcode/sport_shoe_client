import React, { useState } from "react";

const CheckboxCategoryFilter = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or - 1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state => push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };
  return categories.map((item, i) => (
    <li
      key={i}
      className="list-item d-flex align-items-center justify-content-between"
    >
      <label className="list-group-item">
        <input
          className="form-check-input me-3"
          type="checkbox"
          value={checked.indexOf(item._id === -1)}
          onChange={handleToggle(item.name)}
        />
        {item.name}
      </label>
    </li>
  ));
};

export default CheckboxCategoryFilter;
