import uniqid from "uniqid";
import placeholderData from "./placeholderData";

const sampleData = {
  isClear: false,
  sections: {
    added: ['personal', 'links', 'skills', 'work', 'projects', 'education', 'certInt'],
    available: [],
  },
  personal: {
    name: 'John Doe',
    title: '',
    email: 'johndoe@protonmail.com',
    phone: '',
    address: '',
    summary: '',
  },
  isSimpleSkills: false,
  skills: {
    lang: [
      { id: uniqid(), text: 'JavaScript'},
      { id: uniqid(), text: 'Go'},
      { id: uniqid(), text: 'HTML'},
      { id: uniqid(), text: 'CSS'},
    ],
    frame: [
      { id: uniqid(), text: 'React'},
      { id: uniqid(), text: 'Redux'},
      { id: uniqid(), text: 'NestJS'},
      { id: uniqid(), text: 'PostgreSQL'},
      { id: uniqid(), text: 'CockroachDB'},
    ],
    tools: [
      { id: uniqid(), text: 'Git'},
      { id: uniqid(), text: 'SVN'},
      { id: uniqid(), text: 'AWS'},
      { id: uniqid(), text: 'Postman'},
    ]
  },
  simpleSkills: [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Go' },
    { id: 3, name: 'HTML' },
    { id: 4, name: 'CSS' },
    { id: 5, name: 'PostgreSQL' },
    { id: 6, name: 'AWS' },
  ],
  nextSimpleSkillId: 7,
  links: {
    web: { text: 'johndoe.com', link: 'https://www.johndoe.com'},
    linkedin: { text: 'john-doe-123', link: 'https://www.linkedin.com/john-doe-123'},
    github: { text: 'johndoe', link: 'https://www.github.com/johndoe'},
  },
  work: [
    {
      name: 'Boogle',
      title: 'Principal Software Engineer',
      duration: 'Oct 2017 - Present',
      address: 'LK-99 Valley, PA',
      bullets: [
        { id: uniqid(), text: placeholderData.work.first[0]},
        { id: uniqid(), text: placeholderData.work.first[1] },
        { id: uniqid(), text: placeholderData.work.first[2] },
        { id: uniqid(), text: placeholderData.work.first[3] },
      ],
    },
    {
      name: 'Nahoo',
      title: 'SDE - III',
      duration: 'Jan 2015 - Sep 2017',
      address: 'LK-99 Valley, PA',
      bullets: [
        { id: uniqid(), text: placeholderData.work.later[0]},
        { id: uniqid(), text: placeholderData.work.later[1] },
        { id: uniqid(), text: placeholderData.work.later[2] },
        { id: uniqid(), text: placeholderData.work.later[3] },
      ],
    },
    {
      name: 'Tooter',
      title: 'SDE - I',
      duration: 'Nov 2013 - Nov 2014',
      address: 'LK-99 Valley, PA',
      bullets: [
        { id: uniqid(), text: placeholderData.work.later[0]},
        { id: uniqid(), text: placeholderData.work.later[1] },
        { id: uniqid(), text: placeholderData.work.later[2] },
      ],
    },
  ],
  projects: [
    {
      name: 'TravelPlanner',
      tech: 'HTML, CSS, React, TypeScript, Redux, Bootstrap, Express.js, PostgreSQL',
      code: { text: 'Github Repo', link: 'https://www.github.com/johndoe/TravelPlanner' },
      demo: { text: 'Live Preview', link: 'https://john-doe-travel-planner.herokuapp.com' },
      bullets: [
        { id: uniqid(), text: placeholderData.projects.first[0]},
        { id: uniqid(), text: placeholderData.projects.first[1]},
        { id: uniqid(), text: placeholderData.projects.first[2]},
        { id: uniqid(), text: placeholderData.projects.first[3]},
      ],
    },
    {
      name: 'Project No. 2',
      tech: 'Example Tech Stack',
      code: { text: 'Codeberg Repo', link: 'https://www.codeberg.com/johndoe/Project2' },
      demo: { text: 'Live Preview', link: 'https://john-doe-project-two.herokuapp.com' },
      bullets: [
        { id: uniqid(), text: placeholderData.projects.later[0]},
        { id: uniqid(), text: placeholderData.projects.later[1]},
        { id: uniqid(), text: placeholderData.projects.later[2]},
        { id: uniqid(), text: placeholderData.projects.later[3]},
      ],
    },
  ],
  education: [
    {
      name: 'Pistaschio Institute of Technology',
      degree: 'MS, Computer Science',
      grad: 'August 2013',
      address: 'Goodwell, Motherland',
      bullets: [
        { id: uniqid(), text: placeholderData.projects.first[0]},
        { id: uniqid(), text: placeholderData.projects.first[1]},
        { id: uniqid(), text: placeholderData.projects.first[2]},
        { id: uniqid(), text: placeholderData.projects.first[3]},
      ],
    },
    {
      name: 'XYZ University',
      degree: 'BS, Computer Science',
      grad: 'August 2011',
      address: 'City, Country',
      bullets: [
        { id: uniqid(), text: placeholderData.projects.later[0]},
        { id: uniqid(), text: placeholderData.projects.later[1]},
        { id: uniqid(), text: placeholderData.projects.later[2]},
      ],
    },
  ],
  certInt: {
    certification: 'If you have any relevant ones; otherwise leave blank',
    skills: 'Strategic Planning, Problem Solving, Leadership, Teamwork, etc',
    interests: 'Reading, sleeping, yoga, fishing, traveling, Reddit, Bear, Football',
  },
}

export default sampleData;