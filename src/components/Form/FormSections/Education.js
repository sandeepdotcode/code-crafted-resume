import { useState } from "react";
import useFormStore from "../../../store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AddMoreBtn, BulletSortable, SectionNav } from "./DRYComponents";
import { getEduObj, getNewBullet } from "../../../helpers/utils";

function EducationForm({ index }) {
  const [ education, setEducationAt ] = useFormStore((state) => [
    state.education[index], state.setEducation
  ]);
  const [ bullets, setEducationBullets ] = useFormStore((state) => [
    state.education[index].bullets, state.setEducationBullets
  ]);

  const handleInputChange = (e) => {
    setEducationAt({
      ...education,
      [e.target.name]: e.target.value,
    }, index);
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      const oldIndex = bullets.findIndex((bullet) => bullet.id === active.id);
      const newIndex = bullets.findIndex((bullet) => bullet.id === over.id);

      setEducationBullets(arrayMove(bullets, oldIndex, newIndex), index);
    }
  };

  const handleBulletChange = (e, bulletIndex) => {
    setEducationBullets([
      ...bullets.slice(0, bulletIndex),
      { id: bullets[bulletIndex].id, text: e.target.value },
      ...bullets.slice(bulletIndex + 1)
    ], index);
  };

  const addBullet = () => {
    setEducationBullets([
      ...bullets,
      getNewBullet(),
    ], index);
  };

  const removeBullet = (id) => {
    setEducationBullets(bullets.filter((bullet) => bullet.id !== id), index);
  };

  const bulletList = bullets.map((bullet, bulletIndex) => {
    return (<BulletSortable key={bullet.id} id={bullet.id} index={bulletIndex} bulletText={bullet.text} 
              handleChange={handleBulletChange} parentIndex={index} sectionName={"education"} removeBullet={removeBullet} />);
  });

  return (
    <div className="edu-body">
      <label><span>University Name</span>
        <input type="text" name="name" placeholder="XYZ University" value={education.name}
          onChange={handleInputChange}></input>
      </label>
      <label><span>Degree</span>
        <input type="text" name="degree" placeholder="Degree(e.g., BS), Majors(e.g., Computer Science)"
          value={education.degree} onChange={handleInputChange}></input>
      </label>
      <label><span>Graduation</span>
        <input type="text" name="grad" placeholder="Graduation Month, Year" value={education.grad}
          onChange={handleInputChange}></input>
      </label>
      <label><span>Address</span>
        <input type="text" name="address" placeholder="City, State / City, Country"
          value={education.address} onChange={handleInputChange}></input>
      </label>
      <div className="bullet-container">
        <p>Bullet Points</p>
        <DndContext  collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={bullets} strategy={verticalListSortingStrategy} >
            {bulletList}
          </SortableContext>
        </DndContext>
        {bullets.length >= 4 
          ? ''
          : <AddMoreBtn divClass={"bullet-add-div"} btnClass={"bullet-add-btn"} clickHandler={addBullet} /> }
      </div>
    </div>
  );
}

function Education() {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ educationArray, setEducationArray] = useFormStore((state) => [
    state.education, state.setEducationArray
  ]);

  const addEducation = () => {
    setEducationArray([
      ...educationArray,
      getEduObj(),
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteEducation = () => {
    setEducationArray([
      ...educationArray.slice(0, currentIndex),
      ...educationArray.slice(currentIndex + 1),
    ]);
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="edu-container">
      <div className="edu-header">
        <h4 className="edu-indicator">Degree { currentIndex + 1 }</h4>
        <SectionNav delCdtn={currentIndex > 0} backCdtn={currentIndex > 0} nextCdtn={currentIndex < educationArray.length - 1 && currentIndex < 2}
          addCdtn={currentIndex === educationArray.length - 1 && currentIndex < 2} deleteFn={deleteEducation}
          navFn={setCurrentIndex} addFn={addEducation} currentIndex={currentIndex} />
      </div>
      <EducationForm index={currentIndex}/>
    </div>
  );
}

export default Education;