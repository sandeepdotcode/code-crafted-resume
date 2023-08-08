import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import initialStates from "./helpers/initialStates";
import sampleData from "./helpers/sampleData";

let store = (set, get) => ({
  ...initialStates,
  setIsClear: ((isClear) => {
    set(() => ({ isClear }));
  }),
  setSections: ((sectionsObj) => {
    set(() => ({ sections: sectionsObj }));
  }),
  setPersonal: (personal) => {
    set(() => ({ personal }));
  },
  changePersonal: (e) => {
    set((state) => ({
      personal: {
        ...state.personal,
        [e.target.name]:  e.target.value,
      }
    }))
  },
  setIsSimple: (isSimpleSkills) => {
    set(() => ({ isSimpleSkills }));
  },
  setSkills: (skills) => {
    set(() => ({ skills }));
  },
  setSimpleSkills: (simpleSkills) => {
    set(() => ({ simpleSkills }))
  },
  setNextSimpleSkillId: (id) => {
    set(() => ({ nextSimpleSkillId: id }))
  },
  setLinks: (links) => {
    set(() => ( links ))
  },
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
  setCertInt: (certInt) => {
    set(() => ({ certInt }));
  },

  resetData: () => {
    set(initialStates);
  },
  setSampleData: () => {
    set(sampleData);
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
