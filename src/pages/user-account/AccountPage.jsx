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
import SubLink from '../../components/SubLink';

const AccountPage = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
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
        else console.error(error);
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
        else console.error(error);
      }
    };

    fetchAndSetMyInfo();

    fetchAndSetPatientList();
  }, []);

  return (
    <>
      <NavBar activeTab="계정"></NavBar>
      <div className="account-page">
        <img id="change-img" src="https://picsum.photos/200/300" />
        {myInfo !== null ? (
          <>
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
            {patients.map((patient) => (
              <MemberList
                profileImage={'https://picsum.photos/200/300'}
                name={patient.patientName}
                key={patient.patientId}
                showCancelButton={false}
              ></MemberList>
            ))}
            {patients.length === 0 ? '구성원을 추가해주세요' : null}
          </BorderContainer>
        </div>
        <SubLink to="/account/with-drow">회원 탈퇴하기</SubLink>
      </div>
    </>
  );
};

export default AccountPage;
