import { useEffect, useState } from 'react';
import PrescriptionSelectionViewer from './PrescriptionSelectionViewer';
import PrescriptionViewer from './PrescriptionViewer';

const PrescriptionViewerContainer = ({ onOpenPanel, prescriptionImg, onUpdatePrescrpitonImg }) => {
  return (
    <div className="prescription-viewer-container">
      {prescriptionImg == null ? (
        <PrescriptionSelectionViewer onOpenPanel={onOpenPanel} />
      ) : (
        <PrescriptionViewer
          prescriptionImg={prescriptionImg}
          onUpdatePrescrpitonImg={onUpdatePrescrpitonImg}
        />
      )}
    </div>
  );
};

export default PrescriptionViewerContainer;
