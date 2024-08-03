// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import MoreContainer from '../../components/MoreContainer';
import MainRecode from '../../components/MainRecode';

const MainPage = () => {
  return (
    <body>
      <h2>홈</h2>
      <MoreContainer description="음성 메세지" onMoreClick={''}>
        <MainRecode
          profileImage={'https://picsum.photos/200/300'}
          name={'김정숙'}
          responseTime={10}
        ></MainRecode>
        <MainRecode
          profileImage={'https://picsum.photos/200/300'}
          name={'김정숙'}
          responseTime={10}
        ></MainRecode>
        <MainRecode
          profileImage={'https://picsum.photos/200/300'}
          name={'김정숙'}
          responseTime={10}
        ></MainRecode>
        <MainRecode
          profileImage={'https://picsum.photos/200/300'}
          name={'김정숙'}
          responseTime={10}
        ></MainRecode>
      </MoreContainer>
    </body>
  );
};

export default MainPage;
