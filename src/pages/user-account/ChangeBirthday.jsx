import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import './ChangeBirthday.css';

const ChangeBirthday = () => {
  return (
    <>
      <MainHeader title="생년월일 변경하기"></MainHeader>
      <div className="change-birthday">
        <InputWrapper description="생년월일 변경">
          <Input placeholder="2000" />
          <Input placeholder="4" />
          <Input placeholder="27" />
        </InputWrapper>
        <div className="big-button-wrap">
          <BigButton>수정하기</BigButton>
        </div>
      </div>
    </>
  );
};

export default ChangeBirthday;
