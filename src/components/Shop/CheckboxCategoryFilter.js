import { useState } from "react";

const CheckboxCategoryFilter = ({ categories, handleFilters }) => {
  const [checkedCategoryName, setCheckedCategoryName] = useState([]);

  const handleToggle = (categoryName) => {
    // return the first index or - 1
    const currentIndex = checkedCategoryName.indexOf(categoryName);
    const newCheckedCategoryName = [...checkedCategoryName];
    // if currently checked was not already in checked state => push
    // else pull/take off
    if (currentIndex === -1) {
      newCheckedCategoryName.push(categoryName);
    } else {
      newCheckedCategoryName.splice(currentIndex, 1);
    }
    setCheckedCategoryName(newCheckedCategoryName);
    handleFilters(newCheckedCategoryName);
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
          value={checkedCategoryName.indexOf(item.categoryName) !== -1}
          onChange={() => handleToggle(item.categoryName)}
        />
        {item.categoryName}
      </label>
    </li>
  ));
};

export default CheckboxCategoryFilter;
