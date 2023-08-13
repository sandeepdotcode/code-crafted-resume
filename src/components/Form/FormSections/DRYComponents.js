import { useSortable } from "@dnd-kit/sortable";
import { FaAngleLeft, FaAngleRight, FaGrip, FaTrash } from "react-icons/fa6";
import placeholderData from "../../../helpers/placeholderData";
import { CSS } from "@dnd-kit/utilities";

function AddMoreBtn({ divClass, btnClass, clickHandler }) {
  return (
    <div className={divClass}>
      <button type="button" className={btnClass} onClick={clickHandler}>Add more</button>
    </div>
  )
}

function SectionNav({
  delCdtn, backCdtn, nextCdtn, addCdtn,
  deleteFn, navFn, addFn, currentIndex
}) {
  return (
    <div className="work-nav">
      { delCdtn
        ? <button type="button" className="work-del" onClick={deleteFn}><FaTrash/></button> : null }
      { backCdtn
        ? <button type="button" onClick={() => navFn(currentIndex - 1)}><FaAngleLeft/></button> 
        : null }
      { nextCdtn
        ? <button type="button" onClick={() => navFn(currentIndex + 1)}><FaAngleRight/></button> 
        : null }
      { addCdtn
        ? <button type="button" onClick={addFn}>+</button> : null }
    </div>
  );
}

function BulletSortable({ bulletText, id, index, parentIndex, sectionName, handleChange, removeBullet}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const placeholderList = parentIndex === 0 ? placeholderData[sectionName].first : placeholderData[sectionName].later;

  return (
    <div className="bullet-div" ref={setNodeRef} style={style}>
      <div className="bullet-order-div">
        <button type="button" className="grip-btn" {...attributes} {...listeners}><FaGrip /></button>
      </div>
      <input type="text" value={bulletText} onChange={(e) => { handleChange(e, index) }}
        placeholder={placeholderList[index]}></input>
      <button type="button" className="bullet-remove-btn" onClick={() => { removeBullet(id) }}>Remove</button>
    </div>
  );
}

export { AddMoreBtn, BulletSortable, SectionNav };
