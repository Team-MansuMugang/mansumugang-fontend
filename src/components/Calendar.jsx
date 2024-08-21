import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';
import ChevronLeft from '../assets/svg/chevron-left.svg?react';
import ArrowBack2 from '../assets/svg/arrow-back-2.svg?react';
import PlayArrowSharp from '../assets/svg/play-arrow-sharp.svg?react';
import SubButton from './SubButton';

// 요일 상수
const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 오늘 날짜인지 확인합니다.
 * @param {number} year - 연도
 * @param {number} month - 월 (0부터 시작)
 * @param {number} date - 일
 * @param {Date} today - 오늘 날짜 객체
 * @returns {boolean} - 주어진 날짜가 오늘이면 true, 그렇지 않으면 false
 */
const isToday = (year, month, date, today) =>
  today.getFullYear() === year && today.getMonth() === month && today.getDate() === date;

/**
 * 선택된 날짜인지 확인합니다.
 * @param {number} year - 연도
 * @param {number} month - 월 (0부터 시작)
 * @param {number} date - 일
 * @param {Date} selectedDate - 선택된 날짜 객체
 * @returns {boolean} - 주어진 날짜가 선택된 날짜이면 true, 그렇지 않으면 false
 */
const isSelectedDate = (year, month, date, selectedDate) =>
  selectedDate &&
  selectedDate.getFullYear() === year &&
  selectedDate.getMonth() === month &&
  selectedDate.getDate() === date;

/**
 * 주어진 날짜에 해당하는 상태를 반환합니다.
 * @param {number} year - 연도
 * @param {number} month - 월 (0부터 시작)
 * @param {number} date - 일
 * @param {Array<{date: string, status: string}>} dateStatus - 날짜와 상태 정보를 담고 있는 배열
 * @returns {string|null} - 주어진 날짜에 대한 상태가 있으면 상태 문자열을 반환, 없으면 null 반환
 */
const getDateStatus = (year, month, date, dateStatus) => {
  const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
  const statusObj = dateStatus.find((d) => d.date === formattedDate);
  return statusObj ? statusObj.status : null;
};

/**
 * 주어진 연도와 월에 대한 달력을 생성합니다.
 * @param {number} year - 연도
 * @param {number} month - 월 (0부터 시작)
 * @returns {Array<Array<number|null>>} - 월별로 주 단위로 배열로 나타낸 달력 정보
 */
const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendar = [];
  let week = [];

  for (let i = 0; i < firstDay; i++) week.push(null); // 첫 주의 공백 채우기

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7 || day === daysInMonth) {
      while (week.length < 7) week.push(null); // 마지막 주의 공백 채우기
      calendar.push(week);
      week = [];
    }
  }

  return calendar;
};

/**
 * 개별 날짜를 나타내는 컴포넌트입니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {number|null} props.date - 해당 일 (null일 경우 날짜가 표시되지 않음)
 * @param {boolean} props.isToday - 오늘 날짜 여부
 * @param {boolean} props.isSelected - 선택된 날짜 여부
 * @param {string|null} props.status - 날짜 상태 (CSS 클래스에 반영됨)
 * @param {Function} props.onClick - 클릭 이벤트 핸들러
 * @returns {JSX.Element} - 날짜를 나타내는 JSX 요소
 */
const CalendarDate = ({ date, isToday, isSelected, status, onClick }) => (
  <div
    onClick={onClick}
    className={`
      calendar-date
      ${!date ? 'not-date' : ''}
      ${isToday ? 'today' : ''}
      ${isSelected ? 'selected' : ''}
      ${status ? `status-${status}` : ''}`}
  >
    {date || ''}
  </div>
);

/**
 * 달력 컴포넌트입니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} [props.onSelect] - 날짜를 선택했을 때 호출되는 콜백 함수. 선택된 날짜를 매개변수로 받아 처리할 수 있습니다.
 * @param {Array<{date: string, status: ('TAKEN' | 'NO_TAKEN')}>} [props.dateStatus] - 날짜와 상태 정보를 담고 있는 배열 (기본값: [])
 * @returns {JSX.Element} - 달력 컴포넌트의 JSX 요소
 */
const Calendar = ({ onSelect, dateStatus = [], backUrl }) => {
  const navigate = useNavigate();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendar = generateCalendar(year, month);

  /**
   * 월을 변경합니다.
   * @param {number} offset - 변경할 월의 오프셋 (양수면 다음 달, 음수면 이전 달)
   */
  const changeMonth = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDate(null);
  };

  /**
   * 날짜 클릭 시 호출되는 함수입니다.
   * @param {number} date - 클릭한 날짜
   */
  const handleDateClick = (date) => {
    const selected = new Date(Date.UTC(year, month, date)); // UTC 기준으로 날짜 생성
    setSelectedDate(selected);
    if (onSelect) onSelect(selected.toISOString().split('T')[0]);
  };

  /**
   * 오늘 날짜로 이동합니다.
   */
  const goToToday = () => {
    setCurrentDate(today);
    setSelectedDate(today);
    if (onSelect) onSelect(today.toISOString().split('T')[0]);
  };

  return (
    <>
      <div className="calendar-header">
        <button className="svg back" onClick={() => navigate(backUrl)}>
          <ChevronLeft />
        </button>
        <div className="month-controller">
          <button className="svg" onClick={() => changeMonth(-1)}>
            <ArrowBack2 />
          </button>
          <h1>
            {year}년 {month + 1}월 일정
          </h1>
          <button className="svg" onClick={() => changeMonth(1)}>
            <PlayArrowSharp />
          </button>
        </div>
        <SubButton onClick={goToToday}>today</SubButton>
      </div>
      <div className="calendar-body">
        <div className="calendar-days">
          {DAYS_OF_WEEK.map((day, index) => (
            <div key={index} className="calendar-day">
              {day}
            </div>
          ))}
        </div>
        {calendar.map((week, index) => (
          <div key={index} className="calendar-week">
            {week.map((date, i) => (
              <CalendarDate
                key={i}
                date={date}
                isToday={isToday(year, month, date, today)}
                isSelected={isSelectedDate(year, month, date, selectedDate)}
                status={date ? getDateStatus(year, month, date, dateStatus) : null}
                onClick={() => date && handleDateClick(date)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
