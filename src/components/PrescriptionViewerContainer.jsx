import ClosedPrescriptionViewer from './ClosedPrescriptionViewer';
import PrescriptionSelectionViewer from './PrescriptionSelectionViewer';
import PrescriptionViewer from './PrescriptionViewer';
import './PrescriptionViewerContainer.css';

const PrescriptionViewerContainer = ({
  onOpenPanel,
  prescriptionImg,
  isPrescriptionOpened,
  onOpenPrescriptionViewer,
  onClosePrescriptionViewer,
  onUpdatePrescrpitonImg,
  onAddMedicineImgToPrescriptionImg,
}) => {
  return (
    <div className="prescription-viewer-container">
      {isPrescriptionOpened ? (
        prescriptionImg == null ? (
          <PrescriptionSelectionViewer
            onOpenPanel={onOpenPanel}
            onClosePrescriptionViewer={onClosePrescriptionViewer}
          />
        ) : (
          <PrescriptionViewer
            prescriptionImg={prescriptionImg}
            onUpdatePrescrpitonImg={onUpdatePrescrpitonImg}
            onAddMedicineImgToPrescriptionImg={onAddMedicineImgToPrescriptionImg}
          />
        )
      ) : (
        <ClosedPrescriptionViewer onOpenPrescriptionViewer={onOpenPrescriptionViewer} />
      )}
    </div>
  );
};

export default PrescriptionViewerContainer;
