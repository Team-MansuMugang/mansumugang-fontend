import './MoreContainer.css';
import '../index.css';

import PropTypes from 'prop-types';

const MoreContainer = ({ children, onMoreClick, description = 'description' }) => {
  return (
    <div className="more-container">
      <div className="header">
        <p className="description">{description}</p>
        <button className="more-button" onClick={onMoreClick}>
          더보기
        </button>
      </div>
      <div className="object-wrapper">
        <div className="object-wrapper-children">{children}</div>
      </div>
    </div>
  );
};

MoreContainer.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.object,
};
export default MoreContainer;
