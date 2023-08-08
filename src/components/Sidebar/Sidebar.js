import { FaUser, FaEllipsis, FaCircle, FaEye, FaTrash, FaAngleLeft } from "react-icons/fa6";
import './Sidebar.css';
import { useState } from "react";
import useFormStore from "../../store";
import sections from "../Form/sectionData";
import FillAndClear from "./fillAndClear";

function LiveBtn({ showLivePreview, toggleSideBySide }) {
  return (
    <>
      <div className="mode-btn-div">
        <button type="button" className="mode-btn" onClick={toggleSideBySide}>
          { showLivePreview
            ? <FaCircle></FaCircle>
            : (<> <FaCircle className="dual-icon-1"></FaCircle><FaCircle className="dual-icon-2"></FaCircle> </>)
          }
        </button>
      </div>
    </>
  );
}

function PrevBtn({ showPreview, togglePreviewOn }) {
  return (
    <div className="prev-btn-div">
      <button type="button" className="preview-btn" onClick={togglePreviewOn}>
        { showPreview ? <FaAngleLeft></FaAngleLeft> : <FaEye></FaEye> }
      </button>
    </div>
  )
}

function LayoutBtn({ sectionKey, editMode, goToSection, index }) {
  if (sectionKey === 'personal') return null;
  return (
    <div className="layout-btn-div">
      { editMode && <button type="button" className="sidbar-grab"></button> }
      <button type="button" className="layout-btn" onClick={() => {goToSection(index)}}>
        {sections[sectionKey].icon}
      </button>
      { editMode && <button type="button" className="layout-del-btn"><FaTrash /></button> }
    </div>
  );
}

function LayoutController({ goToSection }) {
  const added = useFormStore((state) => state.sections.added);

  const LayoutBtns = added.map((sectionKey, index) => (
    <LayoutBtn sectionKey={sectionKey} key={sectionKey}
          index={index} goToSection={goToSection}/>
  ));

  return (
    <div className="layout-div">
      <div className="layout-btn-div">
        <button type="button" className="layout-btn" onClick={() => { goToSection(0) }}>
          <FaUser />
        </button>
      </div>
      {LayoutBtns}
      <button type="button" className="layout-opt-btn">
        <FaEllipsis />
      </button>
    </div>
  );
}

function Sidebar({ goToSection, toggleSideBySide, togglePreviewOn, showPreview, showLivePreview }) {
  const [ editMode, setEditMode ] = useState(false);

  return (
    <div className="sidebar">
      { !showPreview && <LayoutController goToSection={goToSection} /> }
      { !showPreview && <LiveBtn showLivePreview={showLivePreview} toggleSideBySide={toggleSideBySide} /> }
      <PrevBtn showPreview={showPreview} togglePreviewOn={togglePreviewOn} />
      { !showPreview && <FillAndClear goToSection={goToSection}/> }
    </div>
  );
}

export default Sidebar;