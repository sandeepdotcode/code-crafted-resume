import { Component } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import './Form.css';


class FormTitle extends Component {
  render() {
    const { available, added, currentIndex } = this.props;

    return (
      <div className="form-title-div">
        <h3>Personal Details</h3>
        <div className="next-btn-div">
          { (currentIndex >= 1) && <button type="button" className="prev-btn"
              onClick={this.props.showPrevSection}><FaAngleLeft /> Back</button> }
          { (currentIndex < added.length -1 || available.length > 0) && <button type="button" className="next-btn"
              onClick={this.props.showNextSection}>Next <FaAngleRight /></button> }
        </div>
      </div>
    )
  }
}


class Form extends Component {
  render() {
    const { currentIndex, added, sections } = this.props;

    return (
      <>
        <div className="form-container">
          <FormTitle {...this.props} />
          <form className="form">
            {sections[added[currentIndex]].comp}
          </form>
        </div>
      </>
    );
  }
}

export default Form;