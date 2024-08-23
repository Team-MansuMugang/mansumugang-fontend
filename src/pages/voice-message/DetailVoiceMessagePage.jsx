import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailVoiceMessagePage.css';
import MainHeader from '../../components/MainHeader';
import NavBar from '../../components/NavBar';
import VoicePlayerBar from '../../components/VoicePlayerBar';
import { useLocation } from 'react-router-dom';
import { parseLocalDateTime } from '../../utility/dates';
import deleteVoiceMessage from '../../apis/api/deleteVoiceMessage';
import { transcribeVoiceMessage } from '../../apis/api/clovaSpeech';
import MainHeaderColor from '../../const/MainHeaderColor';

const handleVoiceMessageDelete = async (recordId, navigate) => {
  try {
    await deleteVoiceMessage({ recordId });
    navigate(-1);
  } catch (error) {
    console.error('음성 메시지 삭제 실패:', error);
  }
};

const DetailVoiceMessagePage = () => {
  const location = useLocation();
  const voiceMessage = location.state; // navigate로 전달된 데이터
  const { formattedDate, formattedTime } = parseLocalDateTime(voiceMessage.uploadedTime);
  const navigate = useNavigate();

  const [transcription, setTranscription] = useState('텍스트 변환 중...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranscription = async () => {
      try {
        const result = await transcribeVoiceMessage(
          voiceMessage.audioApiUrlPrefix + voiceMessage.recordFileName,
        );
        setTranscription(result.text); // 변환된 텍스트를 transcription 상태로 저장
      } catch (error) {
        setError('텍스트 변환 실패');
        console.error(error);
      }
    };

    fetchTranscription();
  }, [voiceMessage]);

  return (
    <>
      <NavBar></NavBar>
      <MainHeader
        title="음성 메시지"
        onClickLeft={() => {
          navigate(-1);
        }}
        rightText="삭제"
        onClickRight={() => handleVoiceMessageDelete(voiceMessage.recordId, navigate)}
        rightTextColor={MainHeaderColor.RED}
      ></MainHeader>
      <div className="voice-message-detail">
        <VoicePlayerBar
          profileImage={'https://picsum.photos/200/300'}
          name={voiceMessage.name}
          date={formattedDate}
          time={formattedTime}
          audioSrc={voiceMessage.audioApiUrlPrefix + voiceMessage.recordFileName}
        ></VoicePlayerBar>
        <p className="text-head">음성 메시지 내용</p>
        <pre className="text-area">{error ? error : transcription}</pre>
      </div>
    </>
  );
};

export default DetailVoiceMessagePage;
