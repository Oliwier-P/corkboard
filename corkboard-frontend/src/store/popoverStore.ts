import { create } from "zustand";

interface PopoverStore {
    activeId: string | null;
    open: (id: string) => void;
    close: () => void;
    toggle: (id: string) => void;
}

export const usePopoverStore = create<PopoverStore>((set, get) => ({
    activeId: null,
    open: (id) => set({ activeId: id }),
    close: () => set({ activeId: null }),
    toggle: (id) => set({ activeId: get().activeId === id ? null : id }),
}));
