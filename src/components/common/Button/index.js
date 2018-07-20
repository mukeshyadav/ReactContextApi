import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { label, onClick } = props;
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Button;
