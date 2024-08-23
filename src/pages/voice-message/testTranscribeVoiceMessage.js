require('dotenv').config(); // 환경 변수를 로드합니다
const axios = require('axios');
const { transcribeVoiceMessage } = require('./path/to/your/api/clovaSpeech'); // 함수가 정의된 파일의 경로로 수정

const audioUrl = 'http://minnnisu.iptime.org/mm/audio/8e4bfdf549f74d4b96c69226510eb061.mp3'; // 테스트할 음성 파일의 URL

(async () => {
  try {
    const result = await transcribeVoiceMessage(audioUrl);
    console.log('변환된 텍스트:', result);
  } catch (error) {
    console.error('테스트 실패:', error);
  }
})();
