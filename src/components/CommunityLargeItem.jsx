import './CommunityLargeItem.css';
import '../index.css';
import MarginContainer from './MarginContainer';
import { MarginPostion, MarginSize } from '../const/MarginType';
import { getPostCategory } from '../const/PostCategoryCode';

const CommunityLargeItem = ({ title, content, onClick, categoryCode, time }) => {
  const tCommunityLargeItemMargin = [
    { marginPostion: MarginPostion.TOP, marginSize: MarginSize.S10 },
    { marginPostion: MarginPostion.BOTTOM, marginSize: MarginSize.S10 },
    { marginPostion: MarginPostion.LEFT, marginSize: MarginSize.S10 },
    { marginPostion: MarginPostion.RIGHT, marginSize: MarginSize.S10 },
  ];

  return (
    <div className="community-large-item" onClick={onClick}>
      <MarginContainer marginSet={tCommunityLargeItemMargin}>
        <h2>{title}</h2>
        <p className="community-content">{content}</p>
        <div className="community-item-footer">
          <button className="small-button">{getPostCategory(categoryCode)}</button>
          <span className="divider">|</span>
          <span>{time} 전</span>
        </div>
      </MarginContainer>
    </div>
  );
};

export default CommunityLargeItem;
