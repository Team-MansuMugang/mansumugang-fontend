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
import ItemSelector from '../../components/ItemSelector';
import FloatingActionButton from '../../components/FloatingActionButton';
import DaySelector from '../../components/DaySelector';
import Calendar from '../../components/Calendar';
import ImageUploader from '../../components/ImageUploader';
import VoicePlayerBar from '../../components/VoicePlayerBar';
import FilledDualInput from '../../components/FilledDualInput';
import FilledTextArea from '../../components/FilledTextArea';
import FilledDualInfo from '../../components/FilledDualInfo';
import ScheduleListContainer from '../../components/ScheduleListContainer';
import ScheduleItem from '../../components/ScheduleItem';
import MemberList from '../../components/MemberList';
import LinkItem from '../../components/LinkItem';
import NameContainer from '../../components/NameContainer';
import MedicineDetailCard from '../../components/MedicineDetailCard';
import HospitalDetailCard from '../../components/HospitalDetailCard';
import FilledTimeInput from '../../components/FilledTimeInput';
import AddedTimeItem from '../../components/AddedTimeItem';
import FillMeridiemToggle from '../../components/FillMeridiemToggle';
import NotificationItem from '../../components/NotifcationItem';
import SmallButton from '../../components/SmallButton';
import CommentCount from '../../components/CommentCount';
import CommunityLargeItem from '../../components/CommunityLargeItem';
import CommunityTag from '../../components/CommunityTag';
import PostLargeItem from '../../components/PostLargeItem';
import PostPictureUpload from '../../components/PostPictureUpload';

const TestPage = () => {
  return (
    <>
      <FloatingActionButton />
      <MainHeader title="테스트 페이지" rightText="hoho" />
      <CommunityLargeItem
        title={'치매 어떻게 케어하시나요?'}
        summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
        time={'25분'}
      ></CommunityLargeItem>
      <CommunityLargeItem
        title={'치매 어떻게 케어하시나요?'}
        summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
        time={'25분'}
      ></CommunityLargeItem>
      <CommunityLargeItem
        title={'치매 어떻게 케어하시나요?'}
        summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
        time={'25분'}
      ></CommunityLargeItem>
      <CommunityTag disabled={true} children={'인기글'}></CommunityTag>
      <CommunityTag disabled={false} children={'정보·치매'}></CommunityTag>
      <SmallButton children={'질문'}></SmallButton>
      <SmallButton children={'정보'}></SmallButton>
      <CommentCount children={'7'}></CommentCount>
      <PostPictureUpload></PostPictureUpload>
      <PostLargeItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        date={'2024. 04. 27 '}
        views={'100'}
      ></PostLargeItem>
      <NameContainer name={'이병헌'} nickname={'귀여미'}></NameContainer>
      <NotificationItem
        profileImage={'https://picsum.photos/200/300'}
        notificationMessage={'김정숙님이 오후 3시에 병원을 방문하지 않았습니다. 확인해보세요'}
        timeAgo={'15분 전'}
      ></NotificationItem>
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
        <LinkItem text={'생년월일 수정하기'} navigateTo={'/change-birthday'}></LinkItem>
        <LinkItem text={'이메일 수정하기'} navigateTo={'/change-email'}></LinkItem>
        <LinkItem text={'비밀번호 수정하기'} navigateTo={'/password-change'}></LinkItem>
      </BorderContainer>
      <CancelButton></CancelButton>
      <ImageUploader />
      <NavBar></NavBar>
      <TagButton disabled={true}>전체</TagButton>
      <TagButton disabled={false}>인기글</TagButton>
      <ItemSelector />
      <Calendar
        dateStatus={[
          { date: '2024-08-26', status: 'NO_TAKEN' },
          { date: '2024-08-27', status: 'TAKEN' },
        ]}
      />
      <DaySelector />
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
      <BorderContainer>
        <MemberList
          profileImage={'https://picsum.photos/200/300'}
          name={'김정숙'}
          showCancelButton={true}
        ></MemberList>
        <MemberList
          profileImage={'https://picsum.photos/200/300'}
          name={'김정숙'}
          showCancelButton={false}
        ></MemberList>
      </BorderContainer>

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
      <VoicePlayerBar
        profileImage={'https://picsum.photos/200/300'}
        name={'유호진'}
        date={'오늘'}
        time={'10분전'}
      ></VoicePlayerBar>
      <FilledDualInput />
      <FilledTextArea />
      <FilledDualInfo
        title={'고혈압약'}
        data={`고혈압약은 꼭 밥을 드시고  식후 30분에 드세요!! 가나다다 마나 사마낭 ㄴ아ㅏㄴㅇㄴ안아ㅏㅇ ㅏㅇㅇ나안안아
          고혈압약은 꼭 밥을 드시고  식후 30분에 드세요!! 가나다다 마나 사마낭 ㄴ아ㅏㄴㅇㄴ안아ㅏㅇ ㅏㅇㅇ나안안아
          고혈압약은 꼭 밥을 드시고  식후 30분에 드세요!! 가나다다 마나 사마낭 ㄴ아ㅏㄴㅇㄴ안아ㅏㅇ ㅏㅇㅇ나안안아
          고혈압약은 꼭 밥을 드시고  식후 30분에 드세요!! 가나다다 마나 사마낭 ㄴ아ㅏㄴㅇㄴ안아ㅏㅇ ㅏㅇㅇ나안안아`}
      ></FilledDualInfo>
      <FilledTimeInput />
      <FillMeridiemToggle />
      <AddedTimeItem meridiem="오후" hour="5" minutes="36" />
      <MedicineDetailCard
        medicineName="hihi"
        hospitalName="hihi"
        medicineDescription="test"
        medicineIntakeTime="1:20"
        medicineIntakeDays={['Monday', 'Wednesday', 'Thursday']}
        status="checked"
      />
      <HospitalDetailCard
        hospitalName="동국대병원"
        hospitalAddress="경기 고양시 일산동구 동국로 27"
        hospitalDescription="65번 버스 타고 6정거장 이동하면 돼요! 알죠???"
        hospitalVisitingTime="오전 6:00"
        hospitalVisitingDate="9월 27일"
      />
      <ScheduleListContainer time="오후 6시">
        <ScheduleItem status="checked" title="당뇨약" data="동국대병원"></ScheduleItem>
        <ScheduleItem status="unchecked" title="혈압약" data="동국대병원"></ScheduleItem>
      </ScheduleListContainer>
    </>
  );
};

export default TestPage;
