import './InputContainer.css';
import '../index.css';
import PropTypes from 'prop-types';

const InputContainer = ({
  children,
  description = 'description',
  status = 'default',
  statusDescription = '',
}) => {
  return (
    <div className={`input-container input-container-${status}`}>
      <div className="input-container-descriptions">
        <p className="description">{description}</p>
        <p className="status-description">{statusDescription}</p>
      </div>
      <div className="input-container-children">{children}</div>
    </div>
  );
};

InputContainer.propTypes = {
  description: PropTypes.string,
  status: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'important', 'info']),
  statusDescription: PropTypes.string,
};

export default InputContainer;
