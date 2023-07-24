import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Form from "./Form/Form";
import './MainPage.css';
import SectionSelect from "./Form/SectionSelect";
import sections from "./Form/sectionData";
import ResumeViewer from "./ResumePdf/ResumePdf";

function MainPage() {
  const [ sectionArrays, setSectionArrays ] = useState({
    availableSections: ['skills'],
    addedSections: ['personal'],
  });
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ editMode, setEditMode ] = useState(0);  // 0 - full page, 1 - side-by-side
  const [ showSelectOverlay, setShowOverlay ] = useState(false);


  const handleSectionAdd = (sectionKey) => {
    const newAvailable = sectionArrays.availableSections.filter(item => item !== sectionKey)
    const newAdded = [...sectionArrays.addedSections, sectionKey];
    setSectionArrays({
      availableSections: newAvailable,
      addedSections: newAdded,
    });
    setShowOverlay(false);
    setCurrentIndex(currentIndex + 1);
  }

  const handleShowOverlay = () => {
    setShowOverlay(true);
  }

  const handleCloseOverlay = (e) => {
    const isOverlay = e.target.classList.contains('select-overlay');
    const isCloseBtn = e.target.classList.contains('select-close-btn');
    if (!(isCloseBtn || isOverlay)) return;
    setShowOverlay(false);
  }

  const showNextSection = () => {
    const { availableSections, addedSections } = sectionArrays;
    if (availableSections.length && currentIndex === addedSections.length - 1) {
      handleShowOverlay();
    } else {
      setCurrentIndex(currentIndex + 1);
    };
  }

  const showPrevSection = () => {
    setCurrentIndex(currentIndex - 1);
  }

  const goToSection = (index) => {
    setCurrentIndex(index);
  }

  const sortAvailable = () => {
    const newAvailable = [...sectionArrays.availableSections];
    newAvailable.sort((a, b) => sections[a].id - sections[b].id);
    setSectionArrays({
      ...setSectionArrays,
      availableSections: newAvailable,
    })
  }

  const sortAdded = () => {
    const newAdded = [...sectionArrays.addedSections];
    newAdded.sort((a, b) => (sections[a].id - sections[b].id));
    setSectionArrays({
      ...sectionArrays,
      addedSections: newAdded,
    })
  }

  const toggleEditMode = () => {
    const newMode = editMode === 0 ? 1 : 0;
    setEditMode(newMode);
  }


  return (
    <div className={editMode === 1 ? 'main-container dual-mode' : 'main-container'}>
      <Sidebar sections={sections} added={sectionArrays.addedSections} goToSection={goToSection}
                toggleEdit={toggleEditMode}/>
      <Form available={sectionArrays.availableSections} added={sectionArrays.addedSections} currentIndex={currentIndex} 
            showNextSection={showNextSection} showPrevSection={showPrevSection}
            sections={sections}/>
      {editMode === 1 ? <ResumeViewer /> : null}
      { showSelectOverlay && <SectionSelect available={sectionArrays.availableSections} handleSectionAdd={handleSectionAdd}
          handleCloseOverlay={handleCloseOverlay} sections={sections}/> }
    </div>
  )
}

export default MainPage;