import {useState, useEffect} from 'react';
import styles from './TimerWidget.module.css';
import { FaCaretUp,FaCaretDown  } from "react-icons/fa6";
 import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
 import "react-circular-progressbar/dist/styles.css";



const hours_step = 3600;
const minutes_step=60;
const seconds_step=1; 


function TimerWidget() {

    const [timeRemaining, setTimeRemaining] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [cachedSeconds, setCachedSeconds] = useState(10);

    const parseTime = (timeRemaining)=>{
        const hours = Math.floor(timeRemaining/3600);
        const minutes = Math.floor((timeRemaining%3600)/60);
        const seconds = timeRemaining%60;
        return {hours,minutes,seconds}
    };

    useEffect(()=>{
        if(isRunning){
            const interval = setInterval(()=>{
                setTimeRemaining((totalSeconds)=>{
                    if(totalSeconds >0) return totalSeconds-1;
                    else{
                        setIsRunning(false);
                        return 0;
                    }
                });
            },1000); // 1000ms = 1 sec
            return ()=> clearInterval(interval); // clear interval stops the loop from iterating or rumming
        }
    },[isRunning]);
    

    const stepHandler = (step) => {
      // Check if the process is running or if the step would result in negative time remaining
      if (isRunning || (step < 0 && timeRemaining + step < 0)) return;
  
      // Calculate the new time remaining
      const newTimeRemaining = timeRemaining + step;
  
      // Ensure that newTimeRemaining does not go below 0
      if (newTimeRemaining >= 0) {
          setCachedSeconds(newTimeRemaining);
          setTimeRemaining(newTimeRemaining);
      }
  };
  

const formatTime = (time) => {
  return `${time.hours.toString().padStart(2,"0")}:${time.minutes
    .toString().padStart(2,"0")}:${time.seconds.toString().padStart(2,"0")}`;
};

const percentage = (timeRemaining/cachedSeconds)*100;
  return (
    <div className={styles.container}>
        <div className={styles.left}>
        <CircularProgressbar
        value={percentage}
        text={formatTime(parseTime(timeRemaining))}
        styles={{
          path: {
            stroke:"#ff6a6a",
            strokeWidth:"3px",
            transition:"stroke-dashoffset 0.5s ease 0s",
          },
          
            trail :{
              stroke:"transparent",
            },
            text : {
              fill:"white",
              fontsize:"2px",
            },
        }}
        />
        
        </div>

        <div className={styles.right}>
            <div className={styles.conifgure}>
                <div className={styles.cell}>
                    <p>Hours</p>
                    <FaCaretUp 
                    onClick={()=> stepHandler(hours_step)}
                    />
                    <p>{parseTime(cachedSeconds).hours.toString().padStart(2, "0")}</p>
                    <FaCaretDown
                    onClick={()=>stepHandler(-hours_step)}
                     />
                </div>
                <div className={styles.cell}>
                    <p>Minutes</p>
                    <FaCaretUp 
                    onClick={()=>stepHandler(minutes_step)}
                    />
                   <p>
							{parseTime(cachedSeconds).minutes.toString().padStart(2, "0")}
						</p>
                    <FaCaretDown 
                    onClick={()=>stepHandler(-minutes_step)}
                    />
                </div>
                <div className={styles.cell}>
                    <p>Seconds</p>
                    <FaCaretUp 
                    onClick={()=>stepHandler(seconds_step)}
                    />
                   <p>
							{parseTime(cachedSeconds).seconds.toString().padStart(2, "0")}
						</p>
                    <FaCaretDown 
                    onClick={()=>stepHandler(-seconds_step)}/>
                    
                </div>
            </div>
            <button onClick={()=>setIsRunning(!isRunning)}
            >{isRunning? "Stop": "Start"}</button>
        </div>
    </div>
  )
}

export default TimerWidget
