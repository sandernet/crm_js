import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Spinner animation="border" variant="success" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
