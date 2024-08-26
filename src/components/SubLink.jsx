import './SubLink.css';
import '../index.css';
import { Link } from 'react-router-dom';

const SubLink = ({ children, to }) => {
  return (
    <Link className="sub-link" to={to}>
      {children}
    </Link>
  );
};

export default SubLink;
