import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import useFormStore from "../../../store";
import { CSS } from "@dnd-kit/utilities";
import { FaAngleLeft, FaAngleRight, FaGrip, FaTrash } from "react-icons/fa6";
import uniqid from "uniqid";
import { AddMoreBtn } from "./DRYComponents";
import { getWorkObj } from "../../../helpers/utils";

const job1Resp = [
  'Led a team of 10 developers in the successful design, development, and delivery of a scalable and high-performance SaaS platform, resulting in a 30% increase in user engagement and a 20% reduction in response time.',
  `Architected and implemented a microservices-based architecture using Node.js and Docker, resulting in a more flexible and maintainable system and enabling seamless integration with third-party services.`,
  'Core responsibility #3. Pretend this is where they stop reading. First 3 things should be most impressive',
  'Core responsibility #4.'
];

const jobResp = [
  'Core responsibility #1.',
  'Core responsibility #2.',
  'Core responsibility #3.',
  'Core responsibility #4.',
];

function BulletSortable({ bulletText, id, index, jobIndex, handleChange, removeBullet }) {
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

  const respList = jobIndex === 0 ? job1Resp : jobResp;

  return (
    <div className="bullet-div" ref={setNodeRef} style={style}>
      <div className="bullet-order-div">
        <button type="button" className="grip-btn" {...attributes} {...listeners}><FaGrip /></button>
      </div>
      <input type="text" value={bulletText} onChange={(e) => { handleChange(e, index) }}
        placeholder={respList[index]}></input>
      <button type="button" className="bullet-remove-btn" onClick={() => { removeBullet(id) }}>Remove</button>
    </div>
  );
}

function JobForm({ index }) {
  const [ work, setWorkAt ] = useFormStore((state) => [
    state.work[index], state.setWork
  ]);
  const bullets = useFormStore((state) => state.work[index].bullets);
  const setWorkBullets = useFormStore((state) => state.setWorkBullets);

  const handleInputChange = (e) => {
    setWorkAt({
      ...work,
      [e.target.name]: e.target.value,
    }, index);
  };

  const handleBulletChange = (e, bulletIndex) => {
    setWorkBullets([
      ...bullets.slice(0, bulletIndex),
      { id: bullets[bulletIndex].id, text: e.target.value },
      ...bullets.slice(bulletIndex + 1)
    ], index);
  }

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      const oldIndex = bullets.findIndex((bullet) => bullet.id === active.id);
      const newIndex = bullets.findIndex((bullet) => bullet.id === over.id);

      setWorkBullets(arrayMove(bullets, oldIndex, newIndex), index);
    }
  };

  const addBullet = () => {
    setWorkBullets([
      ...bullets,
      { id: uniqid(), text: ''},
    ], index);
  };

  const removeBullet = (id) => {
    setWorkBullets(bullets.filter((bullet) => bullet.id !== id), index);
  };

  const bulletList = bullets.map((bullet, bulletIndex) => {
    return (<BulletSortable key={bullet.id} id={bullet.id} index={bulletIndex} bulletText={bullet.text} 
              handleChange={handleBulletChange} jobIndex={index} removeBullet={removeBullet} />);
  });

  return (
    <div className="work-body">
      <label><span>Company Name</span>
        <input type="text" name="name" placeholder="Metaverse Company" value={work.name}
          onChange={handleInputChange}></input>
      </label>
      <label><span>Job Title</span>
        <input type="text" name="title" placeholder="Principal Software Engineer"
          value={work.title} onChange={handleInputChange}></input>
      </label>
      <label><span>Duration</span>
        <input type="text" name="duration" placeholder="Oct. 2017 - Present(Month Year - Month Year/Present)"
          value={work.duration} onChange={handleInputChange}></input>
      </label>
      <label><span>Address<span>optional</span></span>
        <input type="text" name="address" placeholder="Blue Sky, MV(City, State / City, Country)"
          value={work.address} onChange={handleInputChange}></input>
      </label>
      <div className="bullet-container">
        <p>Bullet Points</p>
        <DndContext  collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={bullets} strategy={verticalListSortingStrategy} >
            {bulletList}
          </SortableContext>
        </DndContext>
        {bulletList.length >= 10 
          ? ''
          : <AddMoreBtn divClass={"bullet-add-div"} btnClass={"bullet-add-btn"} clickHandler={addBullet} /> }
      </div>

    </div>
  );
}

function WorkExp() {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ workArray, setWorkArray ] = useFormStore((state) => [
    state.work, state.setWorkArray
  ]);

  const addNewWork = () => {
    setWorkArray([
      ...workArray,
      getWorkObj(currentIndex + 1),
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteWork = () => {
    setWorkArray([
      ...workArray.slice(0, currentIndex),
      ...workArray.slice(currentIndex + 1),
    ]);
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="work-container">
      <div className="work-header">
        <div className="work-indicator">
          <h4>Job {currentIndex + 1}</h4>
          <span>{currentIndex === 0 ? 'Most recent first' : null}</span>
        </div>
        <div className="work-nav">
          { currentIndex > 0
            ? <button type="button" className="work-del" onClick={deleteWork}><FaTrash/></button> : null }
          { currentIndex > 0 
            ? <button type="button" onClick={() => setCurrentIndex(currentIndex - 1)}><FaAngleLeft/></button> 
            : null }
          { currentIndex < workArray.length - 1 && currentIndex < 3 
            ? <button type="button" onClick={() => setCurrentIndex(currentIndex + 1)}><FaAngleRight/></button> 
            : null }
          { currentIndex === workArray.length - 1 && currentIndex < 3 
            ? <button type="button" onClick={addNewWork}>+</button> : null }
        </div>
      </div>
      <JobForm index={currentIndex}/>
    </div>
  );
}

export default WorkExp;