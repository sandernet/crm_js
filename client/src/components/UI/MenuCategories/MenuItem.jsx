import React, { useState } from "react";
import cl from "./MenuCategories.module.css";

const MenuItem = ({ item, setCategory }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (categoryId) => {
    setIsExpanded(!isExpanded);
    setCategory(categoryId);
  };

  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className={cl.submenu}>
      <input
        type="checkbox"
        name={item.id}
        id={item.id}
        className="checked"></input>
      <label for={item.id} onClick={() => handleToggle(item.id)}>
        {item.name}
      </label>

      {hasChildren && isExpanded && (
        <ul>
          {item.children.map((child) => (
            <MenuItem key={child.id} item={child} setCategory={setCategory} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
