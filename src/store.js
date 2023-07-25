import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const initialStates = {
  personal: {
  name: '',
  title: '',
  email: '',
  phone: '',
  summary: '',
  },
  skills: [
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
  ],
}

let store = (set, get) => ({
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
