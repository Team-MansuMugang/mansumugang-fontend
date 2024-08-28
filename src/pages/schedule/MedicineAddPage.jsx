import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Slide } from 'react-toastify';
import {
  NotValidRequestError,
  ExpiredAccessTokenError,
  NotValidAccessTokenError,
} from '../../apis/utility/errors';

// Stylesheets
import './MedicineEditPage.css';
import '../../index.css';

// Components
import MainHeader from '../../components/MainHeader';
import ImageUploader from '../../components/ImageUploader';
import FilledDualInput from '../../components/FilledDualInput';
import FilledTextArea from '../../components/FilledTextArea';
import DaySelector from '../../components/DaySelector';
import FillMeridiemToggle from '../../components/FillMeridiemToggle';
import FilledTimeInput from '../../components/FilledTimeInput';
import AddedTimeItem from '../../components/AddedTimeItem';
import BigButton from '../../components/BigButton';
import CheckButton from '../../components/CheckButton';
import FilledDateInput from '../../components/FilledDateInput';
import SlidingUpPanel from '../../components/SlidingUpPanel';
import PrescriptionListContainer from '../../components/PrescriptionListContainer';

// API
import addMedicine from '../../apis/api/addMedicine';
import renewRefreshToken from '../../apis/api/renewRefreshToken';
import PrescriptionViewerContainer from '../../components/PrescriptionViewerContainer';

const MedicineAddPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  // 처방전 관련 상태
  const [isPanelOpened, setIsPanelOpened] = useState(false);
  const [isPrescriptionViewerOpened, setIsPrescriptionViewerOpened] = useState(true);
  const [selectedPrescriptionImg, setSelectedPrescriptionImg] = useState(null);

  const [medicineImage, setMedicineImage] = useState(null);
  const [medicineName, setMedicineName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [medicineDescription, setMedicineDescription] = useState('');
  const [inputMedicineIntakeTimes, setInputMedicineIntakeTimes] = useState({
    hours: '',
    minutes: '',
    meridiem: 'AM',
  });
  const [medicineIntakeTimes, setMedicineIntakeTimes] = useState(new Set());
  const [medicineIntakeDays, setMedicineIntakeDays] = useState([]);
  const [inputMedicineIntakeStopDay, setInputMedicineIntakeStopDay] = useState({
    year: '',
    month: '',
    day: '',
  });

  const handleMedicineImgAddToPrescriptionImg = async () => {
    const response = await fetch(selectedPrescriptionImg);
    const blob = await response.blob();
    const file = new File([blob], 'medicineImage.jpg', { type: blob.type });
    setMedicineImage(file);
  };

  const handlePanelOpen = () => {
    document.body.style.overflow = 'hidden'; // <body> 태그의 스크롤 방지
    setIsPanelOpened(true);
  };

  const handlePanelClose = () => {
    document.body.style.overflow = 'scroll'; // <body> 태그의 스크롤 적용
    setIsPanelOpened(false);
  };

  const handlePrescriptionViewerOpen = () => {
    setIsPrescriptionViewerOpened(true);
  };

  const handlePrescriptionViewerClose = () => {
    setIsPrescriptionViewerOpened(false);
  };

  const handlePrescriptionUpdate = (src) => {
    setSelectedPrescriptionImg(src);
  };

  const handleDrugFormSubmit = async () => {
    if (medicineName.length < 2 || medicineName.length > 20) {
      toast.warn('약 이름의 길이는 2에서 20자 사이여야 합니다', { position: 'bottom-center' });
      return;
    }

    if (hospitalName !== '' && (hospitalName.length < 2 || hospitalName.length > 20)) {
      toast.warn('병원 이름의 길이는 2에서 20자 사이여야 합니다', { position: 'bottom-center' });
      return;
    }

    if (
      medicineDescription !== '' &&
      (medicineDescription.length < 2 || medicineDescription.length > 200)
    ) {
      toast.warn('약에 대한 설명은 2에서 200자 사이여야 합니다', { position: 'bottom-center' });
      return;
    }

    if (medicineIntakeTimes.size === 0) {
      toast.warn('복용 시간을 추가해주세요', { position: 'bottom-center' });
      return;
    }

    if (medicineIntakeDays.length === 0) {
      toast.warn('복용 요일을 선택해주세요', { position: 'bottom-center' });
      return;
    }

    const { year, month, day } = inputMedicineIntakeStopDay;
    // const isValidDate = (year, month, day) => {
    //   const date = new Date(`${year}-${month}-${day}`);
    //   return (
    //     date.getFullYear() === parseInt(year) &&
    //     date.getMonth() + 1 === parseInt(month) &&
    //     date.getDate() === parseInt(day)
    //   );
    // };
    // if (isNaN(year) || isNaN(month) || isNaN(day) || !isValidDate(year, month, day)) {
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      toast.warn('유효하지 않은 날짜 형식입니다.', { position: 'bottom-center' });
      return;
    }

    try {
      // 전송할 객체 생성
      const medicineData = {
        patientId: params.patientId,
        medicineName,
        hospitalName,
        medicineDescription,
        medicineIntakeTimes: [...medicineIntakeTimes],
        medicineIntakeDays,
        medicineIntakeStopDay: `${String(inputMedicineIntakeStopDay.year).padStart(2, '0')}-${String(inputMedicineIntakeStopDay.month).padStart(2, '0')}-${String(inputMedicineIntakeStopDay.day).padStart(2, '0')}`,
      };

      // 빈 문자열인 키를 가진 항목 제거
      Object.keys(medicineData).forEach((key) => {
        if (medicineData[key] === '') {
          delete medicineData[key];
        }
      });

      // 약 추가 API 호출
      await addMedicine(medicineData, medicineImage);
      navigate(-1);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          handleDrugFormSubmit();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
    }
  };

  const handleAddTime = () => {
    let { hours, minutes, meridiem } = inputMedicineIntakeTimes;

    // 기본적인 입력값 검증
    if (isNaN(hours) || isNaN(minutes) || hours === '' || minutes === '') return;

    // 시간과 분을 정수로 변환
    hours = Number(hours);
    minutes = Number(minutes);

    // 시간과 분의 범위 검증
    if (hours < 0 || hours > 12 || minutes < 0 || minutes > 59) return;

    // 0시와 12시 처리
    if (hours === 0) {
      hours = meridiem === 'PM' ? 12 : 0;
    } else if (hours === 12) {
      hours = meridiem === 'PM' ? 12 : 0;
    } else if (meridiem === 'PM') {
      hours += 12;
    }

    // 시간과 분을 두 자리로 맞춤
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // 24시를 넘기는 시간을 24:00으로 변경
    const finalHours = hours >= 24 ? '24' : formattedHours;
    const finalMinutes = hours >= 24 ? '00' : formattedMinutes;

    const timeString = `${finalHours}:${finalMinutes}`;
    setMedicineIntakeTimes((prevTimes) => new Set(prevTimes).add(timeString));
  };

  return (
    // SlidiingUpPanel의 children props로 2가지의 컴포넌트를 전송
    <SlidingUpPanel
      isOpened={isPanelOpened}
      onOpen={handlePanelOpen}
      onClose={handlePanelClose}
      title={'함께 볼 처방전 선택'}
    >
      {/* 첫번째 컴포넌트 */}
      <div className="medicine-edit-page">
        <MainHeader title="약 등록" onClickLeft={() => navigate(-1)} />
        <PrescriptionViewerContainer
          prescriptionImg={selectedPrescriptionImg}
          isPrescriptionOpened={isPrescriptionViewerOpened}
          onOpenPanel={handlePanelOpen}
          onOpenPrescriptionViewer={handlePrescriptionViewerOpen}
          onClosePrescriptionViewer={handlePrescriptionViewerClose}
          onUpdatePrescrpitonImg={handlePrescriptionUpdate}
          onAddMedicineImgToPrescriptionImg={handleMedicineImgAddToPrescriptionImg}
        />
        <div className="contents">
          <div className="top-container">
            <ImageUploader
              type="drugs"
              onImageUpload={(image) => setMedicineImage(image)}
              init={medicineImage !== null ? URL.createObjectURL(medicineImage) : null}
            />
            <FilledDualInput
              placeholder={['약 이름', '병원 이름']}
              onInputChange={(inputIndex, value) => {
                if (inputIndex === 'input1') setMedicineName(value);
                if (inputIndex === 'input2') setHospitalName(value);
              }}
            />
          </div>
          <FilledTextArea
            placeholder="메모"
            onTextChange={(value) => setMedicineDescription(value)}
          />

          <h2>요일 반복</h2>
          <DaySelector onSelect={(days) => setMedicineIntakeDays(days)} />

          <h2>반복 종료 날짜</h2>
          <div className="date-input-container">
            <FilledDateInput
              type="years"
              onInput={(value) =>
                setInputMedicineIntakeStopDay({ ...inputMedicineIntakeStopDay, year: value })
              }
            />
            <FilledDateInput
              onInput={(value) =>
                setInputMedicineIntakeStopDay({ ...inputMedicineIntakeStopDay, month: value })
              }
              type="months"
            />
            <FilledDateInput
              onInput={(value) =>
                setInputMedicineIntakeStopDay({ ...inputMedicineIntakeStopDay, day: value })
              }
              year={inputMedicineIntakeStopDay.year}
              month={inputMedicineIntakeStopDay.month}
              type="days"
            />
          </div>

          <h2>시간</h2>
          <div className="time-input-container">
            <FillMeridiemToggle
              onChange={(value) =>
                setInputMedicineIntakeTimes({ ...inputMedicineIntakeTimes, meridiem: value })
              }
            />
            <FilledTimeInput
              type="hours"
              onInput={(value) =>
                setInputMedicineIntakeTimes({ ...inputMedicineIntakeTimes, hours: value })
              }
            />
            <FilledTimeInput
              type="minutes"
              onInput={(value) =>
                setInputMedicineIntakeTimes({ ...inputMedicineIntakeTimes, minutes: value })
              }
            />
            <CheckButton onClick={handleAddTime}>추가</CheckButton>
          </div>
          {[...medicineIntakeTimes].map((time) => {
            const [hours, minutes] = time.split(':');
            const hourInt = parseInt(hours, 10);
            const meridiem = hourInt >= 12 ? '오후' : '오전';
            const formattedHour = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;

            return (
              <AddedTimeItem
                key={time}
                id={time}
                meridiem={meridiem}
                hour={String(formattedHour)}
                minutes={minutes}
                onRemove={(id) =>
                  setMedicineIntakeTimes((prevTimes) => {
                    const newTimes = new Set(prevTimes);
                    newTimes.delete(id);
                    return newTimes;
                  })
                }
              />
            );
          })}
        </div>
        <div className="big-button-wrap">
          <BigButton onClick={handleDrugFormSubmit}>약 추가하기</BigButton>
        </div>
      </div>
      {/* 두번째 컴포넌트 */}
      <PrescriptionListContainer
        patientId={params.patientId}
        onClosePanel={handlePanelClose}
        onUpdatePrescrpitonImg={handlePrescriptionUpdate}
      />
    </SlidingUpPanel>
  );
};

export default MedicineAddPage;
