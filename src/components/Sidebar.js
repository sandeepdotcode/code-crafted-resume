import { Component } from "react";
import { FaUser, FaEllipsis, FaCircle, FaEye } from "react-icons/fa6";
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

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="layout-div">
          <div className="layout-btn-div">
            <button type="button" className="layout-btn">
              <FaUser />
            </button>
          </div>
          <button type="button" className="layout-opt-btn">
            <FaEllipsis />
          </button>
        </div>
        <div className="mode-btn-div">
          <button type="button" className="mode-btn"><DualMode /></button>
        </div>
        <div className="prev-btn-div">
          <button type="button" className="prev-btn"><FaEye></FaEye></button>
        </div>
      </div>
    );
  }
}

export default Sidebar;