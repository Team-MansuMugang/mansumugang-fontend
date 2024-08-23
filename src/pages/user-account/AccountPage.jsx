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

const AccountPage = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const name = '이병헌';
  const nickname = '귀여미';

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

    fetchAndSetPatientList();
  }, []);

  return (
    <>
      <NavBar activeTab="계정"></NavBar>
      <div className="account-page">
        <img id="change-img" src="https://picsum.photos/200/300" />
        <p className="name-container-name">{name}</p>
        <p className="name-container-nickname">{nickname}</p>
        <SubButton onClick={() => navigate('/account/edit-profile')}>프로필 수정하기</SubButton>
        <div className="fixed-page">
          <SubTitle title="내 개정" showButton={false}></SubTitle>
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
      </div>
    </>
  );
};

export default AccountPage;
