import { useNavigate } from 'react-router-dom';
import './MemberEditPage.css';
import MainHeader from '../../components/MainHeader';
import MemberList from '../../components/MemberList';

const MemberEditPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader
        title="내 구성원"
        rightText="추가"
        onClickLeft={() => navigate(-1)}
        onClickRight={() => navigate('/account/add-member')}
      />
      <div className="member-edit">
        <MemberList
          profileImage={'https://picsum.photos/200/300'}
          name={'김땡땡'}
          showCancelButton={true}
        ></MemberList>
        <MemberList
          profileImage={'https://picsum.photos/200/300'}
          name={'이땡땡'}
          showCancelButton={true}
        ></MemberList>
        <MemberList
          profileImage={'https://picsum.photos/200/300'}
          name={'이땡땡'}
          showCancelButton={true}
        ></MemberList>
      </div>
    </>
  );
};

export default MemberEditPage;
