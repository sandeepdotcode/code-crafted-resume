import Links from "./FormSections/Links";
import Personal from "./FormSections/Personal";
import Skills from "./FormSections/Skills";
import { FaBrain, FaLink } from "react-icons/fa6"

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
}

export default sections;
