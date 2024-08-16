import React from 'react';
import './FilledDualInfo.css';
import '../index.css';

const FilledDualInfo = ({ title, data }) => {
  return (
    <div className="filled-dual-info">
      <span>{title}</span>
      <hr />
      <span>{data}</span>
    </div>
  );
};

export default FilledDualInfo;
