"use client";

import { create } from "zustand";
import { persist, createJSONStorage, StorageValue } from "zustand/middleware";

export const TIME_SLOTS = "timeslots_v1";
export type SubComment = { id: string; title: string; description: string };
export type TimeSlot = {
  id: string;
  start: string;
  end: string;
  comment: string;
  subComments: SubComment[];
};

type SlotsMap = Record<string, TimeSlot[]>;
type DayCommentsMap = Record<string, SubComment[]>;

type State = {
  slots: SlotsMap;
  dayComments: DayCommentsMap;
  dayNotes: Record<string, string>;
};

type Actions = {
  hasSlots: (date: string) => boolean;
  addSlot: (date: string, slot: TimeSlot) => void;
  deleteSlot: (date: string, slotId: string) => void;
  updateSlot: (date: string, slot: TimeSlot) => void;
  addSubComment: (date: string, slotId: string, sub: SubComment) => void;
  deleteSubComment: (date: string, slotId: string, subId: string) => void;
  addDayComment: (date: string, comment: SubComment) => void;
  updateDayComment: (date: string, comment: SubComment) => void;
  deleteDayComment: (date: string, commentId: string) => void;
  updateDayNote: (date: string, note: string) => void;
};

// Cleanse the storage from any empty inputs added before
const getFilteredStorage = () => {
  const st = createJSONStorage(() => localStorage)
  
  if (st?.getItem(TIME_SLOTS)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentState = st?.getItem(TIME_SLOTS).state as unknown as State;
    const slots = currentState.slots;

    // Filter emptyValues
    Object.keys(slots).map(key => {
      currentState.slots[key] = slots[key].filter(timeSlot => {
        if (timeSlot.start !== '' || timeSlot.end !== '') {
          return timeSlot;
        }
      })
    })

    st.setItem(TIME_SLOTS, {
      state: currentState,
      // TODO: fix this in the future if needed
      version: 0
    } as unknown as StorageValue<unknown>)
  }

  return st;
}

export const useTimeSlotsStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      slots: {},
      dayComments: {},
      dayNotes: {},

      hasSlots: (date) => (get().slots[date]?.length ?? 0) > 0,

      addSlot: (date, slot) =>
        set((s) => ({ slots: { ...s.slots, [date]: [...(s.slots[date] ?? []), slot] } })),

      deleteSlot: (date, slotId) =>
        set((s) => ({ slots: { ...s.slots, [date]: (s.slots[date] ?? []).filter((sl) => sl.id !== slotId) } })),

      updateSlot: (date, slot) =>
        set((s) => ({ slots: { ...s.slots, [date]: (s.slots[date] ?? []).map((sl) => sl.id === slot.id ? slot : sl) } })),

      addSubComment: (date, slotId, sub) =>
        set((s) => ({
          slots: {
            ...s.slots,
            [date]: (s.slots[date] ?? []).map((sl) =>
              sl.id === slotId ? { ...sl, subComments: [...sl.subComments, sub] } : sl
            ),
          },
        })),

      deleteSubComment: (date, slotId, subId) =>
        set((s) => ({
          slots: {
            ...s.slots,
            [date]: (s.slots[date] ?? []).map((sl) =>
              sl.id === slotId ? { ...sl, subComments: sl.subComments.filter((c) => c.id !== subId) } : sl
            ),
          },
        })),

      addDayComment: (date, comment) =>
        set((s) => ({ dayComments: { ...s.dayComments, [date]: [...(s.dayComments[date] ?? []), comment] } })),

      updateDayComment: (date, comment) =>
        set((s) => ({
          dayComments: {
            ...s.dayComments,
            [date]: (s.dayComments[date] ?? []).map((c) => c.id === comment.id ? comment : c),
          },
        })),

      deleteDayComment: (date, commentId) =>
        set((s) => ({ dayComments: { ...s.dayComments, [date]: (s.dayComments[date] ?? []).filter((c) => c.id !== commentId) } })),

      updateDayNote: (date, note) =>
        set((s) => ({ dayNotes: { ...s.dayNotes, [date]: note } })),
    }),
    {
      name: "timeslots_v1",
      storage: getFilteredStorage(),
      skipHydration: true,
    }
  )
);

export function useRehydrate() {
  useTimeSlotsStore.persist.rehydrate();
}
