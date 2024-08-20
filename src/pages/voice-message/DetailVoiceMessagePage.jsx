// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import { useNavigate } from 'react-router-dom';
import './DetailVoiceMessagePage.css';
import MainHeader from '../../components/MainHeader';
import NavBar from '../../components/NavBar';
import VoicePlayerBar from '../../components/VoicePlayerBar';
import { useLocation } from 'react-router-dom';
import { parseLocalDateTime } from '../../utility/dates';
import deleteVoiceMessage from '../../apis/api/deleteVoiceMessage';
import MainHeaderColor from '../../const/MainHeaderColor';

const handleVoiceMessageDelete = async (recordId, navigate) => {
  try {
    await deleteVoiceMessage({ recordId });
    navigate(-1);
  } catch (error) {
    console.error('Failed to delete voice messsage:', error);
  }
};

const DetailVoiceMessagePage = () => {
  const location = useLocation();
  const voiceMessage = location.state; // navigate로 전달된 데이터
  const { formattedDate, formattedTime } = parseLocalDateTime(voiceMessage.uploadedTime);

  const navigate = useNavigate();

  return (
    <>
      <NavBar></NavBar>
      <MainHeader
        title="음성 메세지"
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
        <p className="text-head">음성 메세지 내용</p>
        <pre className="text-area">추후 출시할 기능입니다.</pre>
      </div>
    </>
  );
};

export default DetailVoiceMessagePage;
