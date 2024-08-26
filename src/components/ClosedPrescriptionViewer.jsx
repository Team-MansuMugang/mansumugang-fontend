import './ClosedPrescriptionViewer.css';

const ClosedPrescriptionViewer = ({ onOpenPrescriptionViewer }) => {
  const handlePrescriptionViewOpen = () => {
    onOpenPrescriptionViewer();
  };

  return (
    <div className="closed-prescription-viewer">
      <button className="open-button" onClick={handlePrescriptionViewOpen}>
        처방전 창 열기
      </button>
    </div>
  );
};

export default ClosedPrescriptionViewer;
