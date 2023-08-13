import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SimpleSkillSortable, SkillSortable } from "./SkillSortable";
import useFormStore from "../../../store";
import { useState } from "react";
import { getNewBullet } from "../../../helpers/utils";
import { SectionNav } from "./DRYComponents";
// import { FaTrash } from "react-icons/fa6";

const subSections = ['Languages', 'Frameworks, Libraries & Databases', 'Tools & Other Technologies'];
const subSectionId = [ 'lang', 'frame', 'tools'];

function SimpleSkills() {
  const skills = useFormStore((state) => state.simpleSkills);
  const nextId = useFormStore((state) => state.nextSimpleSkillId);
  const setSkills = useFormStore((state) => state.setSimpleSkills);
  const setNextId = useFormStore((state) => state.setNextSimpleSkillId);

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
    <SimpleSkillSortable skill={skill.name} index={index} key={skill.id} id={skill.id}
      handleInputChange={handleInputChange}
      handleRemove={handleRemove}
      />
  ));

  return (
    <>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={skills} strategy={verticalListSortingStrategy}>
          {skillList}
        </SortableContext>
        </DndContext>
      <div className="skill-add-div">
        <button type="button" className="skill-add-btn" onClick={addInput}>Add more</button>
      </div>
    </>
  );
}



function SkillForm({ currentIndex }) {
  const [ skills, setSkills ] = useFormStore((state) => [
    state.skills, state.setSkills
  ]);
  const subSec = subSectionId[currentIndex];
  const skillArray = useFormStore((state) => state.skills[subSec]);

  const addInput = () => {
    setSkills({
      ...skills,
      [subSec]: [
        ...skills[subSec],
        getNewBullet(),
      ],
    });
  };

  const handleInputChange = (e, id) => {
    const newSubSec = skillArray.map((skill) => {
      if (skill.id === id)
        return { id: id, text: e.target.value };
      return skill;
    });

    setSkills({
      ...skills,
      [subSec]: newSubSec,
    });
  };

  const handleRemove = (id) => {
    setSkills({
      ...skills,
      [subSec]: skillArray.filter((skill) => skill.id !== id),
    });
  };

  const handleDragEnd = (e) => {
    const {active, over} = e;


    if (active.id !== over.id) {
      const oldIndex = skillArray.findIndex(skill => skill.id === active.id);
      const newIndex = skillArray.findIndex(skill => skill.id === over.id);

      setSkills({
        ...skills,
        [subSec]: arrayMove(skillArray, oldIndex, newIndex),
      });
    }
  }

  const skillList = skillArray.map((skill, index) => (
    <SkillSortable skill={skill.text} index={index} key={skill.id} id={skill.id}
      handleInputChange={handleInputChange}
      handleRemove={handleRemove} />
  ));

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={skillArray} strategy={verticalListSortingStrategy}>
        {skillList}
      </SortableContext>
      </DndContext>
      <div className="skill-add-div">
        <button type="button" className="skill-add-btn" onClick={addInput}>Add more</button>
      </div>
    </>
  );
}

function Skills() {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ isSimpleSkills, setIsSimple ] = useFormStore((state) => [
    state.isSimpleSkills, state.setIsSimple
  ]);

  const toggleSimpleSkills = () => {
    setIsSimple(!isSimpleSkills);
  };

  return (
    <div className="skill-container">
      <div className="skill-header">
        <h4 className="skill-title">{ isSimpleSkills ? 'Simple Skill Form' : subSections[currentIndex] }</h4>
        <div className="skill-nav-div">
          { isSimpleSkills ? null : <SectionNav delCdtn={false} backCdtn={currentIndex > 0} nextCdtn={currentIndex < 2} addCdtn={false}
            deleteFn={null} navFn={setCurrentIndex} addFn={null} currentIndex={currentIndex} /> }
          <div className="skill-toggle">
            <label>Show Simple Form
              <input type="checkbox" onClick={toggleSimpleSkills}></input>
            </label>
          </div>
        </div>
      </div>
      { isSimpleSkills ? <SimpleSkills /> : <SkillForm currentIndex={currentIndex}/> }
    </div>
  );
}

export default Skills;