import {useState, useEffect} from 'react';
import styles from './TimerWidget.module.css';
import { FaCaretUp,FaCaretDown  } from "react-icons/fa6";


const hours_step = 3600;
const minutes_step=60;
const seconds_step=1; 


function TimerWidget() {

    const [totalSeconds, setTotalSeconds] = useState(7263);
    const [isRunning, setIsRunning] = useState(false);
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
    setTotalSeconds(totalSeconds+step);
};


  return (
    <div className={styles.container}>
        <div className={styles.left}>
        {totalSeconds}
        
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
