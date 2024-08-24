import { useNavigate } from 'react-router-dom';
import PrescriptionSelectionButton from './PrescriptionSelectionButton';
import './PrescriptionSelectionViewer.css';

const PrescriptionSelectionViewer = ({ onOpenPanel }) => {
  const navigate = useNavigate();

  return (
    <div className="prescription-selection-viewer">
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
