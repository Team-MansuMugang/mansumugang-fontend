import '../index.css';
import './UserInfoItem.css';

const UserInfoItem = ({ title, value }) => {
  return (
    <div className="user-info-item">
      <div className="item-title">{title}</div>
      <div className="item-value">{value}</div>
    </div>
  );
};

export default UserInfoItem;
