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

const STORAGE_KEY = "timeslots_v1";

function loadState(): State {
  if (typeof window === "undefined") return { slots: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as State) : { slots: {} };
  } catch {
    return { slots: {} };
  }
}

type State = { slots: SlotsMap };

type Action =
  | { type: "HYDRATE"; state: State }
  | { type: "ADD_SLOT"; date: string; slot: TimeSlot }
  | { type: "DELETE_SLOT"; date: string; slotId: string }
  | { type: "UPDATE_SLOT"; date: string; slot: TimeSlot }
  | { type: "ADD_SUBCOMMENT"; date: string; slotId: string; sub: SubComment }
  | { type: "DELETE_SUBCOMMENT"; date: string; slotId: string; subId: string };

function reducer(state: State, action: Action): State {
  const { slots } = state;
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD_SLOT":
      return {
        slots: {
          ...slots,
          [action.date]: [...(slots[action.date] ?? []), action.slot],
        },
      };
    case "DELETE_SLOT":
      return {
        slots: {
          ...slots,
          [action.date]: (slots[action.date] ?? []).filter(
            (s) => s.id !== action.slotId
          ),
        },
      };
    case "UPDATE_SLOT":
      return {
        slots: {
          ...slots,
          [action.date]: (slots[action.date] ?? []).map((s) =>
            s.id === action.slot.id ? action.slot : s
          ),
        },
      };
    case "ADD_SUBCOMMENT":
      return {
        slots: {
          ...slots,
          [action.date]: (slots[action.date] ?? []).map((s) =>
            s.id === action.slotId
              ? { ...s, subComments: [...s.subComments, action.sub] }
              : s
          ),
        },
      };
    case "DELETE_SUBCOMMENT":
      return {
        slots: {
          ...slots,
          [action.date]: (slots[action.date] ?? []).map((s) =>
            s.id === action.slotId
              ? {
                  ...s,
                  subComments: s.subComments.filter(
                    (c) => c.id !== action.subId
                  ),
                }
              : s
          ),
        },
      };
    default:
      return state;
  }
}

type ContextValue = {
  slots: SlotsMap;
  dispatch: React.Dispatch<Action>;
  hasSlots: (date: string) => boolean;
};

const TimeSlotsContext = createContext<ContextValue | null>(null);

export function TimeSlotsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { slots: {} });

  // Restore persisted state after hydration to avoid SSR/client mismatch
  useEffect(() => {
    const saved = loadState();
    if (Object.keys(saved.slots).length > 0) {
      dispatch({ type: "HYDRATE", state: saved });
    }
  }, []);

  // Persist every state change (skip the empty initial server render)
  useEffect(() => {
    if (Object.keys(state.slots).length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const hasSlots = (date: string) =>
    (state.slots[date]?.length ?? 0) > 0;

  return (
    <TimeSlotsContext.Provider value={{ slots: state.slots, dispatch, hasSlots }}>
      {children}
    </TimeSlotsContext.Provider>
  );
}

export function useTimeSlots() {
  const ctx = useContext(TimeSlotsContext);
  if (!ctx) throw new Error("useTimeSlots must be used inside TimeSlotsProvider");
  return ctx;
}
