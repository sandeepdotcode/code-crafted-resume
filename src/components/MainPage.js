import { Component } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Form from "./Form/Form";
import './MainPage.css';
import SectionSelect from "./Form/SectionSelect";
import sections from "./Form/sectionData";

class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      editingMode: 0, // 0 - full page, 1 - side-by-side
      availableSections: ['skills'],
      currentIndex: 0,
      addedSections: ['personal'],
      showSelectOverlay: false,
    }
    
    this.handleSectionAdd = this.handleSectionAdd.bind(this);
    this.handleShowOverlay = this.handleShowOverlay.bind(this);
    this.handleCloseOverlay = this.handleCloseOverlay.bind(this);
    this.showPrevSection = this.showPrevSection.bind(this);
    this.showNextSection = this.showNextSection.bind(this);
    this.goToSection = this.goToSection.bind(this);
  }

  handleSectionAdd(sectionKey) {
    const newAvailable = this.state.availableSections.filter(item => item !== sectionKey)
    const newAdded = [...this.state.addedSections, sectionKey];
    this.setState({
      availableSections: newAvailable,
      addedSections: newAdded,
      showSelectOverlay: false,
      currentIndex: this.state.currentIndex + 1,
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

  showNextSection() {
    const { currentIndex, availableSections, addedSections } = this.state;
    if (availableSections.length && currentIndex === addedSections.length - 1) {
      this.handleShowOverlay();
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
    }
  }

  showPrevSection() {
    this.setState({
      currentIndex: this.state.currentIndex - 1,
    });
  }

  goToSection(index) {
    this.setState({
      currentIndex: index,
    });
  }

  sortAvailable() {
    const newAvailable = [...this.state.availableSections];
    newAvailable.sort((a, b) => sections[a].id - sections[b].id);
    this.setState({
      availableSections: newAvailable,
    });
  }

  sortAdded() {
    const newAdded = [...this.state.addedSections];
    newAdded.sort((a, b) => (sections[a].id - sections[b].id));
    this.setState({
      addedSections: newAdded,
    });
  }


  render() {
    const { availableSections, addedSections, showSelectOverlay,
            currentIndex } = this.state;

    return (
      <div className="main-container">
        <Sidebar sections={sections} added={addedSections} goToSection={this.goToSection}/>
        <Form available={availableSections} added={addedSections} currentIndex={currentIndex} 
              showNextSection={this.showNextSection} showPrevSection={this.showPrevSection}
              sections={sections}/>
        { showSelectOverlay && <SectionSelect available={availableSections} handleSectionAdd={this.handleSectionAdd}
            handleCloseOverlay={this.handleCloseOverlay} sections={sections}/> }
      </div>
    )
  }
}

export default MainPage;