import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import initialStates from "./helpers/initialStates";

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
  isSimpleSkills: false,
  setIsSimple: (isSimpleSkills) => {
    set(() => ({ isSimpleSkills }));
  },
  skills: initialStates.skills,
  setSkills: (skills) => {
    set(() => ({ skills }));
  },
  simpleSkills: initialStates.simpleSkills,
  nextSimpleSkillId: 4,
  setSimpleSkills: (simpleSkills) => {
    set(() => ({ simpleSkills }))
  },
  setNextSimpleSkillId: (id) => {
    set(() => ({ nextSimpleSkillId: id }))
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
  education: initialStates.education,
  setEducationArray: (eduArray) => {
    set(() => ({ education: eduArray }));
  },
  setEducation: (eduObj, index) => {
    set((state) => ({
      education: [
        ...state.education.slice(0, index),
        eduObj,
        ...state.education.slice(index + 1),
      ],
    }));
  },
  setEducationBullets: (bullets, index) => {
    set((state) => ({
      education: [
        ...state.education.slice(0, index),
        { ...state.education[index], bullets: bullets},
        ...state.education.slice(index + 1),
      ],
    }));
  },
  certInt: initialStates.certInt,
  setCertInt: (certInt) => {
    set(() => ({ certInt }));
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
