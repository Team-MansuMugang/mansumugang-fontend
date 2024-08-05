// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import SubTitle from '../../components/SubTitle';
import SmallVoiceMessageItem from '../../components/SmallVoiceMessageItem';

const MainPage = () => {
  return (
    <body>
      <h2>홈</h2>
      <SubTitle description="음성 메세지" onMoreClick={''} />
      <SmallVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        responseTime={10}
      ></SmallVoiceMessageItem>
      <SmallVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        responseTime={10}
      ></SmallVoiceMessageItem>
      <SmallVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        responseTime={10}
      ></SmallVoiceMessageItem>
      <SmallVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        responseTime={10}
      ></SmallVoiceMessageItem>
    </body>
  );
};

export default MainPage;
