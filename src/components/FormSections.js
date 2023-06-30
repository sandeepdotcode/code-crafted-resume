import { Component } from "react";

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
      skills: ["", "", ""],
    }

    this.addInput = this.addInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  addInput() {
    this.setState({
      skills: [...this.state.skills, ""],
    });
  }

  handleInputChange(e, index) {
    const skillsCopy = [...this.state.skills];
    skillsCopy[index] = e.target.value;

    this.setState({
      skills: [...skillsCopy],
    });
  }

  handleRemove(index) {
    const skillsCopy = [...this.state.skills];
    skillsCopy.splice(index, 1);

    this.setState({
      skills: [...skillsCopy],
    });
  }
  

  render() {
    const skillList = this.state.skills.map((skill, index) => (
      <div className="skill-div" draggable="true" key={index}>
        <div className="skill-order-div">
          <div>{index + 1}</div>
          <div>di</div>
        </div>
        <input type="text" value={skill} placeholder="Skill"
         onChange={(e) => { this.handleInputChange(e, index) }}></input>
        <button type="button" onClick={() => {this.handleRemove(index)}}>Remove</button>
      </div>
    ))

    return (
      <>
        <div className="skill-container">{skillList}</div>
        <div className="skill-add-div">
          <button type="button" className="skill-add-btn" onClick={this.addInput}>Add more</button>
        </div>
      </>
    );
  }
}

export { Personal, Skills };