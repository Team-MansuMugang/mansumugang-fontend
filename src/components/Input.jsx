import './Input.css';
import '../index.css';
import PropTypes from 'prop-types';

const Input = ({
  placeholder,
  type = 'text',
  autoCapitalize = 'off',
  status = 'default',
  onChange,
  onInput,
  value,
}) => {
  return (
    <input
      className={`input input-${status}`}
      type={type}
      pattern={type === 'tel' || 'number' ? '[0-9]*' : undefined}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      onChange={onChange}
      onInput={onInput}
      value={value}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'tel']),
  autoCapitalize: PropTypes.oneOf(['off', 'on']),
  status: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'important', 'info']),
};

export default Input;
