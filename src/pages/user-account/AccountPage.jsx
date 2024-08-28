import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubButton from '../../components/SubButton';
import BorderContainer from '../../components/BorderContainer';
import LinkItem from '../../components/LinkItem';
import SubTitle from '../../components/SubTitle';
import MemberList from '../../components/MemberList';
import NavBar from '../../components/NavBar';
import './AccountPage.css';
import fetchPatientList from '../../apis/api/fetchPatientList';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../../apis/utility/errors';
import fetchMyInfo from '../../apis/api/fetchMyInfo';
import UserInfoItem from '../../components/UserInfoItem';
import { getLocalDate } from '../../utility/dates';
import AccountCircleIcon from '../../assets/svg/account-circle.svg?react';
import SubLink from '../../components/SubLink';
import MainHeader from '../../components/MainHeader';
import MainHeaderColor from '../../const/MainHeaderColor';
import submitSignout from '../../apis/api/submitSignout';
import renewRefreshToken from '../../apis/api/renewRefreshToken';

const AccountPage = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(null);
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    const fetchAndSetPatientList = async () => {
      try {
        const patientList = await fetchPatientList();

        setPatients(patientList);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            fetchAndSetPatientList();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
      }
    };

    const fetchAndSetMyInfo = async () => {
      try {
        const myInfo = await fetchMyInfo();
        setMyInfo(myInfo);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            fetchAndSetMyInfo();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
      }
    };

    fetchAndSetMyInfo();

    fetchAndSetPatientList();
  }, []);

  const logoutHandler = async () => {
    try {
      submitSignout();
      navigate('/');
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          logoutHandler();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
    }
  };

  return (
    <>
      <NavBar activeTab="계정" />
      <div className="account-page">
        <MainHeader
          title=""
          isLeftButtonEnable={false}
          rightText="로그아웃"
          onClickRight={logoutHandler}
          rightTextColor={MainHeaderColor.RED}
        />
        {myInfo !== null ? (
          <>
            {myInfo.profileImageName ? (
              <img
                className="my-profile-image"
                src={`${myInfo.imageApiUrl}${myInfo.profileImageName}`}
              />
            ) : (
              <div className="my-profile-image-wrapper">
                <AccountCircleIcon />
              </div>
            )}
            <p className="name-container-name">{myInfo.name}</p>
            <p className="name-container-nickname">{myInfo.nickname}</p>
          </>
        ) : (
          <></>
        )}
        <SubButton onClick={() => navigate('/account/edit-profile')}>프로필 수정하기</SubButton>
        {myInfo !== null ? (
          <div className="fixed-page">
            <SubTitle title="내 정보" showButton={false}></SubTitle>
            <BorderContainer className="border-container">
              <UserInfoItem title={'아이디'} value={myInfo.username} />
              <UserInfoItem title={'이메일'} value={myInfo.email} />
              <UserInfoItem title={'생년월일'} value={myInfo.birthdate} />
              <UserInfoItem title={'전화번호'} value={myInfo.telephone} />
              <UserInfoItem title={'회원가입일'} value={getLocalDate(myInfo.createdAt)} />
            </BorderContainer>
          </div>
        ) : (
          <></>
        )}
        <div className="fixed-page">
          <SubTitle title="내 정보 수정" showButton={false}></SubTitle>
          <BorderContainer className="border-container">
            <LinkItem text={'생년월일 수정하기'} navigateTo={'/account/edit-birthday'}></LinkItem>
            <LinkItem text={'이메일 수정하기'} navigateTo={'/account/edit-email'}></LinkItem>
          </BorderContainer>
        </div>
        <div className="my-member">
          {/* <SubTitle title="내 구성원" buttonName="편집" linkTo={'/account/edit-member'}></SubTitle> */}
          <SubTitle title="내 구성원" showButton={false}></SubTitle>
          <BorderContainer className="border-container">
            {patients !== null &&
              patients.patients.map((patient) => (
                <MemberList
                  profileImage={
                    patient.patientProfileImageName
                      ? `${patients.imageApiUrl}${patient.patientProfileImageName}`
                      : null
                  }
                  name={patient.patientName}
                  key={patient.patientId}
                  showCancelButton={false}
                ></MemberList>
              ))}
            {patients == undefined ? '구성원을 추가해주세요' : null}
          </BorderContainer>
        </div>
        <SubLink to="/account/withdraw">보호자 탈퇴하기</SubLink>
        <SubLink to="/account/withdraw-patient">케어멤버 탈퇴하기</SubLink>
      </div>
    </>
  );
};

export default AccountPage;
