import './Input.css';
import '../index.css';

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

export default Input;
