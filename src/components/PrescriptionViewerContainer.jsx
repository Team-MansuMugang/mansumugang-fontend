import PrescriptionSelectionViewer from './PrescriptionSelectionViewer';
import PrescriptionViewer from './PrescriptionViewer';

const PrescriptionViewerContainer = ({
  onOpenPanel,
  prescriptionImg,
  onUpdatePrescrpitonImg,
  onAddMedicineImgToPrescriptionImg,
}) => {
  return (
    <div className="prescription-viewer-container">
      {prescriptionImg == null ? (
        <PrescriptionSelectionViewer onOpenPanel={onOpenPanel} />
      ) : (
        <PrescriptionViewer
          prescriptionImg={prescriptionImg}
          onUpdatePrescrpitonImg={onUpdatePrescrpitonImg}
          onAddMedicineImgToPrescriptionImg={onAddMedicineImgToPrescriptionImg}
        />
      )}
    </div>
  );
};

export default PrescriptionViewerContainer;
