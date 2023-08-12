import useFormStore from "../../store";
import sections from "./sectionData";

function Card({ sectionKey, handleClick }) {
  return (
    <button type="button" className="select-card" onClick={handleClick}>
      <div className="select-card-top">
        {sections[sectionKey].icon}
        <h5>{sections[sectionKey].name}</h5>
      </div>
      <div className="select-card-desc"></div>
    </button>
  );
}

function SectionSelect({ handleCloseOverlay, setShowOverlay, goToSection, currentIndex }) {
  const available = useFormStore((state) => state.sections.available);
  const [ sectionArrays, setSectionArrays ] = useFormStore((state) => [
    state.sections, state.setSections
  ]);

  const handleSectionAdd = (sectionKey) => {
    const newAvailable = sectionArrays.available.filter(item => item !== sectionKey)
    const newAdded = [...sectionArrays.added, sectionKey];
    setSectionArrays({
      available: newAvailable,
      added: newAdded,
    });
    setShowOverlay(false);
    goToSection(currentIndex + 1);
  }

 
  const cards = available.map(sectionKey => (
    <Card sectionKey={sectionKey} key={sectionKey} handleClick={() => {handleSectionAdd(sectionKey)}}/>
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