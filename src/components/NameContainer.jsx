import './NameContainer.css';
import '../index.css';

const NameContainer = ({ name, nickname }) => {
  return (
    <div className="name-container">
      <p className="name-container-name">{name}</p>
      <p className="name-container-nickname">{nickname}</p>
    </div>
  );
};

export default NameContainer;
