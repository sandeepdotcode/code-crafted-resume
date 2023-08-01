import Links from "./FormSections/Links";
import Personal from "./FormSections/Personal";
import Skills from "./FormSections/Skills";
import { FaBrain, FaLink, FaSuitcase } from "react-icons/fa6"
import WorkExp from "./FormSections/WorkExp";

const sections = {
  personal: {
    id: 0,
    name: 'Personal Details',
    comp: <Personal />,
  },
  links: {
    id: 1,
    name: 'Links',
    icon: (<FaLink />),
    comp: <Links />,
  },
  skills: {
    id: 2,
    name: 'Technical Skills',
    icon: (<FaBrain />),
    comp: <Skills />,
  },
  work: {
    id:3,
    name: 'Work Experience',
    icon: (<FaSuitcase />),
    comp: <WorkExp />,
  },
}

export default sections;
