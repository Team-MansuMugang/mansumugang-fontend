import './ContainerWrapper.css';
import '../index.css';
import PropTypes from 'prop-types';

const ContainerWrapper = ({ children, description = 'description' }) => {
  return (
    <div>
      <p className="description">{description}</p>
      <div className="container-wrapper">
        <div className="container-wrapper-children">{children}</div>
      </div>
    </div>
  );
};

ContainerWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
};

export default ContainerWrapper;
