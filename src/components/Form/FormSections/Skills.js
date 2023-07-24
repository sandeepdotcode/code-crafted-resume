import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SkillSortable from "./SkillSortable";
import { useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa6";

const initialSkills = [
  { id: 1, name: "" },
  { id: 2, name: "" },
  { id: 3, name: "" },
];

function getInitialState() {
    if (localStorage.getItem('skillsState')) {
      return JSON.parse(localStorage.getItem('skillsState'));
    }
    return {
      skills: initialSkills,
      nextId: 4,
    }
}

function Skills() {
  const [skillState, setSkillState] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem('skillsState', JSON.stringify(skillState));
  }, [ skillState ]);

  const addInput = () => {
    setSkillState({
      ...skillState,
      skills: [ ...skillState.skills, { id: skillState.nextId, name: "" }],
      nextId: skillState.nextId + 1,
    });
  };

  const handleInputChange = (e, id) => {
    const nextSkills = skillState.skills.map((skill) => {
      if (skill.id === id)
        return {
          ...skill,
          name: e.target.value,
        }
      return skill;
    });

    setSkillState({
      ...skillState,
      skills: nextSkills,
    });
  };

  const handleRemove = (id) => {
    const nextSkills = skillState.skills.filter((skill) => skill.id !== id);

    setSkillState({
      ...skillState,
      skills: nextSkills,
      nextId: skillState.nextId - 1,
    })   
  };

  const handleDragEnd = (e) => {
    const {active, over} = e;


    if (active.id !== over.id) {
      const oldIndex = skillState.skills.findIndex(skill => skill.id === active.id);
      const newIndex = skillState.skills.findIndex(skill => skill.id === over.id);

      setSkillState({
        ...skillState,
        skills: arrayMove(skillState.skills, oldIndex, newIndex),
      });
    }
  };

  const skillList = skillState.skills.map((skill, index) => (
    <SkillSortable skill={skill.name} index={index} key={skill.id} id={skill.id}
      handleInputChange={handleInputChange}
      handleRemove={handleRemove}
      />
  ))

  return (
    <>
      <div className="skill-container">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={skillState.skills} strategy={verticalListSortingStrategy}>
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