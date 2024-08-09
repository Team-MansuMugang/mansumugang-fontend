import React from 'react';
import './HealthDetail.css';
import '../index.css';

const HealthDetail = ({ title, data }) => {
  return (
    <div className="health-detail-container">
      <h2 className="health-detail-title">{title}</h2>
      <hr className="separator" />
      <h2 className="health-detail-data">{data}</h2>
    </div>
  );
};

export default HealthDetail;
