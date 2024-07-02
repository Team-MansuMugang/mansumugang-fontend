import './ToggleSwitch.css';
import '../index.css';

const ToggleSwitch = ({ labels = ['A', 'B'], active = 0, onClicks }) => {
  const buttons = labels.map((label, index) => {
    const handleClick = onClicks?.[index] ?? (() => {});

    return (
      <button key={label} disabled={active === index} onClick={handleClick}>
        {label}
      </button>
    );
  });

  return <div className="toggle-switch">{buttons}</div>;
};

export default ToggleSwitch;
