// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import SubTitle from '../../components/SubTitle';
import SmallVoiceMessageItem from '../../components/SmallVoiceMessageItem';
import RowScrollContainer from '../../components/RowScrollContainer';

const MainPage = () => {
  return (
    <body>
      <h2>홈</h2>
      <SubTitle title="음성 메세지" onMoreClick={''} />
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
          name={'김정숙'}
          time={''}
        ></SmallVoiceMessageItem>
        <SmallVoiceMessageItem
          profileImage={'https://picsum.photos/200/300'}
          name={'김정숙'}
          time={''}
        ></SmallVoiceMessageItem>
      </RowScrollContainer>
    </body>
  );
};

export default MainPage;
