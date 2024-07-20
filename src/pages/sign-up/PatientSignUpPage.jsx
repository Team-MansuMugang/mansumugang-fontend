import React, { useState } from 'react';
import Input from '../../components/Input';
import CheckButton from '../../components/CheckButton';
import InputWrapper from '../../components/InputWrapper';
import BigButton from '../../components/BigButton';
import {
  validateId,
  validatePassword,
  validName,
  validPhoneNumber,
} from '../utility/accountValidation';
import { formatPhoneNumber } from '../utility/inputFormatter';

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberStatus, setPhoneNumberStatus] = useState('default');
  const [phoneNumberStatusDescription, setPhoneNumberStatusDescription] = useState('');

  const handlePhoneInput = (event) => {
    setPhoneNumber(formatPhoneNumber(event.target.value));
  };

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

  const handlePhoneNumberChange = (event) => {
    const { status, description } = validPhoneNumber(event.target.value);
    setPhoneNumberStatus(status);
    setPhoneNumberStatusDescription(description);
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
          description="휴대전화"
          status={phoneNumberStatus}
          statusDescription={phoneNumberStatusDescription}
        >
          <Input
            placeholder="010 1234 5678"
            type="tel"
            value={phoneNumber}
            status={phoneNumberStatus}
            onInput={handlePhoneInput}
            onChange={handlePhoneNumberChange}
          />
        </InputWrapper>
      </div>

      <div className="big-button-wrap">
        <BigButton>회원가입</BigButton>
      </div>
    </>
  );
};

export default PatientSignUpPage;
