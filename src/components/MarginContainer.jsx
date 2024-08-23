import '../components/MarginContainer.css';

const MarginContainer = ({ children, marginSet }) => {
  const classNameList = marginSet.map((margin) => {
    return margin.marginPostion + '-' + margin.marginSize;
  });

  const className = classNameList.join(' ');

  return <div className={className}>{children}</div>;
};

export default MarginContainer;
