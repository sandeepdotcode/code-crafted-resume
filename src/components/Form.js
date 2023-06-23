import { Component } from "react";

class Personal extends Component {
  render() {
    return (
      <>
        <div className="personal-input-container">
          <label><span>Full Name</span><input type="text" placeholder="John Seed"></input></label>
          <label><span>Job Title<span> optional</span></span><input type="text"></input></label>
          <label><span>Email</span><input type="email"></input></label>
          <label><span>Phone<span> not recommended</span></span><input type="text"></input></label>
        </div>
        <label className="summary-label"><span>Summary<span> not recommended</span></span>
          <textarea></textarea>
        </label>
      </>
    )
  }
}

class Form extends Component {
  render() {
    return (
      <div className="form-container">
        <h3>Personal Details</h3>
        <form className="form">
          <Personal />
        </form>
      </div>
    );
  }
}

export default Form;