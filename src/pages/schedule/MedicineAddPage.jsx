import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NotValidRequestError } from '../../apis/utility/errors';

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

// API
import addMedicine from '../../apis/api/addMedicine';

const MedicineAddPage = () => {
  const navigate = useNavigate();
  const params = useParams();
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

  const handleDrugFormSubmit = async () => {
    try {
      console.log({
        medicineImage,
        patientId: params.patientId,
        medicineName,
        hospitalName,
        medicineDescription,
        medicineIntakeTimes: [...medicineIntakeTimes],
        medicineIntakeDays,
        medicineIntakeStopDay: `${String(inputMedicineIntakeStopDay.year).padStart(2, '0')}-${String(inputMedicineIntakeStopDay.month).padStart(2, '0')}-${String(inputMedicineIntakeStopDay.day).padStart(2, '0')}`,
      });
      // await addMedicine({
      //   patientId: params.patientId,
      //   medicineName: '',
      //   hospitalName: '',
      //   medicineDescription: '',
      //   medicineIntakeTimes: [],
      //   medicineIntakeDays: medicineIntakeDays,
      //   medicineIntakeStopDay: '',
      // });
      // navigate(-1);
    } catch (error) {
      if (error instanceof NotValidRequestError) {
        console.log(error.errorDescriptions);
      }
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
    <div className="medicine-edit-page">
      <MainHeader title="약 추가 페이지" onClickLeft={() => navigate(-1)} />
      <div className="contents">
        <div className="top-container">
          <ImageUploader type="drugs" onImageUpload={(image) => setMedicineImage(image)} />
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
  );
};

export default MedicineAddPage;
