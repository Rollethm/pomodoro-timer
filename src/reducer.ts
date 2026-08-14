import type { TimerState, TimerAction, TimerMode } from "./types/types";
import { defaultSettings } from "./types/types";

export const initialState: TimerState = {
  mode:'work',
  remainingSeconds:defaultSettings.work,
  isRunning:false,
  competedSections:0,
};

function getNextMode(currentMode:TimerMode,competedSections:number):TimerMode{
  if(currentMode==='work'){
    const isLongBreakDue = (competedSections % defaultSettings.sessionsUntilLongBreak) === 0;
    return isLongBreakDue ? 'longBreak':'shortBreak';
  }
  return 'work';
}

export function timerReducer(state:TimerState,action:TimerAction):TimerState{
  switch (action.type) {
    case 'START':
      return {...state,isRunning:true};
    case 'PAUSE':
      return {...state,isRunning:false};
    case 'TICK':{
      if(state.remainingSeconds>1){
        return {...state,remainingSeconds:state.remainingSeconds-1};
      }
      const isWorkSession = (state.mode === 'work');
      const nextCompletedSessions = isWorkSession
        ? state.competedSections+1
        :state.competedSections;
      const nextMode= getNextMode(state.mode,nextCompletedSessions);

      return {
        ...state,
        mode:nextMode,
        remainingSeconds:defaultSettings[nextMode],
        competedSections:nextCompletedSessions,
      };
    }
    case 'RESET':
      return initialState;
    case 'SwiTCH_MODE':
      return {
        ...state,
        mode:action.nextMode,
        remainingSeconds:defaultSettings[action.nextMode],
        isRunning:false,
      };
  }
}