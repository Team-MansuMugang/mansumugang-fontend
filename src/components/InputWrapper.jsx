import './InputWrapper.css';
import '../index.css';
import PropTypes from 'prop-types';

const InputWrapper = ({
  children,
  description = 'description',
  status = 'default',
  statusDescription = '',
}) => {
  return (
    <div className={`input-wrapper input-wrapper-${status}`}>
      <div className="input-wrapper-descriptions">
        <p className="description">{description}</p>
        <p className="status-description">{statusDescription}</p>
      </div>
      <div className="input-wrapper-children">{children}</div>
    </div>
  );
};

InputWrapper.propTypes = {
  description: PropTypes.string,
  status: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'important', 'info']),
  statusDescription: PropTypes.string,
};

export default InputWrapper;
