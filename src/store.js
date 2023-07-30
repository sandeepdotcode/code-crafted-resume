import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const initialStates = {
  sections: ['links', 'skills'],
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
  }
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
