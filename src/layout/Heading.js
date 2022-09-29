import PropTypes from "prop-types";

function Heading({ size = "1", title }) {
  const VariableHeading = `h${size}`;
  return <VariableHeading>{title}</VariableHeading>;
}

Heading.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Heading;
