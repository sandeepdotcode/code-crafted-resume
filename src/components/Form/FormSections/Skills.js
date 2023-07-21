import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Component } from "react";
import SkillSortable from "./SkillSortable";
// import { FaTrash } from "react-icons/fa6";


class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = JSON.parse(localStorage.getItem('skillsState')) || {
      skills: [{id: 1, name: ""},
       {id: 2, name: ""},
       {id: 3, name: ""}],
      runningId: 3,
    }

    this.addInput = this.addInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  addInput() {
    this.setState({
      skills: [...this.state.skills, { id: this.state.runningId + 1, name:"" }],
      runningId: this.state.runningId + 1,
    });
  }

  handleInputChange(e, id) {
    const skillsCopy = [...this.state.skills];
    skillsCopy.forEach(skill => {
      if (skill.id === id) {
        skill.name = e.target.value;
      }
    });

    this.setState({
      skills: [...skillsCopy],
    });
  }

  handleRemove(id) {
    const skillsCopy = [...this.state.skills];
    const index = skillsCopy.findIndex(skill => skill.id === id);
    skillsCopy.splice(index, 1);

    this.setState({
      skills: [...skillsCopy],
    });
  }

  handleDragEnd(e) {
    const {active, over} = e;

    if (active.id !== over.id) {
      const oldIndex = this.state.skills.findIndex(skill => skill.id === active.id);
      const newIndex = this.state.skills.findIndex(skill => skill.id === over.id);

      this.setState({ skills: arrayMove(this.state.skills, oldIndex, newIndex) });
    }
  }

  render() {
    const skillList = this.state.skills.map((skill, index) => (
      <SkillSortable skill={skill.name} index={index} key={skill.id} id={skill.id}
        handleInputChange={this.handleInputChange}
        handleRemove={this.handleRemove}
        />
    ))

    return (
      <>
        <div className="skill-container">
          <DndContext collisionDetection={closestCenter} onDragEnd={this.handleDragEnd}>
           <SortableContext items={this.state.skills} strategy={verticalListSortingStrategy}>
            {skillList}
           </SortableContext>
          </DndContext>
        </div>
        <div className="skill-add-div">
          <button type="button" className="skill-add-btn" onClick={this.addInput}>Add more</button>
        </div>
      </>
    );
  }

  componentWillUnmount() {
    localStorage.setItem('skillsState', JSON.stringify(this.state));
  }
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