import axios from 'axios';

export const transcribeVoiceMessage = async (audioUrl) => {
  const formData = new FormData();
  formData.append('file', audioUrl);

  const response = await axios.post(
    'https://clovaspeech-gw.ncloud.com/external/v1/8889/85b0369195b87877b6f04a5306689d2910e0b0c942cb834c8b67aab0a764bd52/mansumugang/recode-data',
    formData,
    {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_ACCESS_KEY_ID,
        'X-NCP-APIGW-API-KEY': process.env.REACT_APP_SECRET_KEY,
        'Content-Type': 'application/json',
      },
      params: {
        version: 'v1',
        language: 'ko-KR',
      },
    },
  );

  return response.data; // API 응답의 텍스트 결과를 반환
};
