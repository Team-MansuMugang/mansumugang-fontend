import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { produce } from 'immer';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import { formatBirthYear, formatBirthMonth, formatBirthDay } from '../utility/inputFormatter';
import { validBirthYear, validBirthMonth, validBirthDay } from '../utility/accountValidation';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../../apis/utility/errors';
import updateMyInfo from '../../apis/api/updateMyInfo';
import fetchMyInfo from '../../apis/api/fetchMyInfo';
import { toast } from 'react-toastify';

import './ChangeBirthdayPage.css';

const ChangeBirthdayPage = () => {
  const [originalUserInfo, setOriginalUserInfo] = useState(null);
  const [birth, setBirth] = useState({
    status: 'default',
    description: '',
    year: { value: '', status: 'default' },
    month: { value: '', status: 'default' },
    day: { value: '', status: 'default' },
  });
  const [isAllSuccess, setIsAllSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      birth.year.status === 'success' &&
      birth.month.status === 'success' &&
      birth.day.status === 'success'
    ) {
      setIsAllSuccess(true);
    } else {
      setIsAllSuccess(false);
    }
  }, [birth.year.status, birth.month.status, birth.day.status]);

  useEffect(() => {
    const fetchAndSetMyInfo = async () => {
      try {
        const myInfo = await fetchMyInfo();
        setOriginalUserInfo(myInfo);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            fetchAndSetMyInfo();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
        else console.error(error);
      }
    };

    fetchAndSetMyInfo();
  }, []);

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

  const handleUpload = async () => {
    if (originalUserInfo === null) {
      toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요', {
        position: 'bottom-center',
      });
      return;
    }

    const requestBody = {
      userId: originalUserInfo.protectorId,
      name: originalUserInfo.name,
      birthdate: `${birth.year.value}-${birth.month.value.toString().padStart(2, '0')}-${birth.day.value.toString().padStart(2, '0')}`,
      telephone: originalUserInfo.telephone,
      email: originalUserInfo.email,
      nickname: originalUserInfo.nickname,
    };

    try {
      try {
        await updateMyInfo(requestBody);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            fetchAndSetMyInfo();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
        else console.error(error);
      }

      try {
        navigate(-1);
      } catch (error) {
        toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요', {
          position: 'bottom-center',
        });
      }
    } catch (error) {
      toast.warn('입력된 정보들을 확인해주세요', { position: 'top-center' });
    }
  };

  return (
    <>
      <MainHeader title="생년월일 수정하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="change-birthday">
        <InputWrapper
          description="생년월일 수정"
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
        <div className="big-button-wrap">
          <BigButton disabled={!isAllSuccess} onClick={handleUpload}>
            수정하기
          </BigButton>
        </div>
      </div>
    </>
  );
};

export default ChangeBirthdayPage;
