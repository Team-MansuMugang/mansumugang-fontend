// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import './VoiceMessagePage.css';
import LargeVoiceMessageItem from '../../components/LargeVoiceMessageItem';
import MainHeader from '../../components/MainHeader';
import NavBar from '../../components/NavBar';
import TagButton from '../../components/TagButton';

const VoiceMessagePage = () => {
  return (
    <>
      <NavBar></NavBar>
      <MainHeader title="음성 메세지"></MainHeader>
      <div className="voice-message-control">
        <div className="tag-item">
          <TagButton disabled={true}>전체</TagButton>
          <TagButton disabled={false}>김정숙</TagButton>
          <TagButton disabled={false}>이봉숙</TagButton>
        </div>

        <div className="Large-voice-Message">
          <LargeVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'김정숙'}
            date={'오늘'}
            time={'방금'}
          ></LargeVoiceMessageItem>
          <LargeVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'이봉수'}
            date={'오늘'}
            time={'10분 전'}
          ></LargeVoiceMessageItem>
          <LargeVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'이봉수'}
            date={'오늘'}
            time={'1시간 전'}
          ></LargeVoiceMessageItem>
          <LargeVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'김정숙'}
            date={'어제'}
            time={'오전 9시 19분'}
          ></LargeVoiceMessageItem>
        </div>
      </div>
    </>
  );
};

export default VoiceMessagePage;
