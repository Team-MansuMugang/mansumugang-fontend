import { useState, useEffect } from 'react';
import { produce } from 'immer';
import { useNavigate } from 'react-router-dom';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import { validateEmail } from '../utility/accountValidation';
import './ChangeEmail.css';

const ChangeEmail = () => {
  const [email, setEmail] = useState({ value: '', status: 'default', description: '' });
  const [isAllSuccess, setIsAllSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email.status === 'success') {
      setIsAllSuccess(true);
    } else {
      setIsAllSuccess(false);
    }
  }, [email.status]);

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

  const handleUpload = async () => {
    try {
      // await submitProtectorSignup({
      //   email: email.value,
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

      if (error instanceof NotValidRequestError) {
        error.errorDescriptions.forEach((description) => {
          if (description.field === 'email') {
            setEmail((currentId) =>
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
      <MainHeader title="이메일 수정하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="change-email">
        <InputWrapper
          description="이메일 수정"
          status={email.status}
          statusDescription={email.description}
        >
          <Input
            placeholder="example@gmail.com"
            onChange={handleEmailChange}
            status={email.status}
          />
        </InputWrapper>
        <BigButton disabled={!isAllSuccess} onClick={handleUpload}>
          수정하기
        </BigButton>
      </div>
    </>
  );
};

export default ChangeEmail;
