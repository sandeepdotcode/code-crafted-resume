import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Form from "./Form/Form";
import './MainPage.css';
import SectionSelect from "./Form/SectionSelect";
import ResumeViewer from "./ResumePdf/ResumePdf";
import LivePreview from "./ResumePdf/LivePreview";

function Editor({ currentIndex, showPreview, showLivePreview, handleShowOverlay, goToSection }) {
  if (showPreview) {
    return null;
  }
  return (
    <>
      <Form currentIndex={currentIndex} handleShowOverlay={handleShowOverlay} goToSection={goToSection} />
      { showLivePreview && <LivePreview /> }
    </>
  );
}

function MainPage() {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ showSelectOverlay, setShowOverlay ] = useState(false);
  const [ showLivePreview, setShowLivePreview ] = useState(false);
  const [ showPreview, setShowPreview ] = useState(false); // for preview & download

 const handleShowOverlay = () => {
    setShowOverlay(true);
  }

  const handleCloseOverlay = (e) => {
    const isOverlay = e.target.classList.contains('select-overlay');
    const isCloseBtn = e.target.classList.contains('select-close-btn');
    if (!(isCloseBtn || isOverlay)) return;
    setShowOverlay(false);
  }

  const goToSection = (index) => {
    setCurrentIndex(index);
  }

  const toggleEditMode = () => {
    setShowLivePreview(!showLivePreview);
  };

  const togglePreviewOn = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className={showLivePreview ? 'main-container dual-mode' : 'main-container'}>
      <Sidebar goToSection={goToSection} toggleSideBySide={toggleEditMode} togglePreviewOn={togglePreviewOn}
        showPreview={showPreview} showLivePreview={showLivePreview} currentIndex={currentIndex} />
      <Editor currentIndex={currentIndex} handleShowOverlay={handleShowOverlay} showPreview={showPreview} 
        showLivePreview={showLivePreview} goToSection={goToSection} />
      { showSelectOverlay && <SectionSelect handleCloseOverlay={handleCloseOverlay} setShowOverlay={setShowOverlay}
        goToSection={goToSection} currentIndex={currentIndex} /> }
      { showPreview && <ResumeViewer /> }
    </div>
  )
}

export default MainPage;