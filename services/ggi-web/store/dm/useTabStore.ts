import * as I from "@/models/dm/DM";
import { create } from "zustand";

interface ITabState {
  tabs: I.ITabStatus
  setTabs?: (tabs: I.ITabStatus) => void
}

const InitialTabs: I.ITabStatus = {
  expected: true,
  ongoing: false,
  mine: false
}

export const useTabStore = create<ITabState>((set) => ({
  tabs: InitialTabs,
  setTabs: (newTabs) => set(() => {
    return {
      tabs: newTabs
    }
  })
}))
