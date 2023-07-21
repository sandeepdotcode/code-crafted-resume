import { Component } from "react";

class Personal extends Component {
  constructor() {
    super();

    this.state = JSON.parse(localStorage.getItem('personalState')) || {
      name: "",
      title: "",
      email: "",
      phone: "",
      summary: "",
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e, name) {
    const value = e.target.value;

    this.setState({
      [name]: value,
    });
  }


  render() {
    const summaryString = `As a Principal Software Engineer, I excel in designing and developing robust and scalable software solutions ...`;
    const { name, title, email,
            phone, summary } = this.state;

    return (
      <>
        <div className="personal-input-container">
          <label><span>Full Name</span>
            <input type="text" placeholder="John Seed" 
              onChange={(e) => {this.handleInputChange(e, "name")}} value={name}></input>
          </label>
          <label><span>Job Title<span> optional</span></span>
            <input type="text" placeholder="Principal Software Engineer"
              onChange={(e) => {this.handleInputChange(e, "title")}} value={title}></input>
          </label>
          <label><span>Email</span>
            <input type="email" placeholder="johnseed@xyz.com" onChange={(e) => {this.handleInputChange(e, 'email')}}
              value={email}></input>
          </label>
          <label><span>Phone<span> not recommended</span></span>
            <input type="text" placeholder="944 704 8000" onChange={(e) => {this.handleInputChange(e, 'phone')}}
              value={phone}></input>
          </label>
        </div>
        <label className="summary-label"><span>Summary<span> not recommended</span></span>
          <textarea placeholder={summaryString} onChange={(e) => {this.handleInputChange(e, 'summary')}}
            value={summary}></textarea>
        </label>
      </>
    );
  }

  componentWillUnmount() {
    localStorage.setItem('personalState', JSON.stringify(this.state));
  }
}

export default Personal;