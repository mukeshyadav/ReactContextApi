import React from "react";
import PropTypes from "prop-types";

const Header = props => {
  const { title } = props;
  return <header className="header">{title}</header>;
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
