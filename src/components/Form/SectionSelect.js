import { Component } from "react"

class Card extends Component {
  render() {
    const { skillKey, handleClick, sections } = this.props;

    return (
      <button type="button" className="select-card" onClick={handleClick}>
        <div className="select-card-top">
          {sections[skillKey].icon}
          <h4>{sections[skillKey].name}</h4>
        </div>
        <div className="select-card-desc"></div>
      </button>
    )
  }
}

class SectionSelect extends Component {
  render() {
    const { available, handleSectionAdd, 
            handleCloseOverlay, sections} = this.props;

    const cards = available.map(sectionKey => (
      <Card skillKey={sectionKey} sections={sections}
        key={sectionKey} handleClick={() => {handleSectionAdd(sectionKey)}}/>
    ));

    return (
      <div className="select-overlay" onClick={handleCloseOverlay}>
        <div className="select-container">
          <div className="select-top">
            <h3>Add Section</h3>
            <button type="button" className="select-close-btn">x</button>
          </div>
          <div className="select-list">
            {cards}
          </div>
        </div>
      </div>
    )
  }
}

export default SectionSelect;