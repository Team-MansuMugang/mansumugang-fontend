import SmallButton from './SmallButton';
import CommentCount from './CommentCount';
import './CommunityLargeItem.css';
import '../index.css';

const CommunityLargeItem = ({ title, summary, onClick, time }) => {
  return (
    <div className="community-large-item" onClick={onClick}>
      <h2>{title}</h2>
      <p className="community-summary">{summary}</p>
      <div className="community-item-footer">
        <SmallButton children={'질문'}></SmallButton>
        <span className="divider">|</span>
        <CommentCount children={'7'} />
        <span className="divider">|</span>
        <span>{time} 전</span>
      </div>
    </div>
  );
};

export default CommunityLargeItem;
