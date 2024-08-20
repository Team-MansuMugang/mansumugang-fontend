// React 및 React Router
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 외부 라이브러리
import DaumPostcode from 'react-daum-postcode';
import { toast, Slide } from 'react-toastify';

// 스타일 시트
import './HospitalEditPage.css';
import '../../index.css';

// 커스텀 컴포넌트
import MainHeader from '../../components/MainHeader';
import FilledDualInput from '../../components/FilledDualInput';
import FilledTextArea from '../../components/FilledTextArea';
import FillMeridiemToggle from '../../components/FillMeridiemToggle';
import FilledTimeInput from '../../components/FilledTimeInput';
import BigButton from '../../components/BigButton';
import FilledDateInput from '../../components/FilledDateInput';

// API
import updateHospital from '../../apis/api/updateHospital';
import renewRefreshToken from '../../apis/api/renewRefreshToken';
import hospitalDetailRetrieval from '../../apis/api/hospitalDetailRetrieval';
import deleteHospital from '../../apis/api/deleteHospital';

// 오류 처리 유틸리티
import {
  ExpiredAccessTokenError,
  NotValidAccessTokenError,
  OutOfBoundaryError,
  DuplicatedHospitalVisitingTimeError,
} from '../../apis/utility/errors';

const HospitalEditPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [hospitalDescription, setHospitalDescription] = useState('');
  const [inputHospitalVisitDate, setInputHospitalVisitDate] = useState({
    year: '',
    month: '',
    day: '',
  });
  const [inputHospitalVisitTime, setInputHospitalVisitTime] = useState({
    hours: '',
    minutes: '',
    meridiem: 'AM',
  });
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const data = await hospitalDetailRetrieval(params.hospitalId);

        const { hospitalVisitingTime } = data; // 날짜와 시간을 분리
        const [datePart, timePart] = hospitalVisitingTime.split('T'); // 날짜 부분을 연, 월, 일로 분리
        const [year, month, day] = datePart.split('-'); // 시간 부분을 시, 분으로 분리
        let [hours, minutes] = timePart.split(':'); // AM/PM 설정
        const meridiem = hours >= 12 ? 'PM' : 'AM'; // 12시간 형식으로 변환
        hours = hours % 12 || 12;

        const dateObject = { year: Number(year), month: Number(month), day: Number(day) };
        const timeObject = { hours: Number(hours), minutes: Number(minutes), meridiem };

        setHospitalName(data.hospitalName || '');
        setHospitalAddress(data.hospitalAddress || '');
        setLatitude(data.latitude || '');
        setLongitude(data.longitude || '');
        setHospitalDescription(data.hospitalDescription || '');
        setInputHospitalVisitDate(dateObject);
        setInputHospitalVisitTime(timeObject);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            fetchMedicineDetails();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
        else console.error(error);
      }
    };

    fetchHospitalDetails();
  }, [params.medicineId]);

  useEffect(() => {
    var geocoder = new kakao.maps.services.Geocoder();

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setLatitude(result[0].y);
        setLongitude(result[0].x);
      }
    };

    if (hospitalAddress) geocoder.addressSearch(hospitalAddress, callback);
  }, [hospitalAddress]);

  const handleHospitalFormSubmit = async () => {
    if (hospitalName.length < 2 || hospitalName.length > 20) {
      toast.warn('병원 이름의 길이는 2에서 20자 사이여야 합니다', { position: 'bottom-center' });
      return;
    }

    if (hospitalAddress == '') {
      toast.warn('병원 주소를 입력해주세요', { position: 'bottom-center' });
      return;
    }

    if (
      hospitalDescription !== '' &&
      (hospitalDescription.length < 2 || hospitalDescription.length > 200)
    ) {
      toast.warn('병원에 대한 설명은 2에서 200자 사이여야 합니다', { position: 'bottom-center' });
      return;
    }

    if (
      !inputHospitalVisitDate.year ||
      !inputHospitalVisitDate.month ||
      !inputHospitalVisitDate.day
    ) {
      toast.warn('방문 날짜를 입력해주세요', { position: 'bottom-center' });
      return;
    }

    if (isNaN(inputHospitalVisitTime.hours) || isNaN(inputHospitalVisitTime.minutes)) {
      toast.warn('방문 시간을 입력해주세요', { position: 'bottom-center' });
      return;
    }

    const formatDateTime = () => {
      const { year, month, day } = inputHospitalVisitDate;
      const { hours, minutes, meridiem } = inputHospitalVisitTime;
      // AM/PM 변환
      let formattedHours = parseInt(hours);
      if (meridiem === 'PM' && formattedHours !== 12) {
        formattedHours += 12;
      } else if (meridiem === 'AM' && formattedHours === 12) {
        formattedHours = 0; // 12AM은 00시로 변환
      }

      // month와 day를 두 자리 수로 만들기
      const formattedMonth = String(month).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedHoursStr = String(formattedHours).padStart(2, '0');

      // 원하는 형식으로 날짜와 시간 결합
      return `${year}-${formattedMonth}-${formattedDay}T${formattedHoursStr}:${formattedMinutes}:00`;
    };

    formatDateTime();

    try {
      // 전송할 객체 생성
      const medicineData = {
        hospitalId: params.hospitalId,
        hospitalName,
        hospitalAddress,
        latitude: Number(latitude),
        longitude: Number(longitude),
        hospitalDescription,
        hospitalVisitingTime: formatDateTime(),
        patientId: Number(params.patientId),
      };

      // 빈 문자열인 키를 가진 항목 제거
      Object.keys(medicineData).forEach((key) => {
        if (medicineData[key] === '') {
          delete medicineData[key];
        }
      });

      console.log(medicineData);

      // 약 추가 API 호출
      await updateHospital(medicineData);
      navigate('/home');
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          handleHospitalFormSubmit();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else if (error instanceof OutOfBoundaryError) {
        toast.error('대한민국 내의 주소로 입력해주세요', { position: 'bottom-center' });
      } else if (error instanceof DuplicatedHospitalVisitingTimeError) {
        toast.error('이미 존재하는 병원 방문 시간입니다', { position: 'bottom-center' });
      } else console.error(error);
    }
  };

  const handleDeleteHospital = async () => {
    try {
      await deleteHospital({ hospitalId: params.hospitalId, patientId: params.patientId });
      navigate(-1);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          handleDeleteHospital();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  const handleAddressSelection = (data) => {
    let fullAddress = data.address;
    setHospitalAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  const handleInputClick = (inputIndex) => {
    if (inputIndex === 'input2') {
      setIsPostcodeOpen(true);
    }
  };

  const handlePostcodeWrapClick = () => {
    setIsPostcodeOpen(false);
  };

  return (
    <div className="hospital-edit-page">
      <MainHeader
        title="병원 일정 추가 페이지"
        rightText="삭제"
        onClickLeft={() => navigate('/home')}
        onClickRight={handleDeleteHospital}
      />
      <div className="contents">
        <div className="top-container">
          <FilledDualInput
            placeholder={['병원 이름', '병원 주소']}
            viewOnly={[false, true]}
            onInputClick={handleInputClick}
            onInputChange={(name, value) => {
              if (name === 'input1') setHospitalName(value);
            }}
            init={[hospitalName, hospitalAddress]}
          />
        </div>
        <FilledTextArea
          placeholder="메모"
          onTextChange={(value) => setHospitalDescription(value)}
          init={hospitalDescription}
        />
        <h2>병원 방문일</h2>
        <div className="date-input-container">
          <FilledDateInput
            type="years"
            onInput={(value) =>
              setInputHospitalVisitDate({ ...inputHospitalVisitDate, year: value })
            }
            init={inputHospitalVisitDate.year}
          />
          <FilledDateInput
            type="months"
            onInput={(value) =>
              setInputHospitalVisitDate({ ...inputHospitalVisitDate, month: value })
            }
            init={inputHospitalVisitDate.month}
          />
          <FilledDateInput
            type="days"
            onInput={(value) =>
              setInputHospitalVisitDate({ ...inputHospitalVisitDate, day: value })
            }
            init={inputHospitalVisitDate.day}
          />
        </div>

        <h2>시간</h2>
        <div className="time-input-container">
          <FillMeridiemToggle
            onChange={(value) =>
              setInputHospitalVisitTime({ ...inputHospitalVisitTime, meridiem: value })
            }
            init={inputHospitalVisitTime.meridiem}
          />
          <FilledTimeInput
            type="hours"
            onInput={(value) =>
              setInputHospitalVisitTime({ ...inputHospitalVisitTime, hours: value })
            }
            init={inputHospitalVisitTime.hours}
          />
          <FilledTimeInput
            type="minutes"
            onInput={(value) =>
              setInputHospitalVisitTime({ ...inputHospitalVisitTime, minutes: value })
            }
            init={inputHospitalVisitTime.minutes}
          />
        </div>
      </div>
      <div className="big-button-wrap">
        <BigButton onClick={handleHospitalFormSubmit}>병원 일정 추가하기</BigButton>
      </div>
      {isPostcodeOpen && (
        <div className="daum-postcode-wrap" onClick={handlePostcodeWrapClick}>
          <DaumPostcode className="daum-postcode" autoClose onComplete={handleAddressSelection} />
        </div>
      )}
    </div>
  );
};

export default HospitalEditPage;
