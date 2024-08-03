import './ProfileEditButton.css';
import '../index.css';

const ProfileEditButton = ({ children, disabled = false }) => {
  return (
    <button className="profile-edit-button" disabled={disabled}>
      {children}
    </button>
  );
};

export default ProfileEditButton;
