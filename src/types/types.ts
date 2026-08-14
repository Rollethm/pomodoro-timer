export type TimerMode = 'work'|'shortBreak'|'longBreak'

export interface TimerState {
  mode:TimerMode;
  remainingSeconds:number;
  isRunning:boolean;
  competedSections:number;
}

export interface TimerSettings {
  work:number;
  shortBreak:number;
  longBreak:number;
  sessionsUntilLongBreak:number;
}

export const defaultSettings: TimerSettings = {
  work:25*60,
  shortBreak:5*60,
  longBreak:15*60,
  sessionsUntilLongBreak:4,
};

export type TimerAction =
  |{type:'START'}
  |{type:'PAUSE'}
  |{type:'TICK'}
  |{type:'RESET'}
  |{type:'SwiTCH_MODE'; nextMode:TimerMode};