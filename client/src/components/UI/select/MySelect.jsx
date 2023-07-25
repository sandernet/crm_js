import React from "react";
import { Form } from "react-bootstrap";

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <Form.Select
      aria-label="Default select example"
      value={value}
      onChange={(event) => onChange(event.target.value)}>
      <option>{defaultValue}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default MySelect;
