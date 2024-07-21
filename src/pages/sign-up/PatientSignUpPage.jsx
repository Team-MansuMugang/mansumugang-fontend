import React, { useState } from 'react';
import Input from '../../components/Input';
import CheckButton from '../../components/CheckButton';
import InputWrapper from '../../components/InputWrapper';
import BigButton from '../../components/BigButton';
import {
  validateId,
  validatePassword,
  validName,
  validBirthYear,
  validBirthMonth,
  validBirthDay,
} from '../utility/accountValidation';
import { formatBirthYear, formatBirthMonth, formatBirthDay } from '../utility/inputFormatter';

const PatientSignUpPage = () => {
  const [idStatus, setIdStatus] = useState('default');
  const [idStatusDescription, setIdStatusDescription] = useState('');
  const [passwordValue, setPasswordValue] = useState('default');
  const [passwordStatus, setPasswordStatus] = useState('default');
  const [passwordStatusDescription, setPasswordStatusDescription] = useState('');
  const [passwordCheckStatus, setPasswordCheckStatus] = useState('default');
  const [passwordCheckStatusDescription, setPasswordCheckStatusDescription] = useState('');
  const [nameStatus, setNameStatus] = useState('default');
  const [nameStatusDescription, setNameStatusDescription] = useState('');
  const [birthStatus, setBirthStatus] = useState('default');
  const [birthStatusDescription, setBirthStatusDescription] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthYearStatus, setBirthYearStatus] = useState('default');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthMonthStatus, setBirthMonthStatus] = useState('default');
  const [birthDay, setBirthDay] = useState('');
  const [birthDayStatus, setBirthDayStatus] = useState('default');
  const [guardianIdStatus, setGuardianIdStatus] = useState('default');
  const [guardianIdStatusDescription, setGuardianIdStatusDescription] = useState('');

  React.useEffect(() => {
    setBirthDay(formatBirthDay(birthYear, birthMonth, birthDay));
  }, [birthYear, birthMonth, birthDay]);

  const handleIdChange = (event) => {
    const { status, description } = validateId(event.target.value);
    setIdStatus(status);
    setIdStatusDescription(description);
  };

  const handlePasswordChange = (event) => {
    const { status, description } = validatePassword(event.target.value);
    setPasswordValue(event.target.value);
    setPasswordStatus(status);
    setPasswordStatusDescription(description);
  };

  const handlePasswordCheckChange = (event) => {
    if (event.target.value === '') {
      setPasswordCheckStatus('default');
      setPasswordCheckStatusDescription('');
      return;
    }
    if (passwordValue !== event.target.value) {
      setPasswordCheckStatus('warning');
      setPasswordCheckStatusDescription('비밀번호가 일치하지 않습니다');
      return;
    }

    setPasswordCheckStatus('success');
    setPasswordCheckStatusDescription('');
  };

  const handleNameChange = (event) => {
    const { status, description } = validName(event.target.value);
    setNameStatus(status);
    setNameStatusDescription(description);
  };

  const handleBirthYearChange = (event) => {
    const { status, description } = validBirthYear(event.target.value);
    setBirthStatus(status);
    setBirthYearStatus(status);
    setBirthStatusDescription(description);
  };

  const handleBirthYearInput = (event) => {
    event.target.value = formatBirthYear(event.target.value);
    setBirthYear(event.target.value);
    setBirthDay(formatBirthDay(birthYear, birthMonth, birthDay));
  };

  const handleBirthMonthChange = (event) => {
    const { status, description } = validBirthMonth(event.target.value);
    setBirthStatus(status);
    setBirthMonthStatus(status);
    setBirthStatusDescription(description);
  };

  const handleBirthMonthInput = (event) => {
    event.target.value = formatBirthMonth(event.target.value);
    setBirthMonth(event.target.value);
    setBirthDay(formatBirthDay(birthYear, birthMonth, birthDay));
  };

  const handleBirthDayChange = (event) => {
    const { status, description } = validBirthDay(event.target.value);
    setBirthStatus(status);
    setBirthDayStatus(status);
    setBirthStatusDescription(description);
  };

  const handleBirthDayInput = (event) => {
    event.target.value = formatBirthDay(birthYear, birthMonth, event.target.value);
    setBirthDay(event.target.value);
  };

  return (
    <>
      <div className="input-container">
        <InputWrapper
          description="아이디"
          status={idStatus}
          statusDescription={idStatusDescription}
        >
          <Input placeholder="아이디" onChange={handleIdChange} status={idStatus} />
          <CheckButton>중복 확인</CheckButton>
        </InputWrapper>

        <InputWrapper
          description="비밀번호"
          status={passwordStatus}
          statusDescription={passwordStatusDescription}
        >
          <Input
            placeholder="비밀번호"
            type="password"
            onChange={handlePasswordChange}
            status={passwordStatus}
          />
        </InputWrapper>

        <InputWrapper
          description="비밀번호 확인"
          status={passwordCheckStatus}
          statusDescription={passwordCheckStatusDescription}
        >
          <Input
            placeholder="비밀번호 확인"
            type="password"
            status={passwordCheckStatus}
            onChange={handlePasswordCheckChange}
          />
        </InputWrapper>

        <InputWrapper
          description="이름"
          status={nameStatus}
          statusDescription={nameStatusDescription}
        >
          <Input placeholder="홍길동" status={nameStatus} onInput={handleNameChange} />
        </InputWrapper>

        <InputWrapper
          description="생년월일"
          status={birthStatus}
          statusDescription={birthStatusDescription}
        >
          <Input
            placeholder="2000"
            status={birthYearStatus}
            value={birthYear}
            onChange={handleBirthYearChange}
            onInput={handleBirthYearInput}
          />
          <Input
            placeholder="4"
            status={birthMonthStatus}
            value={birthMonth}
            onChange={handleBirthMonthChange}
            onInput={handleBirthMonthInput}
          />
          <Input
            placeholder="27"
            status={birthDayStatus}
            value={birthDay}
            onChange={handleBirthDayChange}
            onInput={handleBirthDayInput}
          />
        </InputWrapper>

        <InputWrapper
          description="보호자 아이디"
          status={guardianIdStatus}
          statusDescription={guardianIdStatusDescription}
        >
          <Input placeholder="보호자 아이디" status={guardianIdStatus} />
          <CheckButton>확인</CheckButton>
        </InputWrapper>
      </div>

      <div className="big-button-wrap">
        <BigButton>회원가입</BigButton>
      </div>
    </>
  );
};

export default PatientSignUpPage;
