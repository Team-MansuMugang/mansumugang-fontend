import './PrescriptionListContainer.css';

import fetchPrescriptionList from '../apis/api/fetchPrescriptionList';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../apis/utility/errors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseLocalDateTime } from '../utility/dates';

const PrescriptionListContainer = ({ patientId, onClosePanel, onUpdatePrescrpitonImg }) => {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState(null);

  useEffect(() => {
    const fetchAndSetPrescriptionList = async () => {
      try {
        const prescriptionList = await fetchPrescriptionList(patientId);
        setPrescriptions(prescriptionList);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            fetchAndSetPatientList();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
        else console.error(error);
      }
    };

    fetchAndSetPrescriptionList();
  }, []);

  const handlePrescrpitonImgClick = (src) => {
    onUpdatePrescrpitonImg(src);
    onClosePanel();
  };

  return (
    <>
      {prescriptions !== null && prescriptions.medicinePrescriptions.length > 0 ? (
        <div className="prescription-list-container">
          {prescriptions.medicinePrescriptions.map((prescription, index) => {
            const prescriptionImgSrc = `${prescriptions.imageApiUrlPrefix}${prescription.medicinePrescriptionImageName}`;
            const { formattedDate, formattedTime } = parseLocalDateTime(prescription.createdAt);
            return (
              <div
                key={index}
                className="prescription-item"
                onClick={() => handlePrescrpitonImgClick(prescriptionImgSrc)}
              >
                <img className="prescription-img" src={prescriptionImgSrc} />
                <span className="date">{`${formattedDate}`}</span>
                <span className="date">{`${formattedTime}`}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-prescription-container">
          <div className="no-prescription-message">환자분께서 보낸 처방전이 없어요</div>
        </div>
      )}
    </>
  );
};

export default PrescriptionListContainer;
