import './CommunityTag.css';
import '../index.css';

const CommunityTag = ({ children, isHighlight = false }) => {
  return <div className={`community-tag ${isHighlight ? 'highlighted' : ''}`}>{children}</div>;
};

export default CommunityTag;
