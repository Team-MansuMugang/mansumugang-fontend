// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import './MainPage.css';
import SubTitle from '../../components/SubTitle';
import SmallVoiceMessageItem from '../../components/SmallVoiceMessageItem';
import RowScrollContainer from '../../components/RowScrollContainer';
import NavBar from '../../components/NavBar';

const MainPage = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="main-page">
        <h2>홈</h2>
        <SubTitle title="음성 메세지" onMoreClick={'/voice-message-page'} />
        <RowScrollContainer>
          <SmallVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'가나다라마바사아자차카타파하'}
            time={'30분 전'}
          ></SmallVoiceMessageItem>

          <SmallVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'김정숙'}
            time={'1일 전'}
          ></SmallVoiceMessageItem>

          <SmallVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'에디슨'}
            time={'3일전'}
          ></SmallVoiceMessageItem>
          <SmallVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'밥말리'}
            time={'4일전'}
          ></SmallVoiceMessageItem>
          <SmallVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'밥존슨'}
            time={'5일전'}
          ></SmallVoiceMessageItem>
        </RowScrollContainer>
      </div>
    </>
  );
};

export default MainPage;
