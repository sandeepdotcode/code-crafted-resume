import { FaCircle, FaEye, FaAngleLeft } from "react-icons/fa6";
import './Sidebar.css';
import FillAndClear from "./fillAndClear";
import LayoutController from "./LayoutController";
import { useState } from "react";

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
        <div className="sidebar-tooltip">{ showLivePreview ? 'Editor Only' : 'Live Preview' }</div>
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
      <div className="sidebar-tooltip">{ showPreview ? 'Go Back' : 'Preview PDF & Download' }</div>
    </div>
  )
}

function Sidebar({ goToSection, toggleSideBySide, togglePreviewOn, showPreview, showLivePreview, currentIndex }) {
  const [ editMode, setEditMode ] = useState(false);

  return (
    <div className="sidebar">
      { !showPreview && <LayoutController goToSection={goToSection} currentIndex={currentIndex}
        editMode={editMode} setEditMode={setEditMode} /> }
      { !showPreview && <LiveBtn showLivePreview={showLivePreview} toggleSideBySide={toggleSideBySide} /> }
      <PrevBtn showPreview={showPreview} togglePreviewOn={togglePreviewOn} />
      { !showPreview && <FillAndClear goToSection={goToSection}/> }
    </div>
  );
}

export default Sidebar;