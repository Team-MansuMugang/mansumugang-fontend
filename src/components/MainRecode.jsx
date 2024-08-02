import './MainRecode.css';
import '../index.css';

const MainRecode = ({ profileImage, name, responseTime }) => {
  return (
    <div className="profile-container">
      <img src={profileImage} alt={`${name} profile`} className="profile-image" />
      <div className="profile-details">
        <div className="profile-name">{name}</div>
        <div className="profile-time">{responseTime + '분전'}</div>
      </div>
    </div>
  );
};

export default MainRecode;
