import './NotificationItem.css';
import '../index.css';

const NotificationItem = ({ profileImage, notificationMessage, timeAgo, onClick }) => {
  return (
    <div className="notification-item" onClick={onClick}>
      <img src={profileImage} alt="Profile" className="profile-image" />
      <div className="notification-content">
        <div className="notification-message">{notificationMessage}</div>
        <div className="notification-time">{timeAgo}</div>
      </div>
    </div>
  );
};

export default NotificationItem;
