import { FaCircle, FaEye, FaAngleLeft } from "react-icons/fa6";
import './Sidebar.css';
import FillAndClear from "./fillAndClear";
import LayoutController from "./LayoutController";

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

function Sidebar({ goToSection, toggleSideBySide, togglePreviewOn, showPreview, showLivePreview, currentIndex }) {
  return (
    <div className="sidebar">
      { !showPreview && <LayoutController goToSection={goToSection} currentIndex={currentIndex} /> }
      { !showPreview && <LiveBtn showLivePreview={showLivePreview} toggleSideBySide={toggleSideBySide} /> }
      <PrevBtn showPreview={showPreview} togglePreviewOn={togglePreviewOn} />
      { !showPreview && <FillAndClear goToSection={goToSection}/> }
    </div>
  );
}

export default Sidebar;