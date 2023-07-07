import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Component } from "react";
import SkillSortable from "./SkillSortable";
// import { FaTrash } from "react-icons/fa6";

class Personal extends Component {
  render() {
    const summaryString = `As a Principal Software Engineer, I excel in designing and developing robust and scalable software solutions ...`;

    return (
      <>
        <div className="personal-input-container">
          <label><span>Full Name</span><input type="text" placeholder="John Seed"></input></label>
          <label><span>Job Title<span> optional</span></span>
            <input type="text" placeholder="Principal Software Engineer"></input>
          </label>
          <label><span>Email</span><input type="email" placeholder="johnseed@xyz.com"></input></label>
          <label><span>Phone<span> not recommended</span></span><input type="text" placeholder="944 704 8000"></input></label>
        </div>
        <label className="summary-label"><span>Summary<span> not recommended</span></span>
          <textarea placeholder={summaryString}></textarea>
        </label>
      </>
    )
  }
}

class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [{id: 1, name: ""},
       {id: 2, name: ""},
       {id: 3, name: ""}],
      numSkill: 3,
    }

    this.addInput = this.addInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  addInput() {
    this.setState({
      skills: [...this.state.skills, {id: this.state.numSkill + 1, name:""}],
      numSkill: this.state.numSkill + 1,
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
      numSkill: this.state.numSkill - 1,
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

    console.log(this.state.skills)

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

export { Personal, Skills };