// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import BigButton from '../../components/BigButton';
import CheckButton from '../../components/CheckButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import SubLink from '../../components/SubLink';
import ToggleSwitch from '../../components/ToggleSwitch';
import SubButton from '../../components/SubButton';
import BorderContainer from '../../components/BorderContainer';
import CancelButton from '../../components/CancelButton';
import NavBar from '../../components/NavBar';
import TagButton from '../../components/TagButton';
import SmallVoiceMessageItem from '../../components/SmallVoiceMessageItem';
import SubTitle from '../../components/SubTitle';
import LargeVoiceMessageItem from '../../components/LargeVoiceMessageItem';
import MainHeader from '../../components/MainHeader';
import RowScrollContainer from '../../components/RowScrollContainer';
import VoicePlayerBar from '../../components/VoicePlayerBar';
import HospitalInput from '../../components/HospitalInput';
import MemoInput from '../../components/MemoInput';
import HealthDetail from '../../components/HealthDetail';
import ScheduleListContainer from '../../components/ScheduleListContainer';
import ScheduleItem from '../../components/ScheduleItem';

const TestPage = () => {
  return (
    <>
      <MainHeader title="테스트 페이지" rightText="hoho" />
      <InputWrapper
        description="아이디"
        status="warning"
        statusDescription="! 중복된 아이디 입니다."
      >
        <Input placeholder="아이디" status="warning" />
        <CheckButton>중복 확인</CheckButton>
      </InputWrapper>
      <InputWrapper description="비밀번호">
        <Input placeholder="비밀번호" type="password" />
      </InputWrapper>
      <InputWrapper description="생년월일">
        <Input placeholder="2000" />
        <Input placeholder="4" />
        <Input placeholder="27" />
      </InputWrapper>
      <BigButton disabled={false}>회원가입</BigButton>
      <SubLink to="/">회원가입</SubLink>
      <ToggleSwitch labels={['보호자', '케어 맴버']} active={0} />
      <SubButton disabled={false}>프로필 수정하기</SubButton>
      <SubTitle title="회원가입" showButton={false} />
      <BorderContainer description="내 계정">
        <SubLink to="/">회원가입</SubLink>
        <br></br>
        <SubLink to="/">회원가입</SubLink>
        <br></br>
        <SubLink to="/">회원가입</SubLink>
      </BorderContainer>
      <CancelButton>삭제</CancelButton>
      <NavBar></NavBar>
      <TagButton disabled={true}>전체</TagButton>
      <TagButton disabled={false}>인기글</TagButton>
      <SubTitle title="일정" />
      <SmallVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        time={'10분전'}
      ></SmallVoiceMessageItem>

      <RowScrollContainer>
        <SmallVoiceMessageItem
          profileImage={'https://picsum.photos/200/300'}
          name={'가나다라마바사아자차카타파하'}
          time={'30분 전'}
        ></SmallVoiceMessageItem>

        <SmallVoiceMessageItem
          profileImage={'https://picsum.photos/200/300'}
          name={'abcdefghijk'}
          time={'1일 전'}
        ></SmallVoiceMessageItem>

        <SmallVoiceMessageItem
          profileImage={'https://picsum.photos/200/300'}
          name={'abcdefghijk'}
          time={'1일 전'}
        ></SmallVoiceMessageItem>

        <SmallVoiceMessageItem
          profileImage={'https://picsum.photos/200/300'}
          name={'abcdefghijk'}
          time={'1일 전'}
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
      </RowScrollContainer>
      <SubTitle />
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        date={'오늘'}
        time={'10분전'}
      ></LargeVoiceMessageItem>
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙lkasdjflkadsjlkfajs;sdflkj;sadlkfj;asldkjfsdklfajlkdsjflk'}
        date={'오늘'}
        time={'10분전'}
      ></LargeVoiceMessageItem>
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        date={'오늘'}
        time={'오전 9시 19분'}
      ></LargeVoiceMessageItem>
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        date={'오늘'}
        time={'10분전'}
      ></LargeVoiceMessageItem>
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        date={'오늘'}
        time={'10분전'}
      ></LargeVoiceMessageItem>
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        date={'오늘'}
        time={'10분전'}
      ></LargeVoiceMessageItem>
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        date={'오늘'}
        time={'10분전'}
      ></LargeVoiceMessageItem>
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        date={'오늘'}
        time={'10분전'}
      ></LargeVoiceMessageItem>
      <VoicePlayerBar
        profileImage={'https://picsum.photos/200/300'}
        name={'유호진'}
        date={'오늘'}
        time={'10분전'}
      ></VoicePlayerBar>
      <HospitalInput></HospitalInput>
      <MemoInput></MemoInput>
      <HealthDetail
        title={'고혈압약'}
        data={
          '고혈압약은 꼭 밥을 드시고  식후 30분에 드세요!! 가나다다 마나 사마낭 ㄴ아ㅏㄴㅇㄴ안아ㅏㅇ ㅏㅇㅇ나안안아'
        }
      ></HealthDetail>
      <ScheduleListContainer time="오후 6시">
        <ScheduleItem status="checked" title="당뇨약" data="동국대병원"></ScheduleItem>
        <ScheduleItem status="unchecked" title="혈압약" data="동국대병원"></ScheduleItem>
      </ScheduleListContainer>
    </>
  );
};

export default TestPage;
