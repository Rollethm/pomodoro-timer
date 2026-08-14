interface TimerCircleProps{
  progress:number;
  children:React.ReactNode;
}

function TimerCircle({progress,children}:TimerCircleProps){
  const radius = 90;
  const circumference = 2* Math.PI * radius;
  const offset = circumference * (1-progress);

  return(
    <div className="timer-circle">
      <svg viewBox="0 0 200 200">
        <circle
          className="timer-circle__track"
          cx='100'
          cy='100'
          r={radius}
        />
        <circle
          className="timer-circle__progress"
          cx='100'
          cy='100'
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="timer-circle__content">{children}</div>
    </div>
  );
}

export default TimerCircle;