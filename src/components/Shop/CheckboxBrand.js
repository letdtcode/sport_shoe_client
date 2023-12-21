import React, { useState } from "react";

const CheckboxCategoryFilter = ({ brands, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or - 1
    const currentBrandId = checked.indexOf(c);
    const newCheckedBrandId = [...checked];
    // if currently checked was not already in checked state => push
    // else pull/take off
    if (currentBrandId === -1) {
      newCheckedBrandId.push(c);
    } else {
      newCheckedBrandId.splice(currentBrandId, 1);
    }
    setChecked(newCheckedBrandId);
    handleFilters(newCheckedBrandId);
  };
  return brands.map((item, i) => (
    <li
      key={i}
      className="list-item d-flex align-items-center justify-content-between"
    >
      <label className="list-group-item">
        <input
          className="form-check-input me-3"
          type="checkbox"
          value={checked.indexOf(item._id === -1)}
          onChange={handleToggle(item.brandName)}
        />
        {item.brandName}
      </label>
    </li>
  ));
};

export default CheckboxCategoryFilter;
