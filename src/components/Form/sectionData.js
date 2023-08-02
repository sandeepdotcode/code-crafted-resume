import Links from "./FormSections/Links";
import Personal from "./FormSections/Personal";
import Skills from "./FormSections/Skills";
import { FaAward, FaBrain, FaFolderOpen, FaGraduationCap, FaLink, FaSuitcase } from "react-icons/fa6"
import WorkExp from "./FormSections/WorkExp";
import Projects from "./FormSections/Projects";
import Education from "./FormSections/Education";
import Interests from "./FormSections/Interests";

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
  projects: {
    id: 4,
    name: 'Projects',
    icon: (<FaFolderOpen />),
    comp: <Projects />
  },
  education: {
    id: 5,
    name: 'Education',
    icon: (<FaGraduationCap />),
    comp: <Education />,
  },
  certInt: {
    id: 6,
    name: 'Certifications, Skills & Interests',
    icon: (<FaAward />),
    comp: <Interests />,
  },
}

export default sections;
