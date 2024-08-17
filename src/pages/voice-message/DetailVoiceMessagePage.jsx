// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import { useNavigate } from 'react-router-dom';
import './DetailVoiceMessagePage.css';
import MainHeader from '../../components/MainHeader';
import NavBar from '../../components/NavBar';
import VoicePlayerBar from '../../components/VoicePlayerBar';

const DetailVoiceMessagePage = ({ textData }) => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar></NavBar>
      <MainHeader
        title="음성 메세지"
        onClickLeft={() => {
          navigate(-1);
        }}
      ></MainHeader>
      <div className="voice-message-detail">
        <VoicePlayerBar
          profileImage={'https://picsum.photos/200/300'}
          name={'유호진'}
          date={'오늘'}
          time={'10분전'}
        ></VoicePlayerBar>
        <p className="text-head">음성 메세지 내용</p>
        <pre className="text-area">
          안녕하세요, 사랑하는 가족을 돌보는 보호자 여러분. 저는 (닉네임)라고 합니다. 저 역시 2년째
          어머니를 돌보고 있는 보호자입니다. 보호자의 역할을 하면서 많은 어려움과 도전을 마주했지만,
          그 속에서 소중한 배움과 깨달음을 얻기도 했습니다. 먼저, 우리 모두가 가장 중요한 점은
          자신을 돌보는 일이라는 것을 말씀드리고 싶어요. 사랑하는 사람을 돌보는 일은 많은 에너지와
          시간을 필요로 하지만, 그만큼 나 자신을 돌보는 것도 중요합니다.
        </pre>
      </div>
    </>
  );
};

export default DetailVoiceMessagePage;
