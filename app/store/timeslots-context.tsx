"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

export type SubComment = { id: string; title: string; description: string };
export type TimeSlot = {
  id: string;
  start: string;
  end: string;
  comment: string;
  subComments: SubComment[];
};

// key = "YYYY-MM-DD"
type SlotsMap = Record<string, TimeSlot[]>;
type DayCommentsMap = Record<string, SubComment[]>;

type State = {
  slots: SlotsMap;
  dayComments: DayCommentsMap;
  dayNotes: Record<string, string>;
};

const EMPTY: State = { slots: {}, dayComments: {}, dayNotes: {} };
const STORAGE_KEY = "timeslots_v1";

function loadState(): State {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Spread after defaults so old data without dayComments still loads cleanly
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as State) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

type Action =
  | { type: "HYDRATE"; state: State }
  | { type: "ADD_SLOT"; date: string; slot: TimeSlot }
  | { type: "DELETE_SLOT"; date: string; slotId: string }
  | { type: "UPDATE_SLOT"; date: string; slot: TimeSlot }
  | { type: "ADD_SUBCOMMENT"; date: string; slotId: string; sub: SubComment }
  | { type: "DELETE_SUBCOMMENT"; date: string; slotId: string; subId: string }
  | { type: "ADD_DAY_COMMENT"; date: string; comment: SubComment }
  | { type: "UPDATE_DAY_COMMENT"; date: string; comment: SubComment }
  | { type: "DELETE_DAY_COMMENT"; date: string; commentId: string }
  | { type: "UPDATE_DAY_NOTE"; date: string; note: string };

function reducer(state: State, action: Action): State {
  const { slots, dayComments } = state;
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD_SLOT":
      return { ...state, slots: { ...slots, [action.date]: [...(slots[action.date] ?? []), action.slot] } };
    case "DELETE_SLOT":
      return { ...state, slots: { ...slots, [action.date]: (slots[action.date] ?? []).filter((s) => s.id !== action.slotId) } };
    case "UPDATE_SLOT":
      return { ...state, slots: { ...slots, [action.date]: (slots[action.date] ?? []).map((s) => s.id === action.slot.id ? action.slot : s) } };
    case "ADD_SUBCOMMENT":
      return {
        ...state,
        slots: {
          ...slots,
          [action.date]: (slots[action.date] ?? []).map((s) =>
            s.id === action.slotId ? { ...s, subComments: [...s.subComments, action.sub] } : s
          ),
        },
      };
    case "DELETE_SUBCOMMENT":
      return {
        ...state,
        slots: {
          ...slots,
          [action.date]: (slots[action.date] ?? []).map((s) =>
            s.id === action.slotId ? { ...s, subComments: s.subComments.filter((c) => c.id !== action.subId) } : s
          ),
        },
      };
    case "ADD_DAY_COMMENT":
      return { ...state, dayComments: { ...dayComments, [action.date]: [...(dayComments[action.date] ?? []), action.comment] } };
    case "UPDATE_DAY_COMMENT":
      return {
        ...state,
        dayComments: {
          ...dayComments,
          [action.date]: (dayComments[action.date] ?? []).map((c) => c.id === action.comment.id ? action.comment : c),
        },
      };
    case "DELETE_DAY_COMMENT":
      return { ...state, dayComments: { ...dayComments, [action.date]: (dayComments[action.date] ?? []).filter((c) => c.id !== action.commentId) } };
    case "UPDATE_DAY_NOTE":
      return { ...state, dayNotes: { ...state.dayNotes, [action.date]: action.note } };
    default:
      return state;
  }
}

type ContextValue = {
  slots: SlotsMap;
  dayComments: DayCommentsMap;
  dayNotes: Record<string, string>;
  dispatch: React.Dispatch<Action>;
  hasSlots: (date: string) => boolean;
};

const TimeSlotsContext = createContext<ContextValue | null>(null);

export function TimeSlotsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, EMPTY);

  // Restore persisted state after hydration to avoid SSR/client mismatch
  useEffect(() => {
    const saved = loadState();
    const hasData = Object.keys(saved.slots).length > 0 || Object.keys(saved.dayComments).length > 0;
    if (hasData) dispatch({ type: "HYDRATE", state: saved });
  }, []);

  // Persist every state change (skip writing an empty initial state)
  useEffect(() => {
    if (Object.keys(state.slots).length > 0 || Object.keys(state.dayComments).length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const hasSlots = (date: string) => (state.slots[date]?.length ?? 0) > 0;

  return (
    <TimeSlotsContext.Provider value={{ slots: state.slots, dayComments: state.dayComments, dayNotes: state.dayNotes, dispatch, hasSlots }}>
      {children}
    </TimeSlotsContext.Provider>
  );
}

export function useTimeSlots() {
  const ctx = useContext(TimeSlotsContext);
  if (!ctx) throw new Error("useTimeSlots must be used inside TimeSlotsProvider");
  return ctx;
}
