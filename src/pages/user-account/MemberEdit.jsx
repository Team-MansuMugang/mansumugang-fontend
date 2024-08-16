import './MemberEdit.css';
import MainHeader from '../../components/MainHeader';
import MemberList from '../../components/MemberList';

const MemberEdit = () => {
  return (
    <>
      <MainHeader title="내 구성원" rightText="추가"></MainHeader>
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

export default MemberEdit;
