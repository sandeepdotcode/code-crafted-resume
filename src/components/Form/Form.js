import { Component } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Personal, Skills } from "./FormSections";
import './Form.css';
import SectionSelect from "./SectionSelect";

const sections = {
  personal: {
    name: 'Personal Details',
    comp: Personal,
  },
  skills: {
    name: 'Technical Skills',
    comp: Skills,
  },
}

class FormTitle extends Component {
  render() {
    const { available, added } = this.props;

    return (
      <div className="form-title-div">
        <h3>Personal Details</h3>
        <div className="next-btn-div">
          { (added.length > 1) && <button type="button" className="prev-btn"><FaAngleLeft /> Back</button> }
          { (available.length > 0) && <button type="button" className="next-btn"
              onClick={this.props.handleShowOverlay}>Next <FaAngleRight /></button> }
        </div>
      </div>
    )
  }
}


class Form extends Component {
  constructor() {
    super();

    this.state = {
      availableSections: ['skills'],
      CurrentSection: Personal,
      addedSections: ['Personal'],
      showSelectOverlay: false,
    }

    this.handleSectionAdd = this.handleSectionAdd.bind(this);
    this.handleShowOverlay = this.handleShowOverlay.bind(this);
    this.handleCloseOverlay = this.handleCloseOverlay.bind(this);
  }

  handleSectionAdd(sectionKey) {
    const newAvailable = this.state.availableSections.filter(item => item !== sectionKey)
    const newAdded = [...this.state.addedSections, sectionKey];
    this.setState({
      availableSections: newAvailable,
      CurrentSection: sections[sectionKey].comp,
      addedSections: newAdded,
      showSelectOverlay: false,
    });
  }

  handleShowOverlay() {
    this.setState({
      showSelectOverlay: true,
    });
  }

  handleCloseOverlay(e) {
    const isOverlay = e.target.classList.contains('select-overlay');
    const isCloseBtn = e.target.classList.contains('select-close-btn');
    if (!(isCloseBtn || isOverlay)) return;
    this.setState({
      showSelectOverlay: false,
    });
  }

  render() {
    const { CurrentSection, availableSections,
      addedSections, showSelectOverlay } = this.state;

    return (
      <>
        <div className="form-container">
          <FormTitle available={availableSections} added={addedSections} handleShowOverlay={this.handleShowOverlay}/>
          <form className="form">
            <CurrentSection />
          </form>
        </div>
        { showSelectOverlay && <SectionSelect available={availableSections} handleSectionAdd={this.handleSectionAdd}
            handleCloseOverlay={this.handleCloseOverlay}/> }
      </>
    );
  }
}

export default Form;