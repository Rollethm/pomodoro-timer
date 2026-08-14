import type { TimerState } from "./types/types";
import { defaultSettings } from "./types/types";

export function formatTime(totalSeconds:number):string{
  const minutes =Math.floor(totalSeconds/60);
  const seconds = totalSeconds%60;
  const paddedSeconds = String(seconds).padStart(2,'0');
  return `${minutes}:${paddedSeconds}`;
}

export function getProgress(state:TimerState):number{
  const totalSeconds = defaultSettings[state.mode];
  return state.remainingSeconds/totalSeconds;
}