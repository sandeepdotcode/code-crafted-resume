import { FaUser, FaEllipsis, FaCircle, FaEye, FaTrash } from "react-icons/fa6";
import './Sidebar.css';
import { useState } from "react";
import useFormStore from "../../store";
import sections from "../Form/sectionData";

function DualMode() {
  return (
    <>
      <FaCircle className="dual-icon-1"></FaCircle><FaCircle className="dual-icon-2"></FaCircle>
    </>
  );
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

function Sidebar({ goToSection, toggleSideBySide }) {
  const [ editMode, setEditMode ] = useState(false);
  const added = useFormStore((state) => state.sections.added);

  const LayoutBtns = added.map((sectionKey, index) => (
    <LayoutBtn sectionKey={sectionKey} key={sectionKey}
          index={index} goToSection={goToSection}/>
  ));

  return (
    <div className="sidebar">
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
      <div className="mode-btn-div">
        <button type="button" className="mode-btn" onClick={toggleSideBySide}><DualMode /></button>
      </div>
      <div className="prev-btn-div">
        <button type="button" className="preview-btn"><FaEye></FaEye></button>
      </div>
    </div>
  );
}

export default Sidebar;