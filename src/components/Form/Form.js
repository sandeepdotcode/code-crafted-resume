import { Component } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Personal, Skills } from "./FormSections";
import './Form.css';

class FormTitle extends Component {
  render() {
    return (
      <div className="form-title-div">
        <h3>Personal Details</h3>
        <div className="next-btn-div">
          <button type="button" className="prev-btn"><FaAngleLeft /> Back</button>
          <button type="button" className="next-btn">Next <FaAngleRight /></button>
        </div>
      </div>
    )
  }
}

class Form extends Component {
  render() {
    return (
      <div className="form-container">
        <FormTitle />
        <form className="form">
          <Skills />
        </form>
      </div>
    );
  }
}

export default Form;