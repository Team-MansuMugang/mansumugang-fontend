import './NotificationItem.css';
import '../index.css';
import NotificationsIcon from '../assets/svg/notifications.svg?react';
import { timeAgoByDate } from '../utility/dates';

const NotificationItem = ({ title, body, timeAgo }) => {
  return (
    <div className="notification-item">
      <div className="icon-wrap">
        <NotificationsIcon />
      </div>
      <div className="notification-content">
        <div className="notification-title">{title}</div>
        <div className="notification-body">{body}</div>
        <div className="notification-time">{timeAgoByDate(timeAgo)}</div>
      </div>
    </div>
  );
};

export default NotificationItem;
