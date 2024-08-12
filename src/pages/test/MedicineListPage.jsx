import React, { useState } from 'react';
import medicineInfoRetrieval from '../../apis/api/medicineInfoRetrieval';
import deleteMedicine from '../../apis/api/deleteMedicine';
import addMedicine from '../../apis/api/addMedicine';
import {
  HttpResponseError,
  NotValidRequestError,
  UserNotFoundError,
  AccessDeniedError,
  NoSuchMedicineError,
} from '../../apis/utility/errors';

const MedicineInfo = () => {
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [error, setError] = useState(null);
  const [newMedicine, setNewMedicine] = useState({
    medicineName: '',
    hospitalName: '',
    medicineDescription: '',
    medicineIntakeTimes: '',
    medicineIntakeDays: '',
    medicineIntakeStopDay: '',
  });

  const handleFetchMedicineInfo = async () => {
    try {
      const params = { patientId };
      if (date) {
        params.date = date;
      }
      const info = await medicineInfoRetrieval(params);
      setMedicineInfo(info);
      setError(null);
    } catch (err) {
      handleErrors(err);
      setMedicineInfo(null);
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    try {
      await deleteMedicine({ patientId, medicineId });
      handleFetchMedicineInfo(); // 삭제 후 최신 정보 다시 가져오기
    } catch (err) {
      handleErrors(err);
    }
  };

  const handleAddMedicine = async () => {
    try {
      const params = {
        patientId,
        ...newMedicine,
        medicineIntakeTimes: newMedicine.medicineIntakeTimes.split(',').map((time) => time.trim()),
        medicineIntakeDays: newMedicine.medicineIntakeDays
          .split(',')
          .map((day) => day.trim().toUpperCase()),
      };
      await addMedicine(params);
      handleFetchMedicineInfo(); // 추가 후 최신 정보 다시 가져오기
    } catch (err) {
      handleErrors(err);
    }
  };

  const handleErrors = (err) => {
    if (err instanceof NotValidRequestError) {
      setError('Invalid request: ' + err.message);
    } else if (err instanceof UserNotFoundError) {
      setError('User not found.');
    } else if (err instanceof AccessDeniedError) {
      setError('Access denied.');
    } else if (err instanceof NoSuchMedicineError) {
      setError('No such medicine.');
    } else if (err instanceof HttpResponseError) {
      setError('HTTP error: ' + err.message);
    } else {
      setError('Unknown error: ' + err.message);
    }
  };

  const renderMedicineInfo = () => (
    <div>
      <h2>Medicine Information:</h2>
      <p>
        <strong>Date:</strong> {medicineInfo.date}
      </p>
      {medicineInfo.medicineSchedules.map((schedule, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>Time: {schedule.time}</h3>
          {schedule.medicines.map((medicine, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            >
              <p>
                <strong>Medicine ID:</strong> {medicine.medicineId}
              </p>
              <p>
                <strong>Medicine Name:</strong> {medicine.medicineName}
              </p>
              {medicine.medicineImageName && (
                <img
                  src={`${medicineInfo.imageApiUrlPrefix}${medicine.medicineImageName}`}
                  alt={medicine.medicineName}
                  style={{ width: '100px', height: '100px' }}
                />
              )}
              <p>
                <strong>Hospital Name:</strong> {medicine.hospitalName}
              </p>
              <p>
                <strong>Description:</strong> {medicine.medicineDescription}
              </p>
              <p>
                <strong>Status:</strong> {medicine.status}
              </p>
              <button
                onClick={() => handleDeleteMedicine(medicine.medicineId)}
                style={{ marginTop: '10px' }}
              >
                Delete Medicine
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderError = () => (
    <div style={{ color: 'red' }}>
      <h2>Error:</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Medicine Information Retrieval</h1>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Patient ID:
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Date (YYYY-MM-DD):
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <button onClick={handleFetchMedicineInfo} style={{ marginTop: '10px' }}>
          Fetch Medicine Info
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Add New Medicine</h2>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Medicine Name:
          <input
            type="text"
            value={newMedicine.medicineName}
            onChange={(e) => setNewMedicine({ ...newMedicine, medicineName: e.target.value })}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Hospital Name:
          <input
            type="text"
            value={newMedicine.hospitalName}
            onChange={(e) => setNewMedicine({ ...newMedicine, hospitalName: e.target.value })}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Medicine Description:
          <input
            type="text"
            value={newMedicine.medicineDescription}
            onChange={(e) =>
              setNewMedicine({
                ...newMedicine,
                medicineDescription: e.target.value,
              })
            }
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Medicine Intake Times (comma separated):
          <input
            type="text"
            value={newMedicine.medicineIntakeTimes}
            onChange={(e) =>
              setNewMedicine({
                ...newMedicine,
                medicineIntakeTimes: e.target.value,
              })
            }
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Medicine Intake Days (comma separated):
          <input
            type="text"
            value={newMedicine.medicineIntakeDays}
            onChange={(e) =>
              setNewMedicine({
                ...newMedicine,
                medicineIntakeDays: e.target.value,
              })
            }
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Medicine Intake Stop Day (YYYY-MM-DD):
          <input
            type="text"
            value={newMedicine.medicineIntakeStopDay}
            onChange={(e) =>
              setNewMedicine({
                ...newMedicine,
                medicineIntakeStopDay: e.target.value,
              })
            }
            style={{ marginLeft: '10px' }}
          />
        </label>
        <button onClick={handleAddMedicine} style={{ marginTop: '10px' }}>
          Add Medicine
        </button>
      </div>
      {medicineInfo ? renderMedicineInfo() : error && renderError()}
    </div>
  );
};

export default MedicineInfo;
