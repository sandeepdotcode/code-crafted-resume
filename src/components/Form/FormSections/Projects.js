import { useState } from "react";
import useFormStore from "../../../store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AddMoreBtn, BulletSortable, SectionNav } from "./DRYComponents";
import { getNewBullet, getProjObj } from "../../../helpers/utils";

function ProjectForm({ index }) {
  const [ project, setProjectAt ] = useFormStore((state) => [
    state.projects[index], state.setProject
  ]);
  const [ bullets, setProjectBullets ] = useFormStore((state) => [
    state.projects[index].bullets, state.setProjectBullets
  ]);

  const handleInputChange = (e) => {
    setProjectAt({
      ...project,
      [e.target.name]: e.target.value,
    }, index);
  };

  const handleCodeChange = (e) => {
    setProjectAt({
      ...project,
      code: { ...project.code, [e.target.name]: e.target.value },
    }, index);
  };

  const handleDemoChange = (e) => {
    setProjectAt({
      ...project,
      demo: { ...project.demo, [e.target.name]: e.target.value },
    }, index);
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      const oldIndex = bullets.findIndex((bullet) => bullet.id === active.id);
      const newIndex = bullets.findIndex((bullet) => bullet.id === over.id);

      setProjectBullets(arrayMove(bullets, oldIndex, newIndex), index);
    }
  };

  const handleBulletChange = (e, bulletIndex) => {
    setProjectBullets([
      ...bullets.slice(0, bulletIndex),
      { id: bullets[bulletIndex].id, text: e.target.value },
      ...bullets.slice(bulletIndex + 1)
    ], index);
  };

  const addBullet = () => {
    setProjectBullets([
      ...bullets,
      getNewBullet(),
    ], index);
  };

  const removeBullet = (id) => {
    setProjectBullets(bullets.filter((bullet) => bullet.id !== id), index);
  }

  const bulletList = bullets.map((bullet, bulletIndex) => {
    return (<BulletSortable key={bullet.id} id={bullet.id} index={bulletIndex} bulletText={bullet.text} 
              handleChange={handleBulletChange} parentIndex={index} sectionName={"projects"} removeBullet={removeBullet}/>);
  });

  return (
    <div className="project-body">
      <div className="name-stack-div">
        <label><span>Name</span>
          <input type="text" name="name" placeholder="TravelPlanner" value={project.name}
            onChange={handleInputChange}></input>
        </label>
        <label><span>Tech Stack</span>
          <input type="text" name="tech" placeholder="HTML, CSS, React, TypeScript, Redux, Bootstrap, Express.js, PostgreSQL"
            value={project.tech} onChange={handleInputChange}></input>
        </label>
      </div>
      <div className="bullet-container">
        <p>Bullet Points</p>
        <DndContext  collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={bullets} strategy={verticalListSortingStrategy} >
            {bulletList}
          </SortableContext>
        </DndContext>
        {bullets.length >= 5 
          ? ''
          : <AddMoreBtn divClass={"bullet-add-div"} btnClass={"bullet-add-btn"} clickHandler={addBullet} /> }
      </div>
      <div className="link-div">
        <p>Code</p>
        <input type="text" name="link" placeholder="https://www.github.com/johndoe/TravelPlanner(URL)"
           value={project.code.link} onChange={handleCodeChange}></input>
        <input type="text" name="text" placeholder="Github Repo(Text)" value={project.code.text} onChange={handleCodeChange}></input>
      </div>
      <div className="link-div">
        <p>Demo</p>
        <input type="text" name="link" placeholder="https://john-doe-travel-planner.herokuapp.com(URL)"
           value={project.demo.link} onChange={handleDemoChange}></input>
        <input type="text" name="text" placeholder="Live Preview/Website(Text)" value={project.demo.text} onChange={handleDemoChange}></input>
      </div>

    </div>
  );
}

function Projects() {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ projects, setProjectArray] = useFormStore((state) => [
    state.projects, state.setProjectArray
  ]);

  const addProject = () => {
    setProjectArray([
      ...projects,
      getProjObj(),
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteProject = () => {
    setProjectArray([
      ...projects.slice(0, currentIndex),
      ...projects.slice(currentIndex + 1),
    ]);
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="project-container">
      <div className="project-header">
        <h4 className="project-indicator">Project { currentIndex + 1 }</h4>
        <SectionNav delCdtn={currentIndex > 0} backCdtn={currentIndex > 0} nextCdtn={currentIndex < projects.length - 1 && currentIndex < 3}
          addCdtn={currentIndex === projects.length - 1 && currentIndex < 3} deleteFn={deleteProject}
          navFn={setCurrentIndex} addFn={addProject} currentIndex={currentIndex} />
      </div>
      <ProjectForm index={currentIndex}/>
    </div>
  );
}

export default Projects;