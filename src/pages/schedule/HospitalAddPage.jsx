import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import './HospitalEditPage.css';
import '../../index.css';
import MainHeader from '../../components/MainHeader';
import FilledDualInput from '../../components/FilledDualInput';
import FilledTextArea from '../../components/FilledTextArea';
import FillMeridiemToggle from '../../components/FillMeridiemToggle';
import FilledTimeInput from '../../components/FilledTimeInput';
import BigButton from '../../components/BigButton';
import FilledDateInput from '../../components/FilledDateInput';

const HospitalAddPage = () => {
  const navigate = useNavigate();

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
    var geocoder = new kakao.maps.services.Geocoder();

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setLatitude(result[0].x);
        setLongitude(result[0].y);
      }
    };

    if (hospitalAddress) geocoder.addressSearch(hospitalAddress, callback);
  }, [hospitalAddress]);

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
      <MainHeader title="병원 일정 추가 페이지" onClickLeft={() => navigate(-1)} />
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
        />
        <h2>병원 방문일</h2>
        <div className="date-input-container">
          <FilledDateInput
            type="years"
            onInput={(value) =>
              setInputHospitalVisitDate({ ...inputHospitalVisitDate, year: value })
            }
          />
          <FilledDateInput
            type="months"
            onInput={(value) =>
              setInputHospitalVisitDate({ ...inputHospitalVisitDate, month: value })
            }
          />
          <FilledDateInput
            type="days"
            onInput={(value) =>
              setInputHospitalVisitDate({ ...inputHospitalVisitDate, day: value })
            }
          />
        </div>

        <h2>시간</h2>
        <div className="time-input-container">
          <FillMeridiemToggle
            onChange={(value) =>
              setInputHospitalVisitTime({ ...inputHospitalVisitTime, meridiem: value })
            }
          />
          <FilledTimeInput
            type="hours"
            onInput={(value) =>
              setInputHospitalVisitTime({ ...inputHospitalVisitTime, hours: value })
            }
          />
          <FilledTimeInput
            type="minutes"
            onInput={(value) =>
              setInputHospitalVisitTime({ ...inputHospitalVisitTime, minutes: value })
            }
          />
        </div>
      </div>
      <div className="big-button-wrap">
        <BigButton
          onClick={() => {
            console.log(
              hospitalName,
              hospitalAddress,
              hospitalDescription,
              inputHospitalVisitDate,
              inputHospitalVisitTime,
              latitude,
              longitude,
            );
          }}
        >
          병원 일정 추가하기
        </BigButton>
      </div>
      {isPostcodeOpen && (
        <div className="daum-postcode-wrap" onClick={handlePostcodeWrapClick}>
          <DaumPostcode className="daum-postcode" autoClose onComplete={handleAddressSelection} />
        </div>
      )}
    </div>
  );
};

export default HospitalAddPage;
