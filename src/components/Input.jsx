import './Input.css';
import '../index.css';
import PropTypes from 'prop-types';

const Input = ({ placeholder, type = 'text', autoCapitalize = 'off', status = 'default' }) => {
  return (
    <input
      className={`input input-${status}`}
      type={type}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  autoCapitalize: PropTypes.oneOf(['off', 'on']),
  status: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'important', 'info']),
};

export default Input;
