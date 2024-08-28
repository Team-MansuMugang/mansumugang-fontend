// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import { useNavigate } from 'react-router-dom';
import './DetailVoiceMessagePage.css';
import MainHeader from '../../components/MainHeader';
import NavBar from '../../components/NavBar';
import VoicePlayerBar from '../../components/VoicePlayerBar';
import { useLocation } from 'react-router-dom';
import deleteVoiceMessage from '../../apis/api/deleteVoiceMessage';
import MainHeaderColor from '../../const/MainHeaderColor';

const handleVoiceMessageDelete = async (recordId, navigate) => {
  try {
    await deleteVoiceMessage({ recordId });
    navigate(-1);
  } catch (error) {}
};

const DetailVoiceMessagePage = () => {
  const location = useLocation();
  const { imageApiUrlPrefix, audioApiUrlPrefix, voiceMessage } = location.state; // navigate로 전달된 데이터

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
          name={voiceMessage.name}
          uploadedTime={voiceMessage.uploadedTime}
          audioSrc={audioApiUrlPrefix + voiceMessage.recordFileName}
          profileImage={
            voiceMessage.profileImageName !== null
              ? imageApiUrlPrefix + voiceMessage.profileImageName
              : null
          }
        ></VoicePlayerBar>
        <p className="text-head">음성 메세지 내용</p>
        <pre className="text-area">{voiceMessage.recordContent}</pre>
      </div>
    </>
  );
};

export default DetailVoiceMessagePage;
