import './ContainerVoiceMessage.css';
import '../index.css';

import PropTypes from 'prop-types';

const ContainerVoiceMessage = ({ children, onMoreClick, description = 'description' }) => {
  return (
    <div className="Voice-Message-container">
      <div className="message-header">
        <button className="Container-Voice-Message-button" onClick={onMoreClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z" />
          </svg>
        </button>
        <p className="description">{description}</p>
      </div>
      <div className="Container-Voice-Message-wrapper">
        <div className="Container-Voice-Message-wrapper-children">{children}</div>
      </div>
    </div>
  );
};

ContainerVoiceMessage.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.object,
};
export default ContainerVoiceMessage;
