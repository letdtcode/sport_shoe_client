import { useState } from "react";

const CheckboxBrandFilter = ({ brands, handleFilters }) => {
  const [checkedBrandName, setCheckedBrandName] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or - 1
    const currentCategoryId = checkedBrandName.indexOf(c);
    const newCheckedBrandName = [...checkedBrandName];
    // if currently checked was not already in checked state => push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedBrandName.push(c);
    } else {
      newCheckedBrandName.splice(currentCategoryId, 1);
    }
    setCheckedBrandName(newCheckedBrandName);
    handleFilters(newCheckedBrandName);
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
          value={checkedBrandName.indexOf(item.categoryName) !== -1}
          onChange={handleToggle(item.brandName)}
        />
        {item.brandName}
      </label>
    </li>
  ));
};

export default CheckboxBrandFilter;