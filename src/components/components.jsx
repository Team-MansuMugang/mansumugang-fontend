import './components.css';

const BigButton = ({ children }) => {
  return <button className="big-button">{children}</button>;
};

const CheckButton = ({ children }) => {
  return <button className="check-button">{children}</button>;
};

const Input = ({ placeholder, type = 'text' }) => {
  return <input className="input" type={type} placeholder={placeholder} />;
};

const InputContainer = ({ children, description = 'description' }) => {
  return (
    <div className="input-container">
      <p>{description}</p>
      <div className="input-container-children">{children}</div>
    </div>
  );
};

export { BigButton, CheckButton, Input, InputContainer };
