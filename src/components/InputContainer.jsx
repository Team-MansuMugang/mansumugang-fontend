import './InputContainer.css';
import '../index.css';

const InputContainer = ({ children, description = 'description' }) => {
  return (
    <div className="input-container">
      <p>{description}</p>
      <div className="input-container-children">{children}</div>
    </div>
  );
};

export default InputContainer;
