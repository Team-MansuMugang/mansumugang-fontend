export const parseLocalDateTime = (localDateTime) => {
  // 날짜와 시간을 'T'를 기준으로 분리
  const [date, time] = localDateTime.split('T');

  // 오늘 날짜를 구함
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // 어제 날짜를 구함
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];

  // 날짜 출력 형식 결정
  let formattedDate;
  if (date === todayString) {
    formattedDate = '오늘';
  } else if (date === yesterdayString) {
    formattedDate = '어제';
  } else {
    formattedDate = date.split('-').join('-');
  }

  // 시간에서 시와 분을 추출하고 "시 분" 형식으로 변환
  const [hour, minute] = time.split(':');
  const formattedTime = `${hour}시 ${minute}분`;
  return { formattedDate, formattedTime };
};

export const timeAgoByStr = (givenTimeStr) => {
  const givenTime = new Date(givenTimeStr);
  const currentTime = new Date();

  // 시간 차이를 밀리초로 계산
  const diffMs = currentTime - givenTime;

  // 시간 차이를 분, 시간, 일로 변환
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 1시간 이내
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  // 24시간 이내
  else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  // 10일 이내
  else if (diffDays < 10) {
    return `${diffDays}일 전`;
  }
  // 그 이상이면 YYYY년 MM월 DD일 형식으로 날짜 표시
  else {
    const year = givenTime.getFullYear();
    const month = givenTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = givenTime.getDate();
    return `${year}/${month}/${day}`;
  }
};

export const timeAgoByDate = (givenTime) => {
  const currentTime = new Date();

  // 시간 차이를 밀리초로 계산
  const diffMs = currentTime - givenTime;

  // 시간 차이를 분, 시간, 일로 변환
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 1시간 이내
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  // 24시간 이내
  else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  // 10일 이내
  else if (diffDays < 10) {
    return `${diffDays}일 전`;
  }
  // 그 이상이면 YYYY년 MM월 DD일 형식으로 날짜 표시
  else {
    const year = givenTime.getFullYear();
    const month = givenTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = givenTime.getDate();
    return `${year}/${month}/${day}`;
  }
};

export const getLocalDate = (localDateTime) => {
  // 날짜와 시간을 'T'를 기준으로 분리
  const [date, time] = localDateTime.split('T');
  return date;
};
