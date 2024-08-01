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
  validNickname,
  validBirthYear,
  validBirthMonth,
  validBirthDay,
  validateEmail,
} from '../utility/accountValidation';
import { formatBirthYear, formatBirthMonth, formatBirthDay } from '../utility/inputFormatter';
import checkUsernameUnique from '../../apis/api/checkUsernameUnique';
import checkNicknameUnique from '../../apis/api/checkNicknameUnique';
import submitProtectorSignup from '../../apis/api/submitProtectorSignup';
import {
  HttpResponseError,
  NotValidRequestError,
  PasswordMismatchError,
  DuplicatedUsernameError,
  DuplicatedNicknameError,
} from '../../apis/utility/errors';

const GuardianSignUpPage = () => {
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
  const [email, setEmail] = useState({ value: '', status: 'default', description: '' });
  const [nickname, setNickname] = useState({ value: '', status: 'default', description: '' });
  const [isAllSuccess, setIsAllSuccess] = useState(false);

  useEffect(() => {
    const newDayValue = formatBirthDay(birth.year.value, birth.month.value, birth.day.value);

    setBirth((currentBirth) =>
      produce(currentBirth, (draft) => {
        draft.day.value = newDayValue;
      }),
    );
  }, [birth.year.value, birth.month.value, birth.day.value]);

  useEffect(() => {
    if (
      id.status === 'success' &&
      password.status === 'success' &&
      passwordCheck.status === 'success' &&
      name.status === 'success' &&
      birth.year.status === 'success' &&
      birth.month.status === 'success' &&
      birth.day.status === 'success' &&
      email.status === 'success' &&
      nickname.status === 'success'
    ) {
      setIsAllSuccess(true);
    } else {
      setIsAllSuccess(false);
    }
  }, [
    id.status,
    password.status,
    passwordCheck.status,
    name.status,
    birth.year.status,
    birth.month.status,
    birth.day.status,
    email.status,
    nickname.status,
  ]);

  const handleIdChange = (event) => {
    const { status, description } = validateId(event.target.value);

    setId((currentId) =>
      produce(currentId, (draft) => {
        draft.value = event.target.value;
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
        draft.value = event.target.value;
        draft.status = status;
        draft.description = description;
      }),
    );
  };

  const handleNicknameChange = (event) => {
    const { status, description } = validNickname(event.target.value);

    setNickname((currentNickname) =>
      produce(currentNickname, (draft) => {
        draft.value = event.target.value;
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

  const handleEmailChange = (event) => {
    const { status, description } = validateEmail(event.target.value);

    setEmail((currentEmail) =>
      produce(currentEmail, (draft) => {
        draft.value = event.target.value;
        draft.status = status;
        draft.description = description;
      }),
    );
  };

  const handleUsernameUniqueCheck = async () => {
    try {
      const result = await checkUsernameUnique(id.value);
      let status = 'success';
      let description = '사용 가능한 아이디입니다';

      if (!result) {
        status = 'warning';
        description = '이미 사용 중인 아이디입니다';
      }

      setId((currentId) =>
        produce(currentId, (draft) => {
          draft.status = status;
          draft.description = description;
        }),
      );
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        setId((currentId) =>
          produce(currentId, (draft) => {
            draft.status = 'warning';
            draft.description = error.errorDescriptions[0].message;
          }),
        );
      } else if (error instanceof HttpResponseError) {
        setId((currentId) =>
          produce(currentId, (draft) => {
            draft.status = 'warning';
            draft.description = error.message;
          }),
        );
      }
    }
  };

  const handleNicknameUniqueCheck = async () => {
    try {
      const result = await checkNicknameUnique(nickname.value);
      let status = 'success';
      let description = '사용 가능한 닉네임입니다';

      if (!result) {
        status = 'warning';
        description = '이미 사용 중인 닉네임입니다';
      }

      setNickname((currentId) =>
        produce(currentId, (draft) => {
          draft.status = status;
          draft.description = description;
        }),
      );
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        setNickname((currentId) =>
          produce(currentId, (draft) => {
            draft.status = 'warning';
            draft.description = error.errorDescriptions[0].message;
          }),
        );
      } else if (error instanceof HttpResponseError) {
        setNickname((currentId) =>
          produce(currentId, (draft) => {
            draft.status = 'warning';
            draft.description = error.message;
          }),
        );
      }
    }
  };

  const handleSignUp = async () => {
    try {
      await submitProtectorSignup({
        username: id.value,
        password: password.value,
        passwordCheck: passwordCheck.value,
        name: name.value,
        birthdate: `${birth.year.value}-${birth.month.value.toString().padStart(2, '0')}-${birth.day.value.toString().padStart(2, '0')}`,
        email: email.value,
        nickname: nickname.value,
      });
    } catch (error) {
      if (error instanceof DuplicatedUsernameError) {
        setId((currentId) =>
          produce(currentId, (draft) => {
            draft.status = 'warning';
            draft.description = '이미 사용 중인 아이디입니다';
          }),
        );
      }
      if (error instanceof DuplicatedNicknameError) {
        setNickname((currentId) =>
          produce(currentId, (draft) => {
            draft.status = 'warning';
            draft.description = '이미 사용 중인 닉네임입니다';
          }),
        );
      }
      if (error instanceof PasswordMismatchError) {
        setPasswordCheck((currentPasswordCheck) =>
          produce(currentPasswordCheck, (draft) => {
            draft.status = 'warning';
            draft.description = '비밀번호가 일치하지 않습니다';
          }),
        );
      }
      if (error instanceof NotValidRequestError) {
        error.errorDescriptions.forEach((description) => {
          if (description.field === 'username') {
            setId((currentId) =>
              produce(currentId, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'password') {
            setPassword((currentId) =>
              produce(currentId, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'passwordCheck') {
            setPasswordCheck((currentId) =>
              produce(currentId, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'name') {
            setName((currentId) =>
              produce(currentId, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'birthdate') {
            setBirth((currentId) =>
              produce(currentId, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'email') {
            setEmail((currentId) =>
              produce(currentId, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'nickname') {
            setNickname((currentId) =>
              produce(currentId, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
        });
      }
    }
  };

  return (
    <>
      <div className="input-container">
        <InputWrapper description="아이디" status={id.status} statusDescription={id.description}>
          <Input placeholder="아이디" onChange={handleIdChange} status={id.status} />
          <CheckButton disabled={id.status !== 'info'} onClick={handleUsernameUniqueCheck}>
            중복 확인
          </CheckButton>
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
          description="닉네임 (커뮤니티)"
          status={nickname.status}
          statusDescription={nickname.description}
        >
          <Input placeholder="닉네임" status={nickname.status} onChange={handleNicknameChange} />
          <CheckButton disabled={nickname.status !== 'info'} onClick={handleNicknameUniqueCheck}>
            중복 확인
          </CheckButton>
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
          description="이메일"
          status={email.status}
          statusDescription={email.description}
        >
          <Input
            placeholder="example@gmail.com"
            onChange={handleEmailChange}
            status={email.status}
          />
        </InputWrapper>
      </div>

      <div className="big-button-wrap">
        <BigButton disabled={!isAllSuccess} onClick={handleSignUp}>
          회원가입
        </BigButton>
      </div>
    </>
  );
};

export default GuardianSignUpPage;
