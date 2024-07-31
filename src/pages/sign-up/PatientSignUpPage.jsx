import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
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
  const [id, setId] = useState({ value: '', status: 'default', description: '' });
  const [password, setPassword] = useState({ value: '', status: 'default', description: '' });
  const [passwordCheck, setPasswordCheck] = useState({
    value: '',
    status: 'default',
    description: '',
  });
  const [name, setName] = useState({ value: '', status: 'default', description: '' });
  const [birth, setBirth] = useState({
    status: 'default',
    description: '',
    year: { value: '', status: 'default' },
    month: { value: '', status: 'default' },
    day: { value: '', status: 'default' },
  });
  const [guardianId, setGuardianId] = useState({ value: '', status: 'default', description: '' });

  useEffect(() => {
    const newDayValue = formatBirthDay(birth.year.value, birth.month.value, birth.day.value);

    setBirth((currentBirth) =>
      produce(currentBirth, (draft) => {
        draft.day.value = newDayValue;
      }),
    );
  }, [birth.year.value, birth.month.value, birth.day.value]);

  const handleIdChange = (event) => {
    const { status, description } = validateId(event.target.value);

    setId((currentId) =>
      produce(currentId, (draft) => {
        draft.status = status;
        draft.description = description;
      }),
    );
  };

  const handlePasswordChange = (event) => {
    const { status, description } = validatePassword(event.target.value);

    setPassword((currentPassword) =>
      produce(currentPassword, (draft) => {
        draft.value = event.target.value;
        draft.status = status;
        draft.description = description;
      }),
    );

    // 2차 비밀번호 확인
    let checkStatus = 'success';
    let checkDescription = '';

    if (passwordCheck.value === '') {
      checkStatus = 'default';
      checkDescription = '';
    } else if (passwordCheck.value !== event.target.value) {
      checkStatus = 'warning';
      checkDescription = '비밀번호가 일치하지 않습니다';
    }

    setPasswordCheck((currentPasswordCheck) =>
      produce(currentPasswordCheck, (draft) => {
        draft.status = checkStatus;
        draft.description = checkDescription;
      }),
    );
  };

  const handlePasswordCheckChange = (event) => {
    let status = 'success';
    let description = '';

    if (event.target.value === '') {
      status = 'default';
      description = '';
    } else if (event.target.value !== password.value) {
      status = 'warning';
      description = '비밀번호가 일치하지 않습니다';
    }

    setPasswordCheck((currentPasswordCheck) =>
      produce(currentPasswordCheck, (draft) => {
        draft.value = event.target.value;
        draft.status = status;
        draft.description = description;
      }),
    );
  };

  const handleNameChange = (event) => {
    const { status, description } = validName(event.target.value);

    setName((currentName) =>
      produce(currentName, (draft) => {
        draft.status = status;
        draft.description = description;
      }),
    );
  };

  const handleBirthYearChange = (event) => {
    const { status, description } = validBirthYear(event.target.value);

    setBirth((currentBirth) =>
      produce(currentBirth, (draft) => {
        draft.year.status = status;
        draft.status = status;
        draft.description = description;
      }),
    );
  };

  const handleBirthYearInput = (event) => {
    event.target.value = formatBirthYear(event.target.value);

    setBirth((currentBirth) =>
      produce(currentBirth, (draft) => {
        draft.year.value = event.target.value;
        draft.day.value = formatBirthDay(birth.year.value, birth.month.value, birth.day.value);
      }),
    );
  };

  const handleBirthMonthChange = (event) => {
    const { status, description } = validBirthMonth(event.target.value);

    setBirth((currentBirth) =>
      produce(currentBirth, (draft) => {
        draft.month.status = status;
        draft.status = status;
        draft.description = description;
      }),
    );
  };

  const handleBirthMonthInput = (event) => {
    event.target.value = formatBirthMonth(event.target.value);

    setBirth((currentBirth) =>
      produce(currentBirth, (draft) => {
        draft.month.value = event.target.value;
        draft.day.value = formatBirthDay(birth.year.value, birth.month.value, birth.day.value);
      }),
    );
  };

  const handleBirthDayChange = (event) => {
    const { status, description } = validBirthDay(event.target.value);

    setBirth((currentBirth) =>
      produce(currentBirth, (draft) => {
        draft.day.status = status;
        draft.status = status;
        draft.description = description;
      }),
    );
  };

  const handleBirthDayInput = (event) => {
    event.target.value = formatBirthDay(birth.year, birth.month, event.target.value);

    setBirth((currentBirth) =>
      produce(currentBirth, (draft) => {
        draft.day.value = event.target.value;
      }),
    );
  };

  return (
    <>
      <div className="input-container">
        <InputWrapper description="아이디" status={id.status} statusDescription={id.description}>
          <Input placeholder="아이디" onChange={handleIdChange} status={id.status} />
          <CheckButton>중복 확인</CheckButton>
        </InputWrapper>

        <InputWrapper
          description="비밀번호"
          status={password.status}
          statusDescription={password.description}
        >
          <Input
            placeholder="비밀번호"
            type="password"
            onChange={handlePasswordChange}
            status={password.status}
          />
        </InputWrapper>

        <InputWrapper
          description="비밀번호 확인"
          status={passwordCheck.status}
          statusDescription={passwordCheck.description}
        >
          <Input
            placeholder="비밀번호 확인"
            type="password"
            status={passwordCheck.status}
            onChange={handlePasswordCheckChange}
          />
        </InputWrapper>

        <InputWrapper description="이름" status={name.status} statusDescription={name.description}>
          <Input placeholder="홍길동" status={name.status} onInput={handleNameChange} />
        </InputWrapper>

        <InputWrapper
          description="생년월일"
          status={birth.status}
          statusDescription={birth.description}
        >
          <Input
            placeholder="2000"
            status={birth.year.status}
            value={birth.year.value}
            onChange={handleBirthYearChange}
            onInput={handleBirthYearInput}
          />
          <Input
            placeholder="4"
            status={birth.month.status}
            value={birth.month.value}
            onChange={handleBirthMonthChange}
            onInput={handleBirthMonthInput}
          />
          <Input
            placeholder="27"
            status={birth.day.status}
            value={birth.day.value}
            onChange={handleBirthDayChange}
            onInput={handleBirthDayInput}
          />
        </InputWrapper>

        <InputWrapper
          description="보호자 아이디"
          status={guardianId.status}
          statusDescription={guardianId.description}
        >
          <Input placeholder="보호자 아이디" status={guardianId.status} />
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
