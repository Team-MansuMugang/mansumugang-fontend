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
import LinkItem from '../../components/UserInfoItem';
import NameContainer from '../../components/NameContainer';
import MedicineDetailCard from '../../components/MedicineDetailCard';
import HospitalDetailCard from '../../components/HospitalDetailCard';
import FilledTimeInput from '../../components/FilledTimeInput';
import AddedTimeItem from '../../components/AddedTimeItem';
import FillMeridiemToggle from '../../components/FillMeridiemToggle';
import NotificationItem from '../../components/NotificationItem';
import CategoryHeader from '../../components/CategoryHeader';
import AddedSearchItem from '../../components/AddedSearchItem';
import PostItemContainer from '../../components/PostItemContainer';
import PostCommentItem from '../../components/PostCommentItem';
import PostReCommentItem from '../../components/PostReCommentItem';
import CommunityLargeItem from '../../components/CommunityLargeItem';
import CommunityTag from '../../components/CommunityTag';
import PostPictureUpload from '../../components/PostPictureUpload';
import PostLargeItem from '../../components/PostLargeItem';
import SecessionBigButton from '../../components/SecessionBigButton';
import WithDrowTab from '../../components/WithDrowTab';

const TestPage = () => {
  return (
    <>
      <FloatingActionButton />
      <WithDrowTab></WithDrowTab>
      <CategoryHeader rightText="작성" title="카테고리"></CategoryHeader>
      <AddedSearchItem search={'치매'}></AddedSearchItem>
      <AddedSearchItem search={'당뇨'}></AddedSearchItem>
      <AddedSearchItem search={'고혈압'}></AddedSearchItem>
      <PostItemContainer commentCount={'3'} heartCount={'3'}></PostItemContainer>
      <PostCommentItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        data={
          '안녕하세요!! 저는 이러한 저러한 병이 있습니다 이런한 저런한 병을 고치기 위해 많은 약을 먹었습니다 하지만 제 이러한 저러한 병은 났지 않았습니다. 여러분이 이러한 것들을 알려주세요!!'
        }
      ></PostCommentItem>
      <PostCommentItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        data={'안녕하세요!! '}
      ></PostCommentItem>
      <PostReCommentItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        data={
          '안녕하세요!! 저는 이러한 저러한 병이 있습니다 이런한 저런한 병을 고치기 위해 많은 약을 먹었습니다 하지만 제 이러한 저러한 병은 났지 않았습니다. 여러분이 이러한 것들을 알려주세요!!'
        }
      ></PostReCommentItem>
      <CommunityLargeItem
        title={'치매 어떻게 케어하시나요?'}
        summary={
          '다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ'
        }
        time={'25분'}
        children={'치매'}
        count={'7'}
      ></CommunityLargeItem>
      <CommunityLargeItem
        title={'치매 어떻게 케어하시나요?'}
        summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
        time={'25분'}
        children={'기타 질병'}
        count={'7'}
      ></CommunityLargeItem>
      <CommunityLargeItem
        title={'치매 어떻게 케어하시나요?'}
        summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
        time={'25분'}
        children={'고혈압'}
        count={'7'}
      ></CommunityLargeItem>
      <CommunityTag disabled={true} children={'인기글'}></CommunityTag>
      <CommunityTag disabled={false} children={'정보'}></CommunityTag>
      <PostPictureUpload></PostPictureUpload>
      <PostLargeItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        date={'2024. 04. 27 '}
        views={'100'}
      ></PostLargeItem>
      <MainHeader title="테스트 페이지" rightText="hoho" />
      <NameContainer name={'이병헌'} nickname={'귀여미'}></NameContainer>
      <NotificationItem
        title={'김정숙님의 병원 방문'}
        body={'김정숙님이 오후 3시alsdkflkdsafjklasdjfalkflkjfdsakljfadskfa;l에 '}
        timeAgo={new Date()}
      ></NotificationItem>
      <NotificationItem
        title={'김정숙님의 병원 방문'}
        body={`김정숙님이 as;ldfkjasd;lfja;sdlkjf;dlsakjf;lkjas;jf;kljasdlkjf
          오후 3시alsdkflkdsafjklasdjfalkflkjfdsakljfadskfa;l에 `}
        timeAgo={new Date()}
      ></NotificationItem>
      <NotificationItem
        title={'김정숙님의 병원 방문'}
        body={'김정숙님이 오후 3시alsdkflkdsafjklasdjfalkflkjfdsakljfadskfa;l에 '}
        timeAgo={new Date()}
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
      <SecessionBigButton disabled={false}>탈퇴하기</SecessionBigButton>
      <SubLink to="/">회원가입</SubLink>
      <ToggleSwitch labels={['보호자', '케어 멤버']} active={0} />
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
        time={'2024-08-04T13:49:27.459797'}
      ></SmallVoiceMessageItem>
      <RowScrollContainer>
        <SmallVoiceMessageItem
          profileImage={'https://picsum.photos/200/300'}
          name={'가나다라마바사아자차카타파하'}
          time={'2024-08-04T13:49:27.459797'}
        ></SmallVoiceMessageItem>

        <SmallVoiceMessageItem
          profileImage={'https://picsum.photos/200/300'}
          name={'abcdefghijk'}
          time={'2024-08-04T13:49:27.459797'}
        ></SmallVoiceMessageItem>

        <SmallVoiceMessageItem
          profileImage={'https://picsum.photos/200/300'}
          name={'abcdefghijk'}
          time={'2024-08-04T13:49:27.459797'}
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
        dateTime={'2024-08-04T13:49:27.459797'}
      ></LargeVoiceMessageItem>
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙lkasdjflkadsjlkfajs;sdflkj;sadlkfj;asldkjfsdklfajlkdsjflk'}
        dateTime={'2024-08-04T13:49:27.459797'}
      ></LargeVoiceMessageItem>
      <LargeVoiceMessageItem
        profileImage={'https://picsum.photos/200/300'}
        name={'김정숙'}
        dateTime={'2024-08-04T13:49:27.459797'}
      ></LargeVoiceMessageItem>
      <VoicePlayerBar
        profileImage={'https://picsum.photos/200/300'}
        name={'유호진'}
        dateTime={'2024-08-04T13:49:27.459797'}
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
