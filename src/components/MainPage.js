import { Component } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Form from "./Form/Form";
import './MainPage.css';

class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      editingMode: 0, // 0 - full page, 1 - side-by-side
    }
  }

  render() {
    return (
      <div className="main-container">
        <Sidebar />
        <Form />
      </div>
    )
  }
}

export default MainPage;