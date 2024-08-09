// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import './MainPage.css';
import SubTitle from '../../components/SubTitle';
import SmallVoiceMessageItem from '../../components/SmallVoiceMessageItem';
import RowScrollContainer from '../../components/RowScrollContainer';
import NavBar from '../../components/NavBar';
import BorderContainer from '../../components/BorderContainer';
import ScheduleListContainer from '../../components/ScheduleListContainer';
import ScheduleItem from '../../components/ScheduleItem';

const MainPage = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="main-page">
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
        <div className="schedule-container">
          <SubTitle title="일정" onMoreClick={''} />
          <div className="border-schedule-container">
            <BorderContainer>
              <ScheduleListContainer time="오전 6:00">
                <ScheduleItem status="checked" title="당뇨약" data="동국대병원"></ScheduleItem>
                <ScheduleItem status="checked" title="혈압약" data="동국대병원"></ScheduleItem>
              </ScheduleListContainer>
              <ScheduleListContainer time="오후 12:00">
                <ScheduleItem status="unchecked" title="감기약" data="동국대병원"></ScheduleItem>
              </ScheduleListContainer>
              <ScheduleListContainer time="오후 3:00시">
                <ScheduleItem
                  status="unchecked"
                  title="동국대병원"
                  data="경기 고양시 일산동구 동국로 27..."
                ></ScheduleItem>
              </ScheduleListContainer>
              <ScheduleListContainer time="오후 6:00">
                <ScheduleItem status="unchecked" title="감기약" data="동국대병원"></ScheduleItem>
              </ScheduleListContainer>
            </BorderContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
