import { getBulletList, getNewBullet } from "./utils";

const initialStates = {
  isClear: true,
   sections: {
    added: ['personal'],
    available: ['links', 'skills', 'work', 'projects', 'education', 'certInt'],
  },
  personal: {
  name: '',
  title: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  },
  isSimpleSkills: false,
  skills: {
    lang: getBulletList(3),
    frame: getBulletList(3),
    tools: getBulletList(3),
  },
  nextSimpleSkillId: 4,
  simpleSkills: [
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
  ],
  links: {
    web: { text: '', link: '' },
    linkedin: { text: '', link: '' },
    github: { text: '', link: '' },
  },
  work: [
    {
      name: '',
      title: '',
      duration: '',
      address: '',
      bullets: [ getNewBullet(), getNewBullet(), getNewBullet(), getNewBullet() ],
      // bullets: [{ id: 0, text: ''}, { id: 1, text: '' }, { id: 2, text: ''}, { id: 3, text: '' }],
    },
  ],
  projects: [
    {
      name: '',
      tech: '',
      code: { text: '', link: '' },
      demo: { text: '', link: '' },
      bullets: [ getNewBullet(), getNewBullet(), getNewBullet() ],
    }
  ],
  education: [
    {
      name: '',
      degree: '',
      grad: '',
      address: '',
      bullets: [ getNewBullet(), getNewBullet(), getNewBullet() ],
    },
  ],
  certInt: {
    certification: '',
    skills: '',
    interests: '',
  },
}

export default initialStates;