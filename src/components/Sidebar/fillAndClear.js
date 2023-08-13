import { FaFillDrip, FaTrash } from "react-icons/fa6";
import useFormStore from "../../store";

function FillAndClear({ goToSection }) {
  const isClear = useFormStore((state) => state.isClear);
  const [ setSampleData, resetData ] = useFormStore((state) => [
    state.setSampleData, state.resetData
  ]);

  const fillSampleData = () => {
    setSampleData();
  };

  const clearData = () => {
    resetData();
    goToSection(0);
  };

  return (
    <div className={`fill-btn-div${isClear ? '' : ' del'}`}>
      <button type="button" onClick={isClear ? fillSampleData : clearData}>
        { isClear ? <FaFillDrip /> : <FaTrash /> }
      </button>
      <div className="sidebar-tooltip">{ isClear ? 'Fill Sample Data' : 'Clear Form Data' }</div>
    </div>
  );
}

export default FillAndClear;
