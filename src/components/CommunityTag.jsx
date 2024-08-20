import './CommunityTag.css';
import '../index.css';

const CommunityTag = ({ children, disabled = false }) => {
  return (
    <button className="community-tag" disabled={disabled}>
      {children}
    </button>
  );
};

export default CommunityTag;
