import { Component } from "react";
import { FaUser, FaEllipsis, FaCircle, FaEye, FaTrash } from "react-icons/fa6";
import './Sidebar.css';

class DualMode extends Component {
  render() {
    return (
      <>
        <FaCircle className="dual-icon-1"></FaCircle><FaCircle className="dual-icon-2"></FaCircle>
      </>
    );
  }
}

class LayoutBtn extends Component {
  render() {
    const { sections, sectionKey, editMode, goToSection, index } = this.props;
    if (sectionKey === 'personal') return null;
    return (
      <div className="layout-btn-div">
        { editMode && <button type="button" className="sidbar-grab"></button> }
        <button type="button" className="layout-btn" onClick={() => {goToSection(index)}}>
          {sections[sectionKey].icon}
        </button>
        { editMode && <button type="button" className="layout-del-btn"><FaTrash /></button> }
      </div>
    )
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editMode: false,
    }
  }

  render() {
    const LayoutBtns = this.props.added.map((sectionKey, index) => (
      <LayoutBtn sections={this.props.sections} sectionKey={sectionKey} 
        key={sectionKey} index={index} goToSection={this.props.goToSection}/>
    ));

    return (
      <div className="sidebar">
        <div className="layout-div">
          <div className="layout-btn-div">
            <button type="button" className="layout-btn" onClick={() => {this.props.goToSection(0)}}>
              <FaUser />
            </button>
          </div>
          {LayoutBtns}
          <button type="button" className="layout-opt-btn">
            <FaEllipsis />
          </button>
        </div>
        <div className="mode-btn-div">
          <button type="button" className="mode-btn" onClick={this.props.toggleEdit}><DualMode /></button>
        </div>
        <div className="prev-btn-div">
          <button type="button" className="preview-btn"><FaEye></FaEye></button>
        </div>
      </div>
    );
  }
}

export default Sidebar;