import { useNavigate } from 'react-router-dom';
import PrescriptionSelectionButton from './PrescriptionSelectionButton';
import './PrescriptionSelectionViewer.css';
import CloseBigIcon from '../assets/svg/close-big.svg?react';

const PrescriptionSelectionViewer = ({ onOpenPanel, onClosePrescriptionViewer }) => {
  const navigate = useNavigate();

  return (
    <div className="prescription-selection-viewer">
      <div className="close-button" onClick={() => onClosePrescriptionViewer(null)}>
        <CloseBigIcon />
      </div>
      <div className="viewer-description">
        {'환자가 보낸 처방전을 함께 보면서 약을 등록해보세요!'}
      </div>
      <PrescriptionSelectionButton onClick={() => onOpenPanel()}>
        {'함께 볼 처방전 선택'}
      </PrescriptionSelectionButton>
    </div>
  );
};

export default PrescriptionSelectionViewer;
