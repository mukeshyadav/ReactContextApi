import React from "react";
import PropTypes from "prop-types";

const Input = props => {
  return <input {...props} />;
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default Input;
