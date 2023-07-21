import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGrip } from "react-icons/fa6";

function SkillSortable(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div className="skill-div" ref={setNodeRef} style={style}>
      <div className="skill-order-div">
        <button type="button" className="grip-btn" {...attributes} {...listeners}><FaGrip /></button>
        <div>{props.index + 1}</div>
      </div>
      <input type="text" value={props.skill} placeholder="Skill"
        onChange={(e) => { props.handleInputChange(e, props.id) }}></input>
      <button type="button" onClick={() => {props.handleRemove(props.id)}}>Remove</button>
      </div>
  )
}

export default SkillSortable;