import React, { useEffect, useState } from 'react';
import './DaySelector.css';
import '../index.css';

const dayMapping = {
  일: 'SUNDAY',
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
};

const DaySelector = ({ onSelect, initSelectedDays = [], viewOnly = false }) => {
  const [selectedDays, setSelectedDays] = useState(initSelectedDays);

  useEffect(() => {
    setSelectedDays(initSelectedDays);
  }, [JSON.stringify(initSelectedDays)]);

  useEffect(() => {
    if (onSelect) onSelect(selectedDays);
  }, [selectedDays]);

  const toggleDay = (englishDay) => {
    if (selectedDays.includes(englishDay))
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== englishDay));
    else setSelectedDays([...selectedDays, englishDay]);
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
