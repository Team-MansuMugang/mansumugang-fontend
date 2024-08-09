import React, { useState } from 'react';
import './DaySelector.css';
import '../index.css';

const DaySelector = ({ onSelect }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }

    if (onSelect) onSelect(selectedDays);
  };

  const isSelected = (day) => selectedDays.includes(day);

  return (
    <ul className="day-selector">
      {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
        <li key={day}>
          <button className={isSelected(day) ? 'selected' : ''} onClick={() => toggleDay(day)}>
            {day}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DaySelector;
