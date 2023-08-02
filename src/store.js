import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import uniqid from "uniqid";
import { getNewBullet } from "./helpers/utils";

const initialStates = {
  sections: ['links', 'skills', 'work', 'projects'],
  personal: {
  name: '',
  title: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  },
  skills: [
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
      bullets: [{ id: uniqid(), text: ''}, { id: uniqid(), text: '' }, { id: uniqid(), text: ''}, { id: uniqid(), text: '' }],
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
      school: '',
      grad: '',
      address: '',
      bullets: [ getNewBullet(), getNewBullet(), getNewBullet() ],
    },
  ],
  cert: {
    certification: '',
    skills: '',
    interests: '',
  },
}

let store = (set, get) => ({
  sections: {
    added: ['personal'],
    available: initialStates.sections,
  },
  setSections: ((sectionsObj) => {
    set(() => ({ sections: sectionsObj }))
  }),
  personal: initialStates.personal,
  changePersonal: (e) => {
    set((state) => ({
      personal: {
        ...state.personal,
        [e.target.name]:  e.target.value,
      }
    }))
  },
  skills: initialStates.skills,
  nextSkillId: 4,
  setSkills: (skills) => {
    set(() => ({ skills }))
  },
  setNextSkillId: (id) => {
    set(() => ({ nextSkillId: id }))
  },
  links: initialStates.links,
  setLinks: (links) => {
    set(() => ( links ))
  },
  work: initialStates.work,
  setWorkArray: (workArray) => {
    set(() => ({ work: workArray }));
  },
  setWork: (workObj, index) => {
    set((state) => ({ 
      work: [
        ...state.work.slice(0, index),
        workObj,
        ...state.work.slice(index + 1),
      ],
    }));
  },
  setWorkBullets: (bullets, index) => {
    set((state) => ({
      work: [
        ...state.work.slice(0, index),
        { ...state.work[index], bullets: bullets },
        ...state.work.slice(index + 1),
      ],
    }));
  },
  projects: initialStates.projects,
  setProjectArray: (projArray) => {
    set(() => ({ projects: projArray }));
  },
  setProject: (projObj, index) => {
    set((state) => ({
      projects: [
        ...state.projects.slice(0, index),
        projObj,
        ...state.projects.slice(index + 1),
      ],
    }));
  },
  setProjectBullets: (bullets, index) => {
    set((state) => ({
      projects: [
        ...state.projects.slice(0, index),
        { ...state.projects[index], bullets: bullets },
        ...state.projects.slice(index + 1),
      ],
    }));
  },
})

const useFormStore = create(
  devtools(
    persist(
      store,
      {
        name: 'resume-data',
      }
    )
  )
)

export default useFormStore;
