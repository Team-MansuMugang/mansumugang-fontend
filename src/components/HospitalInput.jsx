import { useState } from 'react';
import './HospitalInput.css';
import '../index.css';

const HospitalInput = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const handleChange1 = (event) => setValue1(event.target.value);
  const handleChange2 = (event) => setValue2(event.target.value);

  return (
    <div className="hospital-input-container">
      <input
        type="text"
        value={value1}
        onChange={handleChange1}
        placeholder="병원"
        className="hospital-input"
      />
      <input
        type="text"
        value={value2}
        onChange={handleChange2}
        placeholder="주소"
        className="hospital-input"
      />
    </div>
  );
};

export default HospitalInput;
