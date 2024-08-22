import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import SubButton from '../../components/SubButton';
import CheckButton from '../../components/CheckButton';
import { produce } from 'immer';
import './ChangeProfilePage.css';
import { validName, validNickname } from '../utility/accountValidation';
import checkNicknameUnique from '../../apis/api/checkNicknameUnique';

const ChangeProfilePage = () => {
  const [name, setName] = useState({ value: '', status: 'default', description: '' });
  const [nickname, setNickname] = useState({ value: '', status: 'default', description: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (name.status === 'success' && nickname.status === 'success') ||
      (name.status === 'success' && nickname.status === 'default') ||
      (name.status === 'default' && nickname.status === 'success')
    ) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [name.status, nickname.status]);

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

  const handleUpload = async () => {
    try {
      // await submitProtectorSignup({
      //   name: name.value,
      //   nickname: nickname.value,
      // });

      try {
        // toast.info('회원가입이 완료되었습니다. 환영합니다!', { position: 'top-center' });
        navigate(-1);
      } catch (error) {
        toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요', {
          position: 'bottom-center',
        });
      }
    } catch (error) {
      toast.warn('입력된 정보들을 확인해주세요', { position: 'top-center' });

      if (error instanceof DuplicatedNicknameError) {
        setNickname((currentId) =>
          produce(currentId, (draft) => {
            draft.status = 'warning';
            draft.description = '이미 사용 중인 닉네임입니다';
          }),
        );
      }
      if (error instanceof NotValidRequestError) {
        error.errorDescriptions.forEach((description) => {
          if (description.field === 'name') {
            setName((currentId) =>
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

  return (
    <>
      <MainHeader title="프로필 수정하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="profile-change">
        <img id="change-img" src="https://picsum.photos/200/300" />
        {/* <SubButton className="sub-button">사진 수정하기</SubButton> */}
        <InputWrapper
          description="이름 수정"
          status={name.status}
          statusDescription={name.description}
        >
          <Input placeholder="홍길동" status={name.status} onInput={handleNameChange} />
        </InputWrapper>
        <InputWrapper
          description="닉네임 (커뮤니티) 수정"
          status={nickname.status}
          statusDescription={nickname.description}
        >
          <Input placeholder="닉네임" status={nickname.status} onChange={handleNicknameChange} />
          <CheckButton disabled={nickname.status !== 'info'} onClick={handleNicknameUniqueCheck}>
            중복 확인
          </CheckButton>
        </InputWrapper>
        <div className="big-button-wrap">
          <BigButton disabled={!isSuccess} onClick={handleUpload}>
            수정하기
          </BigButton>
        </div>
      </div>
    </>
  );
};

export default ChangeProfilePage;
