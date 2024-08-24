import './PrescriptionViewer.css';
import CloseBigIcon from '../assets/svg/close-big.svg?react';
import PinchZoomImage from './PinchZoomImage';
import DrugsBigIcon from '../assets/svg/drugs-big.svg?react';

const PrescriptionViewer = ({
  prescriptionImg,
  onUpdatePrescrpitonImg,
  onAddMedicineImgToPrescriptionImg,
}) => {
  return (
    <div className="prescription-viewer">
      <div className="prescription-header">
        <div className="medicine-img-button" onClick={() => onAddMedicineImgToPrescriptionImg()}>
          <DrugsBigIcon />
        </div>
        <div className="close-button" onClick={() => onUpdatePrescrpitonImg(null)}>
          <CloseBigIcon />
        </div>
      </div>
      <PinchZoomImage
        className={'prescription-img'}
        height="256px"
        src={prescriptionImg}
        alt={'처방전 이미지'}
      />
    </div>
  );
};

export default PrescriptionViewer;
