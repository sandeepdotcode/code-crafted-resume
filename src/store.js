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
