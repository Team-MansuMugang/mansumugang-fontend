import SubButton from '../../components/SubButton';
import BorderContainer from '../../components/BorderContainer';
import LinkItem from '../../components/LinkItem';
import SubTitle from '../../components/SubTitle';
import MemberList from '../../components/MemberList';
import NavBar from '../../components/NavBar';
import './AccountPage.css';

const AccountPage = () => {
  const name = '이병헌';
  const nickname = '귀여미';
  return (
    <>
      <NavBar></NavBar>
      <div className="account-page">
        <img id="change-img" src="https://picsum.photos/200/300" />
        <p className="name-container-name">{name}</p>
        <p className="name-container-nickname">{nickname}</p>
        <SubButton>프로필 수정하기</SubButton>
        <div className="fixed-page">
          <SubTitle title="내 개정" showButton={false}></SubTitle>
          <BorderContainer className="border-container">
            <LinkItem text={'생년월일 수정하기'} navigateTo={'/change-birthday'}></LinkItem>
            <LinkItem text={'이메일 수정하기'} navigateTo={'/change-email'}></LinkItem>
            <LinkItem text={'비밀번호 수정하기'} navigateTo={'/password-change'}></LinkItem>
          </BorderContainer>
        </div>
        <div className="my-member">
          <SubTitle title="내 구성원" buttonName="편집"></SubTitle>
          <BorderContainer className="border-container">
            <MemberList
              profileImage={'https://picsum.photos/200/300'}
              name={'김땡땡'}
              showCancelButton={false}
            ></MemberList>
            <MemberList
              profileImage={'https://picsum.photos/200/300'}
              name={'이땡땡'}
              showCancelButton={false}
            ></MemberList>
            <MemberList
              profileImage={'https://picsum.photos/200/300'}
              name={'이땡땡'}
              showCancelButton={false}
            ></MemberList>
          </BorderContainer>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
