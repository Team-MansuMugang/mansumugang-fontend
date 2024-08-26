import { useState, useEffect } from 'react';
import { produce } from 'immer';
import { useNavigate } from 'react-router-dom';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import './PasswordChangePage.css';
import { validatePassword } from '../utility/accountValidation';

const PasswordChangePage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState({ value: '', status: 'default', description: '' });
  const [passwordCheck, setPasswordCheck] = useState({
    value: '',
    status: 'default',
    description: '',
  });
  const [isAllSuccess, setIsAllSuccess] = useState(false);

  useEffect(() => {
    if (password.status === 'success' && passwordCheck.status === 'success') {
      setIsAllSuccess(true);
    } else {
      setIsAllSuccess(false);
    }
  }, [password.status, passwordCheck.status]);

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

  const handleSignUp = async () => {
    try {
      // await submitProtectorSignup({
      //   password: password.value,
      //   passwordCheck: passwordCheck.value,
      // });

      try {
        // toast.info('회원가입이 완료되었습니다. 환영합니다!', { position: 'top-center' });
        // navigate('/home');
      } catch (error) {
        toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요', {
          position: 'bottom-center',
        });
      }
    } catch (error) {
      toast.warn('입력된 정보들을 확인해주세요', { position: 'top-center' });

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
        });
      }
    }
  };

  return (
    <>
      <MainHeader title="비밀번호 수정하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="password-change">
        <InputWrapper
          description="비밀번호 수정"
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
          description="비밀번호 수정 확인"
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
        <BigButton disabled={!isAllSuccess} onClick={handleSignUp}>
          수정하기
        </BigButton>
      </div>
    </>
  );
};

export default PasswordChangePage;
