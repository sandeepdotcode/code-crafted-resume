import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SkillSortable from "./SkillSortable";
import useFormStore from "../../../store";
// import { FaTrash } from "react-icons/fa6";

function Skills() {
  const skills = useFormStore((state) => state.skills);
  const nextId = useFormStore((state) => state.nextSkillId);
  const setSkills = useFormStore((state) => state.setSkills);
  const setNextId = useFormStore((state) => state.setNextSkillId);

  const addInput = () => {
    setSkills([
      ...skills,
      { id: nextId, name: '' }
    ]);
    setNextId(nextId + 1);
  };

  const handleInputChange = (e, id) => {
    const nextSkills = skills.map((skill) => {
      if (skill.id === id)
        return {
          ...skill,
          name: e.target.value,
        }
      return skill;
    });

    setSkills(nextSkills);
  };

  const handleRemove = (id) => {
    const nextSkills = skills.filter((skill) => skill.id !== id);

    setSkills(nextSkills);
    setNextId(nextId - 1);
  };

  const handleDragEnd = (e) => {
    const {active, over} = e;


    if (active.id !== over.id) {
      const oldIndex = skills.findIndex(skill => skill.id === active.id);
      const newIndex = skills.findIndex(skill => skill.id === over.id);

      setSkills(arrayMove(skills, oldIndex, newIndex));
    }
  };

  const skillList = skills.map((skill, index) => (
    <SkillSortable skill={skill.name} index={index} key={skill.id} id={skill.id}
      handleInputChange={handleInputChange}
      handleRemove={handleRemove}
      />
  ))

  return (
    <>
      <div className="skill-container">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={skills} strategy={verticalListSortingStrategy}>
          {skillList}
        </SortableContext>
        </DndContext>
      </div>
      <div className="skill-add-div">
        <button type="button" className="skill-add-btn" onClick={addInput}>Add more</button>
      </div>
    </>
  );
}

// class Links extends Component {
//   render() {
//     return (
//       <>
//         <div className="link-div">
//           <label><span>Website</span><input type="text" placeholder="www.johnseed.com"></input></label>
//           <button type="button" className="del-btn"><FaTrash /></button>
//         </div>
//         <div className="link-div">
//           <label><span>LinkedIn</span><input type="text" placeholder="LinkedIn Id"></input></label>
//           <input type="text" placeholder="URL"></input>
//           <button type="button" className="del-btn"><FaTrash /></button>
//         </div>
//         <div className="link-div">
//           <label><span>GitHub</span><input type="text" placeholder="LinkedIn Id"></input></label>
//           <input type="text" placeholder="URL"></input>
//           <button type="button" className="del-btn"><FaTrash /></button>
//         </div>
//       </>
//     );
//   }
// }

export default Skills;