function Card(props) {
  const { sectionKey, handleClick, sections } = props;

  return (
    <button type="button" className="select-card" onClick={handleClick}>
      <div className="select-card-top">
        {sections[sectionKey].icon}
        <h4>{sections[sectionKey].name}</h4>
      </div>
      <div className="select-card-desc"></div>
    </button>
  );
}

function SectionSelect(props) {
  const { available, handleSectionAdd, 
          handleCloseOverlay, sections} = props;

  const cards = available.map(sectionKey => (
    <Card sectionKey={sectionKey} sections={sections}
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
  );
}

export default SectionSelect;