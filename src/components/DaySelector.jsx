import React, { useState } from 'react';
import './DaySelector.css';
import '../index.css';

const dayMapping = {
  일: 'Sunday',
  월: 'Monday',
  화: 'Tuesday',
  수: 'Wednesday',
  목: 'Thursday',
  금: 'Friday',
  토: 'Saturday',
};

const DaySelector = ({ onSelect, initSelectedDays = [], viewOnly = false }) => {
  const [selectedDays, setSelectedDays] = useState(initSelectedDays);

  const toggleDay = (englishDay) => {
    if (selectedDays.includes(englishDay)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== englishDay));
    } else {
      setSelectedDays([...selectedDays, englishDay]);
    }

    if (onSelect) onSelect(selectedDays);
  };

  const isSelected = (englishDay) => selectedDays.includes(englishDay);

  return (
    <ul className="day-selector">
      {Object.entries(dayMapping).map(([day, englishDay]) => (
        <li key={day}>
          <button
            className={isSelected(englishDay) ? 'selected' : ''}
            onClick={() => toggleDay(englishDay)}
            disabled={viewOnly}
          >
            {day}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DaySelector;
