import { Personal, Skills } from "./FormSections";
import { FaBrain } from "react-icons/fa6"

const sections = {
  personal: {
    name: 'Personal Details',
    comp: <Personal />,
  },
  skills: {
    name: 'Technical Skills',
    icon: (<FaBrain />),
    comp: <Skills />,
  },
}

export default sections;
