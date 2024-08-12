// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import './MainPage.css';
import SubTitle from '../../components/SubTitle';
import SmallVoiceMessageItem from '../../components/SmallVoiceMessageItem';
import RowScrollContainer from '../../components/RowScrollContainer';
import NavBar from '../../components/NavBar';
import BorderContainer from '../../components/BorderContainer';
import ScheduleListContainer from '../../components/ScheduleListContainer';
import ScheduleItem from '../../components/ScheduleItem';
import ItemSelector from '../../components/ItemSelector';

const MainPage = () => {
  return (
    <>
      <div className="main-page">
<<<<<<< HEAD
        <h2>홈</h2>
        <SubTitle title="음성 메세지" onMoreClick={'/voice-message-page'} />
=======
        <h1>홈</h1>

        <SubTitle title="음성 메세지" />

>>>>>>> 3139c9d25225f89d489671cca5bcdf7566e90188
        <RowScrollContainer>
          <SmallVoiceMessageItem
            profileImage={'https://picsum.photos/200/300'}
            name={'가나다라마바사아자차카타파하'}
            time={'30분 전'}
          />
        </RowScrollContainer>

        <hr />

        <ItemSelector />

        <SubTitle title="일정" />
        <BorderContainer>
          <ScheduleListContainer time="오전 6:00">
            <ScheduleItem status="checked" title="당뇨약" data="동국대병원" />
            <ScheduleItem status="checked" title="혈압약" data="동국대병원" />
          </ScheduleListContainer>

          <ScheduleListContainer time="오후 12:00">
            <ScheduleItem status="unchecked" title="감기약" data="동국대병원" />
          </ScheduleListContainer>

          <ScheduleListContainer time="오후 3:00">
            <ScheduleItem
              status="unchecked"
              title="동국대병원"
              data="경기 고양시 일산동구 동국로 27..."
            />
          </ScheduleListContainer>

          <ScheduleListContainer time="오후 6:00">
            <ScheduleItem status="unchecked" title="감기약" data="동국대병원" />
          </ScheduleListContainer>
        </BorderContainer>

        <SubTitle title="현재 위치" showButton={false} />
      </div>
      <NavBar />
    </>
  );
};

export default MainPage;
