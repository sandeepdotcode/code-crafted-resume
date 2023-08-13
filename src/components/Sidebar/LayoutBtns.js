import { FaCheck, FaGrip, FaTrash } from "react-icons/fa6";
import sections from "../Form/sectionData";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useFormStore from "../../store";
import { useEffect } from "react";
import { sortSections } from "../../helpers/utils";

function LayoutSortableBtn({ sectionKey, goToSection, index, deleteSection, currentIndex }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: sectionKey })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div className="layout-btn-div" ref={setNodeRef} style={style}>
      { currentIndex === index + 1 && <div className="layout-current-indicator"></div> }
      <button type="button" className="sidbar-grab" {...attributes} {...listeners}><FaGrip /></button>
      <button type="button" className="layout-btn" onClick={() => {goToSection(index + 1)}}>
        {sections[sectionKey].icon}
      </button>
      <button type="button" className="layout-del-btn" onClick={() => { deleteSection(sectionKey) }}><FaTrash /></button>
    </div>
  );
}

function EditModeBtns({ currentIndex, goToSection, setEditMode }) {
  const added = useFormStore((state) => state.sections.added);
  const [ sectionArrays, setSectionArrays ] = useFormStore((state) => [
    state.sections, state.setSections
  ])

  const deleteSection = (section) => {
    if (currentIndex === added.indexOf(section))
      goToSection(0);
    if (currentIndex > added.indexOf(section))
      goToSection(currentIndex - 1);
    setSectionArrays({
      added: added.filter((sName) => sName !== section),
      available: sortSections([...sectionArrays.available, section]),
    });
  }

  const newAdded = added.slice(1);
  const layoutBtns = newAdded.map((sectionKey, index) => (
    <LayoutSortableBtn sectionKey={sectionKey} key={sectionKey} 
      goToSection={goToSection} index={index} deleteSection={deleteSection}
      currentIndex={currentIndex} />
  ));
  
  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (over.id === 'personal') return;
    if (active.id !== over.id) {
      const oldIndex = added.indexOf(active.id);
      const newIndex = added.indexOf(over.id);
      
      setSectionArrays({
        ...sectionArrays,
        added: arrayMove(added, oldIndex, newIndex),
      });
      currentIndex === oldIndex && goToSection(newIndex);
    }
  };

  useEffect(() => {
    function stopEditing(e) {
      if (e.target.closest('.layout-div')) return;
      if (e.target.closest('.layout-dropdown')) return;
      setEditMode(false);
    }

    window.addEventListener('click', stopEditing);
    return () => {
      window.removeEventListener('click', stopEditing);
    }
  });

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={newAdded} strategy={verticalListSortingStrategy}>
          { layoutBtns }
        </SortableContext>
      </DndContext>
      <div className="layout-btn-div">
        <button type="button" className="layout-btn stop" onClick={() => { setEditMode(false) }}>
          <FaCheck /><span>Stop Editing</span>
        </button>
      </div>
    </>
  );
}

function LayoutBtn({ sectionKey, goToSection, index, currentIndex }) {
  if (sectionKey === 'personal') return null;
  return (
    <div className="layout-btn-div">
      { currentIndex === index && <div className="layout-current-indicator"></div> }
      <button type="button" className="layout-btn" onClick={() => {goToSection(index)}}>
        {sections[sectionKey].icon}
      </button>
      <div className="layout-tooltip">{ sections[sectionKey].name }</div>
    </div>
  );
}

function LayoutBtns({ goToSection, currentIndex }) {
  const added = useFormStore((state) => state.sections.added);

  const layoutBtns = added.map((sectionKey, index) => (
    <LayoutBtn sectionKey={sectionKey} key={sectionKey} 
      goToSection={goToSection} index={index} currentIndex={currentIndex} />
  ));

  return (
    <>
      { layoutBtns }
    </>
  );
}

export { LayoutBtns, EditModeBtns };