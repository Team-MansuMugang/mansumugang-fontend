import './PrescriptionViewer.css';
import CloseIcon from '../assets/svg/close-white.svg?react';
import PinchZoomImage from './PinchZoomImage';

const PrescriptionViewer = ({ prescriptionImg, onUpdatePrescrpitonImg }) => {
  return (
    <div className="prescription-viewer">
      <div className="close-button" onClick={() => onUpdatePrescrpitonImg(null)}>
        <CloseIcon />
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
