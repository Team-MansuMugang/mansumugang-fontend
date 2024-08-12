import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import SubButton from '../../components/SubButton';
import './ChangeProfile.css';

const ChangeProfile = () => {
  return (
    <>
      <MainHeader title="프로필 수정하기"></MainHeader>
      <div className="profile-change">
        <img id="change-img" src="https://picsum.photos/200/300" />
        <SubButton className="sub-button">사진 수정하기</SubButton>
        <InputWrapper description="이름">
          <Input placeholder="이병헌" />
        </InputWrapper>
        <InputWrapper description="닉네임">
          <Input placeholder="귀여미" />
        </InputWrapper>
        <div className="big-button-fixed">
          <BigButton>수정하기</BigButton>
        </div>
      </div>
    </>
  );
};

export default ChangeProfile;
