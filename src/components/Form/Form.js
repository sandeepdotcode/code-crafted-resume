import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import './Form.css';
import sections from "./sectionData";
import useFormStore from "../../store";


function FormTitle({ currentIndex, showPrevSection, showNextSection }) {
  const { added, available } = useFormStore((state) => state.sections);

  return (
    <div className="form-title-div">
      <h3>Personal Details</h3>
      <div className="next-btn-div">
        { (currentIndex >= 1) && <button type="button" className="prev-btn"
            onClick={showPrevSection}><FaAngleLeft /> Back</button> }
        { (currentIndex < added.length -1 || available.length > 0) && <button type="button" className="next-btn"
            onClick={showNextSection}>Next <FaAngleRight /></button> }
      </div>
    </div>
  );
}


function Form(props) {
  const added = useFormStore((state) => state.sections.added);

  return (
    <>
      <div className="form-container">
        <FormTitle {...props} />
        <form className="form">
          {sections[added[props.currentIndex]].comp}
        </form>
      </div>
    </>
  );
}

export default Form;