import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import { toast, Slide } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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
  validGuardianId,
} from '../utility/accountValidation';
import { formatBirthYear, formatBirthMonth, formatBirthDay } from '../utility/inputFormatter';
import checkUsernameUnique from '../../apis/api/checkUsernameUnique';
import checkProtectorUsername from '../../apis/api/checkProtectorUsername';
import submitPatientSignup from '../../apis/api/submitPatientSignup';
import {
  HttpResponseError,
  NotValidRequestError,
  PasswordMismatchError,
  DuplicatedUsernameError,
  UserNotFoundError,
} from '../../apis/utility/errors';

const PatientSignUpPage = () => {
  const navigate = useNavigate();
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
      guardianId.status === 'success'
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
    guardianId.status,
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

  const handleBirthYearChange = (event) => {
    const { status, description } = validBirthYear(event.target.value);

    setBirth((currentBirth) =>
      produce(currentBirth, (draft) => {
        draft.value = event.target.value;
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
        draft.value = event.target.value;
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

  const handleGuardianIdChange = (event) => {
    const { status, description } = validGuardianId(event.target.value);

    setGuardianId((currentGuardianId) =>
      produce(currentGuardianId, (draft) => {
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

  const handleProtectorUsernameCheck = async () => {
    try {
      const result = await checkProtectorUsername(guardianId.value);
      let status = 'success';
      let description = '이 계정의 보호자가 될 수 있습니다';

      if (!result) {
        status = 'warning';
        description = '해당 아이디는 케어 멤버의 아이디입니다';
      }

      setGuardianId((currentGuardianId) =>
        produce(currentGuardianId, (draft) => {
          draft.status = status;
          draft.description = description;
        }),
      );
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        setGuardianId((currentGuardianId) =>
          produce(currentGuardianId, (draft) => {
            draft.status = 'warning';
            draft.description = '존재하지 않는 아이디입니다.';
          }),
        );
      } else if (error instanceof HttpResponseError) {
        setId((currentGuardianId) =>
          produce(currentGuardianId, (draft) => {
            draft.status = 'warning';
            draft.description = error.message;
          }),
        );
      }
    }
  };

  const handleSignUp = async () => {
    try {
      await submitPatientSignup({
        username: id.value,
        password: password.value,
        passwordCheck: passwordCheck.value,
        name: name.value,
        birthdate: `${birth.year.value}-${birth.month.value.toString().padStart(2, '0')}-${birth.day.value.toString().padStart(2, '0')}`,
        protectorUsername: guardianId.value,
      });

      toast.info(
        <div>
          회원가입이 완료되었습니다!
          <br />
          케이 멤버님은 앱을 통해서 로그인하실 수 있습니다
          <br />
          플레이스토어에서 '만수무강'을 검색해주세요
        </div>,
        {
          position: 'bottom-center',
          autoClose: false,
        },
      );
      navigate('/');
    } catch (error) {
      toast.warn('입력된 정보들을 확인해주세요', { position: 'top-center' });

      if (error instanceof DuplicatedUsernameError) {
        setId((currentId) =>
          produce(currentId, (draft) => {
            draft.status = 'warning';
            draft.description = '이미 사용 중인 아이디입니다';
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
      if (error instanceof UserNotFoundError) {
        setGuardianId((currentGuardianId) =>
          produce(currentGuardianId, (draft) => {
            draft.status = 'warning';
            draft.description = '해당 ID는 케어 멤버이거나 존재하지 않습니다.';
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
            setPassword((currentPassword) =>
              produce(currentPassword, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'passwordCheck') {
            setPasswordCheck((currentPasswordCheck) =>
              produce(currentPasswordCheck, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'name') {
            setName((currentName) =>
              produce(currentName, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'birthdate') {
            setBirth((currentBirth) =>
              produce(currentBirth, (draft) => {
                draft.status = 'warning';
                draft.description = description.message;
              }),
            );
          }
          if (description.field === 'protectorUsername') {
            setGuardianId((currentGuardianId) =>
              produce(currentGuardianId, (draft) => {
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
          <Input
            placeholder="보호자 아이디"
            status={guardianId.status}
            onChange={handleGuardianIdChange}
          />
          <CheckButton
            disabled={guardianId.status !== 'info'}
            onClick={handleProtectorUsernameCheck}
          >
            확인
          </CheckButton>
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

export default PatientSignUpPage;
