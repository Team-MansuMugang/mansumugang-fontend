import './ToggleSwitch.css';
import '../index.css';

const ToggleSwitch = ({ labels = ['A', 'B'], active = 0 }) => {
  const buttons = labels.map((label, index) => {
    return (
      <button key={label} disabled={active !== index}>
        {label}
      </button>
    );
  });

  return <div className="toggle-switch">{buttons}</div>;
};

export default ToggleSwitch;
