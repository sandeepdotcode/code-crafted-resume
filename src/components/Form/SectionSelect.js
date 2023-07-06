import { Component } from "react"
import { FaBrain } from "react-icons/fa6"

const sectionDescs = {
  skills: {
    icon: (<FaBrain />),
    name: 'Technical Skills',
  },
}

class Card extends Component {
  render() {
    const { skillKey, handleClick } = this.props;

    return (
      <button type="button" className="select-card" onClick={handleClick}>
        <div className="select-card-top">
          {sectionDescs[skillKey].icon}
          <h4>{sectionDescs[skillKey].name}</h4>
        </div>
        <div className="select-card-desc"></div>
      </button>
    )
  }
}

class SectionSelect extends Component {
  render() {
    const cards = this.props.available.map(sectionKey => (
      <Card skillKey={sectionKey}
        key={sectionKey} handleClick={() => {this.props.handleSectionAdd(sectionKey)}}/>
    ));

    return (
      <div className="select-overlay" onClick={this.props.handleCloseOverlay}>
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