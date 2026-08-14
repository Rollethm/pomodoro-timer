import {useEffect, useReducer} from "react";
import "./App.css";
import { initialState, timerReducer } from "./reducer";
import { formatTime, getProgress } from "./utils";
import { Play, Pause, RefreshCcw } from "lucide-react";
import TimerCircle from "./components/TimerCircle";

export default function App(){
  const [state, dispatch] = useReducer(timerReducer,initialState);
  useEffect(()=>{
    if(!state.isRunning){//isRunning===false
      return;
    }
    const intervalId=setInterval(()=>{
      dispatch({type:'TICK'});
    },1000);
    return ()=>{
      clearInterval(intervalId);
    };
  },[state.isRunning])

  return(
    <div className={`app app--${state.mode}`}>
      <h1>{state.mode}</h1>
      <TimerCircle progress={getProgress(state)}>
        <p className="time-display">{formatTime(state.remainingSeconds)}</p>
        <p className="session-count">Session:{state.competedSections+1}</p>
      </TimerCircle>

      <div className="controls">
        <button onClick={()=>dispatch({type:'RESET'})} className="button-reset"><RefreshCcw/></button>
        {state.isRunning ?(
          <button onClick={()=>dispatch({type:'PAUSE'})}>
            <Pause/>一時停止
          </button>
        ):(
          <button onClick={()=>dispatch({type:'START'})}>
            <Play/>開始
          </button>
        )}
      </div>

      <div className="mode-switcher">
        <button onClick={()=>dispatch({type:'SwiTCH_MODE',nextMode:'work'})}>作業</button>
        <button onClick={()=>dispatch({type:'SwiTCH_MODE',nextMode:'shortBreak'})}>小休憩</button>
        <button onClick={()=>dispatch({type:'SwiTCH_MODE',nextMode:'longBreak'})}>長休憩</button>
      </div>
    </div>
  );
}
