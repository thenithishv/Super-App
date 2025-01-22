import {useState, useEffect} from 'react';
import styles from './TimerWidget.module.css';
import { FaCaretUp,FaCaretDown  } from "react-icons/fa6";
 import { CircularProgressbar } from 'react-circular-progressbar';



const hours_step = 3600;
const minutes_step=60;
const seconds_step=1; 


function TimerWidget() {

    const [totalSeconds, setTotalSeconds] = useState(7263);
    const [isRunning, setIsRunning] = useState(false);
    const [cachedSeconds, setCachedSeconds] = useState(10);

    const parseTime = (totalSeconds)=>{
        const hours = Math.floor(totalSeconds/3600);
        const minutes = Math.floor((totalSeconds%3600)/60);
        const seconds = totalSeconds%60;
        return {hours,minutes,seconds}
    };

    useEffect(()=>{
        if(isRunning){
            const interval = setInterval(()=>{
                setTotalSeconds((totalSeconds)=>{
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
    

    const stepHandler = (step)=>{
    if(isRunning||(step < 0 && totalSeconds -step <0)) return;
    setCachedSeconds(totalSeconds+step);
    setTotalSeconds(totalSeconds+step);
};


  return (
    <div className={styles.container}>
        <div className={styles.left}>
        <CircularProgressbar
        value={totalSeconds}
        maxValue={1}
        text={`${(parseTime(totalSeconds).hours)}:${(parseTime(totalSeconds).minutes)}:${(parseTime(totalSeconds).seconds)}`}
        styles={{
    // Customize the root svg element
    root: {},
    // Customize the path, i.e. the "completed progress"
    path: {
      // Path color
      stroke: `rgba(62, 152, 199, ${totalSeconds / 100})`,
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: 'butt',
      // Customize transition animation
      transition: 'stroke-dashoffset 0.5s ease 0s',
      // Rotate the path
      transform: 'rotate(0.25turn)',
      transformOrigin: 'center center',
    },
    // Customize the circle behind the path, i.e. the "total progress"
    trail: {
      // Trail color
      stroke: '#d6d6d6',
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: 'butt',
      // Rotate the trail
      transform: 'rotate(0.25turn)',
      transformOrigin: 'center center',
    },
    // Customize the text
    text: {
      // Text color
      fill: '#f88',
      // Text size
      fontSize: '16px',
    },
    // Customize background - only used when the `background` prop is true
    background: {
      fill: '#3e98c7',
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
                    <p>{parseTime(totalSeconds).hours}</p>
                    <FaCaretDown
                    onClick={()=>stepHandler(-hours_step)}
                     />
                </div>
                <div className={styles.cell}>
                    <p>Minutes</p>
                    <FaCaretUp 
                    onClick={()=>setTotalSeconds(totalSeconds+minutes_step)}
                    />
                    <p>{parseTime(totalSeconds).minutes}</p>
                    <FaCaretDown 
                    onClick={()=>setTotalSeconds(totalSeconds-minutes_step < 0 ? 0 : totalSeconds-minutes_step)}
                    />
                </div>
                <div className={styles.cell}>
                    <p>Seconds</p>
                    <FaCaretUp 
                    onClick={()=>setTotalSeconds(totalSeconds+seconds_step)}/>
                    <p>{parseTime(totalSeconds).seconds}</p>
                    <FaCaretDown 
                    onClick={()=>setTotalSeconds(totalSeconds-seconds_step <0 ? 0 : totalSeconds-seconds_step)}/>
                    
                </div>
            </div>
            <button onClick={()=>setIsRunning(!isRunning)}
            >{isRunning? "Stop": "Start"}</button>
        </div>
    </div>
  )
}

export default TimerWidget
