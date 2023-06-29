import { Component } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

class Personal extends Component {
  render() {
    const summaryString = `As a Principal Software Engineer, I excel in designing and developing robust and scalable software solutions ...`;

    return (
      <>
        <div className="personal-input-container">
          <label><span>Full Name</span><input type="text" placeholder="John Seed"></input></label>
          <label><span>Job Title<span> optional</span></span>
            <input type="text" placeholder="Principal Software Engineer"></input>
          </label>
          <label><span>Email</span><input type="email" placeholder="johnseed@xyz.com"></input></label>
          <label><span>Phone<span> not recommended</span></span><input type="text" placeholder="944 704 8000"></input></label>
        </div>
        <label className="summary-label"><span>Summary<span> not recommended</span></span>
          <textarea placeholder={summaryString}></textarea>
        </label>
      </>
    )
  }
}

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
          <Personal />
        </form>
      </div>
    );
  }
}

export default Form;